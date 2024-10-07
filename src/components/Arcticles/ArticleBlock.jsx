import { Box, Link } from "@mui/material";

const ArcticleBlock = ({ article_link, picture }) => {
    return (
        <Link
            href={article_link}
            sx={{
                display: 'block',
                minHeight: '5em',
                minWidth: '5em',
            }}
        >
            <Box
                sx={{
                    borderRadius: '1em',
                    backgroundColor: 'white',
                    backgroundImage: `url(${picture})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '5em',
                    minWidth: '5em',
                }}
            >
            </Box>
        </Link>
    );
}

export default ArcticleBlock;