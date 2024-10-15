import { Padding } from "@mui/icons-material";
import { createTheme } from "@mui/material";

export const theme = createTheme({
    typography: {
        fontFamily: '"Inter", sans-serif'
    },
    components: {
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
                contained: {
                    textTransform: 'none',
                    borderRadius: '1em',
                    fontWeight: '600',
                    backgroundColor: '#F34213',
                    // borderColor: '#fff',
                    color: '#fff',
                    '&:hover': {
                        // borderColor: '#fff',
                        backgroundColor: '#F34213',
                        // opacity: 0.8, // Непрозрачность при наведении
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                label: {
                    color: 'var(--tg-theme-text-color)', // Цвет текста
                    fontSize: '16px', // Размер шрифта
                    fontWeight: '600',
                    color: 'white'
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
                        '&.Mui-focused': {
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ffffff50',
                                borderWidth: '1px',
                            },
                        },
                    },
                    '& .MuiFilledInput-root': {
                        backgroundColor: '#2E2E3A',
                        fontSize: '.9em',
                        color: '#fff',
                        '&.Mui-focused': {
                            backgroundColor: '#2E2E3A',
                            '& .MuiFilledInput-notchedOutline': {
                                borderColor: '#ffffff50', // Используем цвет из темы
                                borderWidth: '1px',
                            },
                        },
                        '&:hover': {
                            backgroundColor: '#2E2E3A',
                        },
                        '&:after': {
                            borderColor: '#ffffff60',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#ffffff60',
                    },
                },
            },
        },
    },
});