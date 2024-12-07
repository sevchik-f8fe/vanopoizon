import { deepOrange } from '@mui/material/colors';
import { createTheme } from "@mui/material";

export const theme = createTheme({
    typography: {
        fontFamily: '"Inter", sans-serif'
    },
    components: {
        palette: {
            secondary: {
                main: '#F34213',
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