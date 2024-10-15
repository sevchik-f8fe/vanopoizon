let tg = window.Telegram.WebApp;

export const goBackBtnHandle = () => {
    history.back();
}

export const showShineMainBtn = (price) => {
    tg.MainButton.show();
    tg.MainButton.text = `Купить за ${price} ${'&#8381;'}`;
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