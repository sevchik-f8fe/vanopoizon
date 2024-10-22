import { Box, Typography, TextField } from "@mui/material";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useBottomBoard } from "../../components/BottomBoard/store";


import { useSelectPage } from "./store";

const SelectPage = ({ data, onSelect, label }) => {
    // const navigate = useNavigate();
    let tg = window.Telegram.WebApp;
    const { setVisible } = useBottomBoard();

    useEffect(() => {
        setVisible(false);
        tg.BackButton.show();
        tg.MainButton.hide();
    }, [])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <TextField
                label={label}
            />
        </Box>
    );
}

export default SelectPage;