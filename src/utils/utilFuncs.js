import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {

        if (pathname !== '/' && pathname !== '/favorite') {
            window.scrollTo(0, 0);
        }
        // window.scrollTo(0, 0);
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
    return title && `${title.substr(0, 20)}...`;
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
    chineseChars = chineseChars?.slice(0, 1);

    return convertedStr ? [...convertedStr?.split(), ...chineseChars].join() : 'ошибка тут';
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

export const checkFilter = (type, url) => {
    const regex = new RegExp(`&${type}=[^&]+(&|$)`)
    const match = url.match(regex);

    if (match) {
        const result = url.replace(match[0], '');

        console.log('1: ', result);
        return result.length > 0;
    } else {
        console.log('2: ', url);
        return url.length > 0;
    }
}

export const calcPrice = (productData, pricesData, currentProduct) => {
    return (sizeId = currentProduct?.size) => {
        return (colorId = currentProduct?.color) => {
            const originProps = (arr, needValue) => {
                const found = arr.find(elem => elem.level === needValue);
                return found ? found.propertyValueId : null;
            };

            if (!sizeId && !colorId) {
                return productData?.price?.item?.price || 'Нет в наличии';
            } else if (!sizeId) {
                const skusForCurrentColor = productData?.skus
                    .filter(elem => originProps(elem.properties, 1) == colorId)
                    .map(elem => ({ skuId: elem?.skuId, colorId: originProps(elem.properties, 1) }));

                const currentPrices = skusForCurrentColor && skusForCurrentColor
                    .map(sku => {
                        const skuId = sku?.skuId?.toString();
                        const price = pricesData?.skus[skuId]?.prices;
                        return price;
                    });

                const rightCurrentPrice = currentPrices && currentPrices[0]
                    .filter((elem) => elem?.tradeType != 95)
                    .map((elem) => elem?.price)[0]

                return rightCurrentPrice ? rightCurrentPrice : 'Нет в наличии';
            } else if (!colorId) {
                const skusForCurrentSize = productData && productData?.skus
                    .filter(elem => originProps(elem.properties, 1) == sizeId)
                    .map(elem => ({ skuId: elem.skuId, sizeId: originProps(elem.properties, 1) }));

                const currentPrices = skusForCurrentSize && skusForCurrentSize
                    .map(sku => {
                        const skuId = sku.skuId.toString();
                        const price = pricesData?.skus[skuId]?.prices;
                        return price;
                    });

                const rightCurrentPrice = currentPrices && currentPrices[0]
                    .filter((elem) => elem?.tradeType != 95)
                    .map((elem) => elem?.price)[0]

                return rightCurrentPrice ? rightCurrentPrice : 'Нет в наличии';
            } else {
                const skusForCurrentColor = productData?.skus
                    .filter(elem => originProps(elem.properties, 1) == colorId && originProps(elem.properties, 2) == sizeId)
                    .map(elem => ({ skuId: elem.skuId, colorId: originProps(elem.properties, 1), sizeId: originProps(elem.properties, 2) }));

                const currentPrices = skusForCurrentColor && skusForCurrentColor
                    .map(sku => {
                        const skuId = sku.skuId.toString();
                        const price = pricesData?.skus[skuId]?.prices;
                        return price;
                    });

                const rightCurrentPrice = currentPrices[0] && currentPrices[0]
                    .filter((elem) => elem?.tradeType != 95)
                    .map((elem) => elem?.price)[0]

                return rightCurrentPrice ? rightCurrentPrice : 'Нет в наличии';
            }
        }
    }
}