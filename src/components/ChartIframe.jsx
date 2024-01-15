function ChartIframe({ pair }) {
    return (
        <div id="dexscreener-embed"><iframe src={`https://dexscreener.com/solana/${pair}?embed=1&theme=dark&trades=0&info=0`}></iframe></div>
    )
}

export default ChartIframe;