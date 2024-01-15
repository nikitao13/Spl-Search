function ButtonPanel({ dash, setDash }) {
    return (
        <div className="buttonPanel">
            <button>set alert</button>
            <button>favourite</button>
            <button id="toggleSwitch" onClick={() => setDash(!dash)}>{dash ? "search" : "dashboard"}</button>
        </div>
    )
}

export default ButtonPanel