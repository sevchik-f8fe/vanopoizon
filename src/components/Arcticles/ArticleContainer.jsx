import { Stack, Box } from "@mui/material";
import { nanoid } from "nanoid";

import ArcticleBlock from "./ArticleBlock";
import { ARTICLES } from "../../utils/data";

const ArcticleContainer = () => {
    return (
        <Box
            sx={{
                gap: '.5em',
                padding: ' 0 .5em',
                display: 'flex',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
            }}
        >
            {ARTICLES.map((elem) => <ArcticleBlock key={nanoid()} picture={elem.picture} article_link={elem.link} ></ArcticleBlock>)}
        </Box>
    );
}

export default ArcticleContainer;