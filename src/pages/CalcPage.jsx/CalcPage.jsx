import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import CalcDescription from "./CalcDescription";

const CalcPage = () => {
    const navigate = useNavigate();
    let tg = window.Telegram.WebApp;
    let backBtn = tg?.BackButton;

    tg.onEvent('backButtonClicked', function () {
        navigate('/');
        backBtn.hide();
    });

    return (
        <>
            <CalcDescription />
        </>
    );
}

export default CalcPage;