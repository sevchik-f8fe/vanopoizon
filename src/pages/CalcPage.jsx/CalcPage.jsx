import CalcDescription from "./CalcDescription";
import SetCalcSize from "./SetCalcSize";
import SetCalcLink from "./SetCalcLink";
import { useCalc } from "./store";

const CalcPage = () => {
    const { page } = useCalc()
    let tg = window.Telegram.WebApp;

    tg.onEvent('backButtonClicked', () => { Navigate(-1) });

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