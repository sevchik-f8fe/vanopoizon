import CalcDescription from "./CalcDescription";
import SetCalcSize from "./SetCalcSize";
import SetCalcLink from "./SetCalcLink";
import { useCalc } from "./store";
import { useBottomBoard } from "../../components/BottomBoard/store";
import { useEffect } from "react";

const CalcPage = () => {
    const { page } = useCalc();
    const { setCurrentPage } = useBottomBoard();
    let tg = window.Telegram.WebApp;

    useEffect(() => {
        tg.BackButton.show();
        tg.MainButton.hide();
        setCurrentPage('home');
    }, []);

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