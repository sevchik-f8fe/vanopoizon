import { Box, Typography } from "@mui/material";
import { nanoid } from "nanoid";

import { useArticles } from "../../pages/NewsPage/store";

const BigArticleContainer = () => {
    const { articles } = useArticles();

    return (
        <Box
            sx={{
                // p: '.5em',
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em'
            }}
        >
            {articles
                ?.filter(elem => elem?.type == 'big')
                ?.map(elem => <BigArticle key={nanoid()} photoUrl={elem?.photoUrl} title={elem?.title} link={elem?.link} />)}
        </Box>
    );
}

const BigArticle = ({ photoUrl, title, link }) => {
    let tg = window.Telegram.WebApp;

    return (
        <Box
            onClick={() => { tg.openLink(link) }}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'end',
                justifyContent: 'end',
                p: '.5em',
                cursor: 'pointer',
                borderRadius: '1em',
                backgroundImage: `url(${photoUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '25em',
                maxHeight: '25em',
                minWidth: '100%',
                maxWidth: '100%',
            }}
        >
            <Typography variant="h2">{title}</Typography>
        </Box>
    );
}


export default BigArticleContainer;