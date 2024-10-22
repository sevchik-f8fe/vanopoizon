import { Box, Typography, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useBottomBoard } from "../../components/BottomBoard/store";
import { nanoid } from "nanoid";

import { useDeliveryData } from "../DeliveryDataPage/store";
import { useSelectPage } from "./store";

const SelectPage = () => {
    const location = useLocation();
    const { setSimpleFieldValue } = useDeliveryData();

    let tg = window.Telegram.WebApp;
    const { setVisible } = useBottomBoard();
    const { value, setValue } = useSelectPage();

    useEffect(() => {
        setVisible(false);
        tg.BackButton.show();
        tg.MainButton.hide();
    }, [])

    const onSelectHandle = (e) => {
        if (location.state.prevPathName == 'deliveryData') {
            setSimpleFieldValue([location.state.field], e.target.textContent)
        }

        window.history.back();
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <TextField
                label={location.state.label}
                value={value}
                variant="filled"
                InputLabelProps={{
                    style: { color: '#ffffff60' },
                }}
                autoFocus
                sx={{
                    fontSize: '1em'
                }}
                onChange={(e) => setValue(e.target.value)}
            />
            {location.state.data
                .filter((elem) => elem.label.toLowerCase().includes(value.toLowerCase()))
                .map((elem) => <SelectElement key={nanoid()} text={elem.label} onSelect={onSelectHandle} />)}
        </Box>
    );
}

const SelectElement = ({ text, onSelect }) => {
    return (
        <Box
            onClick={onSelect}
            sx={{
                cursor: 'pointer',
                transition: '.1s ease',
                '&:hover': {
                    backgroundColor: '#fff1'
                },
                p: '.8em .5em',
                borderBottom: '2px solid #fff6'
            }}
        >
            <Typography
                sx={{
                    fontWeight: 500,
                    fontSize: '1em',
                    color: '#fff'
                }}
            >{text}</Typography>
        </Box>
    );
}

export default SelectPage;