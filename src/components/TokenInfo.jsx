import ChartIframe from "./ChartIframe.jsx";
import { useState } from "react";

function TokenInfo({ searchResults }) {
    const [chart, setChart] = useState(false);

    if (searchResults !== null) {
        const {
            url,
            pair,
            ca,
            name,
            ticker,
            price,
            priceNative,
            marketCap,
            liquidity,
            fiveMin,
            oneHour,
            oneDay,
            oneHourTxns,
        } = searchResults;

        const links = {
            raydium: `https://raydium.io/swap/?inputCurrency=sol&outputCurrency=${ca}&fixed=in`,
            twitter: `https://twitter.com/search?q=${ca}&src=typed_query&f=top`,
            rugCheck: `https://rugcheck.xyz/tokens/${ca}`
        };

        const { buys, sells } = oneHourTxns;
        const totalTxns = buys + sells;
        const buyWidth = totalTxns > 0 ? (buys / totalTxns) * 100 : 0;
        const sellWidth = totalTxns > 0 ? (sells / totalTxns) * 100 : 0;

        function toggleChart() {
            setChart(!chart);
        }


        return (
            <div className="tokenContainer">
                <div className="tokenHeader">
                    <h1 className="tokenName"
                        onClick={() => window.open(url, "_blank")}
                    >{name}</h1>
                    <p className="tokenTicker">${ticker}: <span className="cyan" id="ca">{ca}</span></p>
                    </div>
                <div className="tokenBody">
                    <div className="tokenDataContainer">
                    <div className="tokenData">
                        <p><span className="cyan">></span>Price: ${price}USD</p>
                        <br/>
                        <p><span className="cyan">></span>Market Cap: {marketCap}</p>
                        <p><span className="cyan">></span>Liquidity: {liquidity}</p>
                        <br/>
                        <p className={fiveMin >= 0 ? "green" : "red"}>5min change: {fiveMin}%</p>
                        <p className={oneHour >= 0 ? "green" : "red"}>1hr change: {oneHour}%</p>
                        <p className={oneDay >= 0 ? "green" : "red"}>24hr change: {oneDay}%</p>
                        <br/>
                        <div className="allVolume">
                            <div className="hrVolume">
                                <p>Hourly Volume</p>
                                <p><span className="green">{buys} buys</span>|<span className="red">{sells} sales</span></p>
                                <div className="transactionBar">
                                    <div className="buySection" style={{ width: `${buyWidth}%` }}></div>
                                    <div className="sellSection" style={{ width: `${sellWidth}%` }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="tokenLinks">
                            <p className="tokenLink" onClick={() => window.open(links.raydium, "_blank")}>Swap</p>
                            <p className="tokenLink" onClick={() => window.open(links.twitter, "_blank")}>Twitter</p>
                            <p className="tokenLink" onClick={() => window.open(links.rugCheck, "_blank")}>RugCheck</p>
                            <p className="tokenLink" onClick={toggleChart}>Chart</p>
                        </div>
                        <p className="cyan" id="solConversion">1 SOL = 1234 {ticker} *UPDATE*</p>
                    </div>
                     <div className="alertContainer">
                         {chart ? <ChartIframe pair={pair} /> : null }
                     </div>
                    </div>
                    </div>
            </div>
        );
    } else {
        return null;
    }
}

export default TokenInfo


