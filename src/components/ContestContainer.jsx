import { Box } from "@mui/material";

const ContestContainer = () => {
    return (
        <Box
            sx={{
                cursor: 'pointer',
                borderRadius: '1em',
                backgroundColor: 'white',
                backgroundImage: 'url("https://basket-01.wbbasket.ru/vol137/part13751/13751916/images/big/2.webp")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minWidth: '100%',
                minHeight: '30em',
            }}
        >
        </Box>
    );
}

export default ContestContainer;