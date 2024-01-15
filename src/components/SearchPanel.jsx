import {useEffect, useRef, useState} from "react";
import TokenInfo from "./TokenInfo.jsx";

function SearchPanel() {
    const [searchValue, setSearchValue] = useState("");
    const [newQuery, setNewQuery] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const inputRef = useRef(null);

    function handleSearchChange(newValue) {
        setSearchValue(newValue);
    }

    function formatNumber(num) {
        if (num >= 1e6) {
            return (num / 1e6).toFixed(1) + "M";
        } else if (num >= 1e3) {
            return (num / 1e3).toFixed(0) + "K";
        } else {
            return num.toString();
        }
    }

    const handleSearch = (query) => {
        const searchUrl = `https://api.dexscreener.com/latest/dex/tokens/${query}`;
        if (query !== "") {
            console.log("search query sent");
            fetch(searchUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    let ticker = data.pairs[0].baseToken.symbol;
                    if (ticker.startsWith("$")) {
                        ticker = ticker.replace("$", "");
                    }

                    const results = {
                        url: data.pairs[0].url,
                        pair: data.pairs[0].pairAddress,
                        ca: data.pairs[0].baseToken.address,
                        name: data.pairs[0].baseToken.name,
                        ticker: ticker,
                        price: data.pairs[0].priceUsd.toLocaleString(),
                        priceNative: parseFloat(data.pairs[0].priceNative),
                        marketCap: formatNumber(data.pairs[0].fdv),
                        liquidity: formatNumber(data.pairs[0].liquidity["usd"]),
                        fiveMin: data.pairs[0].priceChange["m5"],
                        oneHour: data.pairs[0].priceChange["h1"],
                        oneDay: data.pairs[0].priceChange["h24"],
                        oneHourTxns: data.pairs[0].txns["h1"],
                    };
                    setSearchResults(results);
                    localStorage.setItem('lastSearch', JSON.stringify(results));
                })
                .catch((error) => {
                    console.error("error fetching data:", error);
                });
        }
    };

    useEffect(() => {
        const lastQuery = localStorage.getItem('lastQuery');
        if (lastQuery) {
            setNewQuery(lastQuery);
        }
        if (!lastQuery) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        let interval;
        if (newQuery) {
            interval = setInterval(() => {
                handleSearch(newQuery);
            }, 10000);
        }

        return () => clearInterval(interval);
    }, [newQuery]);

    function handleSubmit(e) {
        e.preventDefault();
        if (searchValue.length === 44 || searchValue.length === 43) {
            console.log("search submitted: " + searchValue);
            setNewQuery(searchValue);
            localStorage.setItem('lastQuery', searchValue);
            handleSearch(searchValue);
            inputRef.current.placeholder = "enter contract address";
        } else {
            console.log("invalid character length");
            inputRef.current.placeholder = "invalid character length!";
        }
        setSearchValue("");
    }

    useEffect(() => {
        const storedSearch = localStorage.getItem('lastSearch');
        if (storedSearch) {
            setSearchResults(JSON.parse(storedSearch));
        }
    }, []);

    return (
        <div id="search-wrapper">
            <div id="search-info">
                <form className="searchForm" onSubmit={handleSubmit}>
                    <input
                        className="search"
                        type="text"
                        name="search"
                        placeholder="enter contract address"
                        maxLength={44}
                        value={searchValue}
                        ref={inputRef}
                        autoComplete="off"
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />
                </form>

            </div>
            <div id="search-container">
                <TokenInfo
                    searchResults={searchResults}
                />
            </div>
        </div>
    )
}

export default SearchPanel