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
        .catch(err => {
            console.log(':((((', err)
        })
}

export const entityToChar = (ent) => {
    return String.fromCharCode(ent.slice(2, -1));
}

export const shortTitle = (title) => {
    return title && `${title.substr(0, 24)}...`;
}

export const toRub = (value) => {
    // console.log(fx(1).from("CNY").to("RUB"), fx(1).from("CNY").to("RUB") * 1.11)
    return value && Math.round(fx(value).from("CNY").to("RUB") * 1.107) + 500;
}

export const toNormalPrice = (price) => {
    return price && Math.round(price * 100) / 10000;
}

export const sliceChn = (str) => {
    let chineseChars = str && str.match(/[^\x00-\x7F]+/g);
    let convertedStr = str && str.replace(/[^\x00-\x7F]/g, "");
    chineseChars = chineseChars.slice(0, 1);

    return [...convertedStr.split(), ...chineseChars].join();
}

export const imagesForCurrentColor = (productImg, currentColorId) => {
    return productImg && productImg
        .filter(elem => elem?.propertyValueId == currentColorId)
        .map(elem => (elem?.url));
}

export const objectToQueryString = (obj) => {
    let params = [];

    Object.entries(obj).forEach(([key, value]) => {
        if (value.value === null) {
            return;
        }

        if (Array.isArray(value.value)) {
            value.value.forEach(item => {
                params.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`);
            });
        } else if (typeof value.value == 'string') {
            if (value.value.length > 0) {
                let encodedString = '';

                for (let char of value.value) {
                    if (char === ' ') {
                        encodedString += '+';
                    } else {
                        encodedString += encodeURIComponent(char);
                    }
                }

                params.push(`${encodeURIComponent(key)}=${encodedString}`);
            }
        } else {
            params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value.value)}`);
        }
    });

    return params.length > 0 ? '&' + params.join('&') : '';
}