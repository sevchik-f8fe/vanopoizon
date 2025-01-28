import { Box } from "@mui/material";

const ArcticleBlock = ({ article_link, picture }) => {
    let tg = window.Telegram.WebApp;

    return (
        <Box
            // onClick={() => { tg.openLink(article_link) }}
            sx={{
                borderRadius: '.5em',
                backgroundImage: `url(${picture})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '8em',
                maxHeight: '8em',
                minWidth: '96%',
                maxWidth: '96%',
            }}
        >
        </Box>
    );
}

export default ArcticleBlock;





























