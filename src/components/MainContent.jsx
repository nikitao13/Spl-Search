import {useState} from "react";
import SearchPanel from "./SearchPanel.jsx";
import Dashboard from "./DashboardPanel.jsx"
import ButtonPanel from "./ButtonPanel.jsx";

function MainContent() {
    const [dash, setDash] = useState(false);

    return (
        <main className="main-content">
            {dash ? <Dashboard /> : <SearchPanel />}

            <ButtonPanel
            dash={dash}
            setDash={setDash}
            />
        </main>
    )
}

export default MainContent