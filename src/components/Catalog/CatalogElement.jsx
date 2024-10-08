import { Box, Typography } from "@mui/material";
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';

const CatalogElement = ({ picture, price, title }) => {
    return (
        <Box
            sx={{
                minWidth: 'calc(50% - .25em)',
                maxWidth: 'calc(50%)',
                cursor: 'pointer',
                borderRadius: '1em',
                backgroundColor: '#2E2E3A',
            }}
        >
            <Box
                sx={{
                    backgroundImage: `url(${picture})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minWidth: '100%',
                    borderRadius: '1em',
                    minHeight: '8em',
                }}
            >
            </Box>

            <Box
                sx={{
                    p: '.5em',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'senter',
                    alignItems: 'start'
                }}
            >
                <Typography
                    sx={{
                        color: '#fff',
                        fontSize: '1.2em',
                        fontWeight: '700'
                    }}
                >{price}<CurrencyRubleIcon
                        sx={{
                            color: '#fff',
                            fontSize: '.8em',
                        }}
                    /></Typography>
                <Typography
                    sx={{
                        color: '#fff',
                        fontSize: '.8em',
                    }}
                >{title}</Typography>
            </Box>

            <Box
                sx={{
                    m: '.5em 1em .5em .5em',
                    backgroundColor: '#fff',
                    borderRadius: '1em',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Typography
                    sx={{
                        p: '.5em',
                        color: '#2E2E3A',
                        fontSize: '.8em',
                        fontWeight: '700'
                    }}
                >Купить</Typography>
            </Box>
        </Box >
    );
}

export default CatalogElement;