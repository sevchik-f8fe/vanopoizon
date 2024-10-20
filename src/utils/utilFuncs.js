import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

let tg = window.Telegram.WebApp;

export const BackBtnHandle = () => {
    const { pathname } = useLocation();
    const backBtn = () => {
        window.history.back();
    }

    useEffect(() => {
        tg.onEvent('backButtonClicked', backBtn);
        return () => {
            tg.offEvent('backButtonClicked', backBtn);
        }
    }, [pathname]);

    return null;
}

export const showShineMainBtn = (price) => {
    tg.MainButton.show();
    tg.MainButton.text = `Купить за ${price} ${entityToChar('&#8381;')}`;
    tg.MainButton.color = '#fff';
    tg.MainButton.textColor = '#F34213';
    tg.MainButton.position = 'bottom';
    tg.MainButton.hasShineEffect = true;
}

export const showMainBtn = (textBtn) => {
    tg.MainButton.show();
    tg.MainButton.text = textBtn;
    tg.MainButton.color = '#fff';
    tg.MainButton.textColor = '#F34213';
    tg.MainButton.position = 'bottom';
    tg.MainButton.hasShineEffect = false;
}

export const copyOnCLickHandle = (text) => {
    text && navigator.clipboard.writeText(text)
        .then(() => {
            console.log('!!!')
        })
        .catch(err => {
            console.log(':((((', err)
        })
}

export const entityToChar = (ent) => {
    return String.fromCharCode(ent.slice(2, -1));
} 