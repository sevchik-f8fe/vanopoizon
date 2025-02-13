import { Box, Typography, Button, Paper } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const HelloReferalPage = () => {
    const navigate = useNavigate()
    const { id } = useParams();

    useEffect(() => {
        console.log(id)
    })

    return (
        <Box
            sx={{
                minHeight: '80vh',
                maxHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColorL: 'red'
            }}
        >
            <Paper
                sx={{
                    backgroundColor: 'transparent',
                    p: '1.5em .5em',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1.5em',
                    textAlign: 'center'
                }}
            >
                <Typography variant='h5'>Регистрация прошла успешно. Вы получили 500 бонусов!</Typography>

                <Button
                    onClick={() => navigate('/')}
                >На главную</Button>
            </Paper>
        </Box>
    );
}

export default HelloReferalPage;