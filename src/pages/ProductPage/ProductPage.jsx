import { Box, Typography } from "@mui/material";

const ProductPage = () => {
    return (
        <Box>
            <Box
                sx={{
                    backgroundColor: "#fff",
                    minWidth: '100%',
                    p: '.5em',
                }}
            >
                <Box
                    sx={{
                        backgroundImage: `url(https://png.klev.club/uploads/posts/2024-03/png-klev-club-p-bober-png-1.png)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        minWidth: 'calc(100%)',
                        minHeight: '13em',
                    }}
                >
                </Box>

                <Typography
                    sx={{
                        mt: '.5em', mb: '1em',
                        color: '#202029',
                        fontSize: '1.5em',
                        fontWeight: '900'
                    }}
                >
                    Бобёр коричнеый б\у
                </Typography>
            </Box>

            <Box
                sx={{
                    borderRadius: '1em',
                    backgroundColor: '#2E2E3A',
                    p: '.5em',
                }}
            >

            </Box>
        </Box>
    );
}

export default ProductPage;