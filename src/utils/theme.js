import { deepOrange } from '@mui/material/colors';
import { createTheme } from "@mui/material";

export const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: '"Inter", sans-serif',
            color: '#fff',
        },
        // Отдельные настройки для конкретных вариантов
        h1: {
            fontSize: '2em',
            fontWeight: 900,
        },
        h2: {
            fontSize: 'calc((4vh + 1vw) * 0.65)',

            // fontSize: '1.6em',
            fontWeight: 900,
        },
        h3: {
            fontSize: '1.4em',
            // fontSize: 'calc((2vh + 1vw) * 1.2)',
            fontWeight: 900,
        },
        h4: {
            fontSize: '1.2rem',
            fontWeight: 700,
        },
        h5: {
            fontWeight: 600,
            fontSize: '1em'
        },
        h6: {
            // fontSize: '1em',
            fontSize: 'calc((4vh + 1vw) * 0.4)',
            fontWeight: 900,
        },
        body1: {
            fontSize: '.8em',
            fontWeight: 500
        },
        body2: {
            fontSize: '.7em',
            fontWeight: 700
        },
        subtitle1: {
            color: '#fff5',
            fontSize: '.8em',
            fontWeight: 400
        },
        subtitle2: {
            // fontSize: '.75em',
            fontSize: 'calc((3vh + 1vw) * 0.4)',
            fontWeight: 500,
            color: '#fff5'
        },
        // button: {
        //     fontSize: '1rem',
        //     fontWeight: 400,
        // },
        caption: {
            fontSize: '.9rem',
            fontWeight: 600,
        },
        // overline: {
        //     fontSize: '1rem',
        //     fontWeight: 400,
        // },
    },
    components: {
        palette: {
            secondary: {
                main: '#F34213',
            },
        },
        MuiRadio: {
            styleOverrides: {
                root: {
                    color: '#fff6', // Цвет невыбранного состояния
                    '&.Mui-checked': {
                        color: '#709ed9', // Цвет выбранного состояния
                    },
                    '& .MuiRadio-root': { // Дополнительное уточнение для стилей svg
                        padding: '5px', // Изменение размера
                    },
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: '#fff6', // Цвет невыбранного состояния
                    '&.Mui-checked': {
                        color: '#709ed9', // Цвет выбранного состояния
                    },
                    '& .MuiRadio-root': { // Дополнительное уточнение для стилей svg
                        padding: '5px', // Изменение размера
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                },
                outlined: {
                    textTransform: 'none',
                    borderRadius: '.5em',
                    fontWeight: '600',
                    backgroundColor: 'transparent',
                    borderColor: '#fff',
                    color: '#fff',
                    '&:hover': {
                        borderColor: '#fff',
                        backgroundColor: 'transparent',
                    },
                },
                text: {
                    textTransform: 'none',
                    borderRadius: '.5em',
                    fontWeight: '600',
                    backgroundColor: '#709dd915',
                    color: '#709ed9',
                    '&:hover': {
                        backgroundColor: '#709dd915',
                    },
                },
                hide: {
                    textTransform: 'none',
                    borderRadius: '.5em',
                    fontWeight: '600',
                    backgroundColor: '#ffffff05',
                    color: '#fff8',
                    '&:hover': {
                        backgroundColor: '#ffffff05',
                    },
                },
                danger: {
                    textTransform: 'none',
                    borderRadius: '.5em',
                    fontWeight: '600',
                    backgroundColor: '#e6394610',
                    color: '#e63946',
                    '&:hover': {
                        backgroundColor: '#e6394610',
                    },
                },
                attention: {
                    textTransform: 'none',
                    borderRadius: '.5em',
                    fontWeight: '600',
                    backgroundColor: '#F3421310',
                    color: '#F34213',
                    '&:hover': {
                        backgroundColor: '#F3421310',
                    },
                },
                semi_attention: {
                    textTransform: 'none',
                    borderRadius: '0 0 1em 1em',
                    fontWeight: '500',
                    fontSize: '.9em',
                    backgroundColor: '#F3421310',
                    color: '#F34213',
                    '&:hover': {
                        backgroundColor: '#F3421310',
                    },
                },
                contained: {
                    textTransform: 'none',
                    borderRadius: '1em',
                    fontWeight: '600',
                    backgroundColor: '#F34213',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#F34213',
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },
                    '&:active': {
                        backgroundColor: '#fff1',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: '#2E2E3A',
                        color: 'white',
                        borderRadius: '1em',
                        //!


                        fontSize: '1em',



                        '&.Mui-focused': {
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ffffff50',
                                borderWidth: '1px',
                            },
                        },
                    },
                    '& .MuiFilledInput-root': {
                        backgroundColor: '#2E2E3A',
                        fontSize: '1em',

                        color: '#fff',
                        '&.Mui-focused': {
                            backgroundColor: '#2E2E3A',
                            '& .MuiFilledInput-notchedOutline': {
                                borderColor: '#ffffff50',
                                borderWidth: '1px',
                            },
                        },
                        '&:hover': {
                            backgroundColor: '#2E2E3A',
                        },
                        '&:after': {
                            borderColor: '#ffffff50',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#ffffff50',
                    },
                },
            },
        },
    },
});