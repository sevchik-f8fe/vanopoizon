import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CalcDescription from "./CalcDescription";
import SetCalcSize from "./SetCalcSize";
import SetCalcLink from "./SetCalcLink";
// import SetCalcPrice from "./SetCalcPrice";
import { useCalc } from "./store";

const CalcPage = () => {
    const { page, setPage } = useCalc()
    const navigate = useNavigate();
    let tg = window.Telegram.WebApp;
    let backBtn = tg?.BackButton;

    tg.onEvent('backButtonClicked', function () {
        navigate('/');
        backBtn.hide();
    });

    return (
        <>
            {(page === 0) ? <CalcDescription /> :
                (page === 1) ? <SetCalcLink /> :
                    (page === 2) ? <SetCalcSize /> : (
                        <div>
                            <p style={{ color: "#fff" }}>ты уже слишком далеко зашёл</p>
                            <button
                                style={{
                                    padding: '1em',
                                    fontSize: '2em',
                                    margin: '1em'
                                }}
                                onClick={() => setPage(0)}
                            >тыкни</button>
                        </div>
                    )}
            {/* <SetCalcPrice /> */}
        </>
    );
}

export default CalcPage;