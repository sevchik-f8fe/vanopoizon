import { Box, Link } from "@mui/material";

const ArcticleBlock = ({ article_link, picture }) => {
    return (
        <Link
            href={article_link}
            sx={{
                display: 'block',
                minHeight: '6em',
                minWidth: '6em',
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
                    minHeight: '6em',
                    minWidth: '6em',
                }}
            >
            </Box>
        </Link>
    );
}

export default ArcticleBlock;