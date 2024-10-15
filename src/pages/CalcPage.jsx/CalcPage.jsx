import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CalcDescription from "./CalcDescription";
import SetCalcSize from "./SetCalcSize";
import SetCalcLink from "./SetCalcLink";
import { useCalc } from "./store";

const CalcPage = () => {
    const { page } = useCalc()
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
                        <>Ошибка</>
                    )}
        </>
    );
}

export default CalcPage;