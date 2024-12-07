import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ContestContainer = () => {
    const navigate = useNavigate();

    return (
        <Box
            onClick={() => navigate('/contest')}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '.8em',
                p: '.5em',
                cursor: 'pointer',
                borderRadius: '1em',
                backgroundColor: '#ffebee',
                textAlign: 'center',
            }}
        >
            <Box
                sx={{
                    borderRadius: '2em',
                    p: '.2em .5em',
                    backgroundColor: '#f44336',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '1em',
                        fontWeight: '500',
                        color: '#ffebee',
                    }}
                >1 - 31 октября</Typography>
            </Box>

            <Typography
                gutterBottom
                sx={{
                    fontSize: '1.8em',
                    fontWeight: '900',
                    color: '#f44336',
                    lineHeight: '.9',
                }}
            >Боооооооооольшой<br />розыгрыш октября</Typography>

            <Box
                sx={{
                    minHeight: '18em',
                    minWidth: '100%',
                    gap: '.5em',
                    display: 'flex',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: '#fff',
                        backgroundImage: `url(https://p2.zoon.ru/preview/B7Xv6vZwIp_XcEBV8l2yCQ/438x440x85/1/7/5/original_5d5d700467cd9302f61f1858_5d5d70990a995.jpg)`,
                        minHeight: '100%',
                        maxHeight: '100%',
                        minWidth: '60%',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        borderRadius: '1em'
                    }}
                ></Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 'calc(40% - .5em)',
                        gap: '.5em',
                        minHeight: 'calc(100% - .5em)',
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: '#fff',
                            backgroundImage: `url(https://p2.zoon.ru/preview/B7Xv6vZwIp_XcEBV8l2yCQ/438x440x85/1/7/5/original_5d5d700467cd9302f61f1858_5d5d70990a995.jpg)`,
                            minHeight: 'calc(50% - .25em)',
                            minWidth: 'calc(40% - 1.5em)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            borderRadius: '1em'
                        }}
                    ></Box>

                    <Box
                        sx={{
                            backgroundColor: '#fff',
                            backgroundImage: `url(https://p2.zoon.ru/preview/B7Xv6vZwIp_XcEBV8l2yCQ/438x440x85/1/7/5/original_5d5d700467cd9302f61f1858_5d5d70990a995.jpg)`,
                            minHeight: 'calc(50% - .25em)',
                            minWidth: 'calc(40% - 1.5em)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            borderRadius: '1em'
                        }}
                    ></Box>
                </Box>
            </Box>

            <Box
                sx={{
                    minWidth: '100%',
                    borderRadius: '1em',
                    p: '.8em',
                    textAlign: 'center',
                    backgroundColor: '#f44336',
                }}
            >
                <Typography
                    sx={{
                        color: '#ffebee',
                        fontWeight: '500',
                        fontSize: '1.2em',
                    }}
                >Узнать подробности</Typography>
            </Box>
        </Box>
    );
}

export default ContestContainer;