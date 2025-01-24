import { Box, Typography } from "@mui/material";

const EndMessage = ({ title }) => {
    return (
        <Box
            sx={{
                textAlign: 'center',
                borderRadius: '1em',
                border: '1px solid #fff5',
                p: '.5em'
            }}
        >
            <Typography variant="subtitle1">{title}</Typography>
        </Box>
    );
}

export default EndMessage;