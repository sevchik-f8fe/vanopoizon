let tg = window.Telegram.WebApp;

export const goBackAndHideBtnHandle = () => {
    window.history.back();
    tg.BackButton.hide();
}

export const goBackBtnHandle = () => {
    window.history.back();
}