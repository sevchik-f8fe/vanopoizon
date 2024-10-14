import { Box } from "@mui/material";

const ArcticleBlock = ({ article_link, picture }) => {
    let tg = window.Telegram.WebApp;

    return (
        <Box
            onClick={() => { tg.openLink(article_link) }}
            sx={{
                borderRadius: '1em',
                backgroundColor: 'white',
                backgroundImage: `url(${picture})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '6em',
                minWidth: '6em',
            }}
        >
        </Box>
    );
}

export default ArcticleBlock;