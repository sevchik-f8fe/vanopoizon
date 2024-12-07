import { Box, Typography, TextField, Skeleton } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { nanoid } from "nanoid";
import axios from "axios";

import { useDeliveryData } from "../DeliveryDataPage/store";
import { useSelectPage } from "./store";

const SelectPage = () => {
    const location = useLocation();
    const { setSimpleFieldValue, cities, setCities, city } = useDeliveryData();

    let tg = window.Telegram.WebApp;
    const { value, setValue } = useSelectPage();

    useEffect(() => {
        const getCityList = async () => {
            axios.get('http://localhost:3000/vanopoizon/api/getCities', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
                .then(response => {
                    setCities(response.data.cities)
                })
                .catch(error => console.error('Ошибка: ', error))
        };

        tg.BackButton.show();
        tg.MainButton.hide();

        getCityList();
    }, [])

    const onSelectHandle = (label, code, coords) => {
        setSimpleFieldValue('cdekAddress', {
            address: '',
            fullAddress: ''
        })
        setSimpleFieldValue('address', '')
        setSimpleFieldValue([location.state.field], { name: label, cityCode: code, cityCoords: coords })
        window.history.back();
    }

    return (
        <Box
            sx={{
                pt: '5em',
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em',
            }}
        >
            <TextField
                label='Город'
                value={value}
                variant="outlined"
                autoFocus
                sx={{
                    position: 'sticky',
                    fontSize: '1em',
                    color: '#fff',
                    top: '4.5em',
                    m: '0 .5em'
                }}
                onChange={(e) => setValue(e.target.value)}
            />
            {cities[0] ?
                (cities && cities
                    .filter((elem) => elem?.city?.toLowerCase()?.includes(value?.toLowerCase()) || elem?.region?.toLowerCase()?.includes(value?.toLowerCase()))
                    .filter((elem, id) => id < 50)
                    .map((elem) => <SelectElement key={nanoid()} coords={[elem?.latitude, elem?.longitude]} code={elem?.code} subText={`${elem?.region},`} text={elem?.city} onSelect={onSelectHandle} />)
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '.2em'
                        }}
                    >
                        {
                            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((elem) => <Skeleton sx={{
                                p: '.8em .5em',
                                borderBottom: '2px solid #fff3'
                            }}
                                animation="wave"
                                key={nanoid()}
                                height='3em'
                                variant="rectangular"
                                width='100%'
                            />)
                        }
                    </Box>
                )
            }
        </Box>
    );
}

const SelectElement = ({ text, onSelect, code, subText, coords }) => {
    return (
        <Box
            onClick={() => onSelect(text, code, coords)}
            sx={{
                cursor: 'pointer',
                p: '.8em .5em',
                m: '0 .5em',
                borderRadius: '.5em',
                // borderBottom: '2px solid #fff3',
                backgroundColor: '#2E2E3A80',
            }}
        >
            <Typography
                sx={{
                    fontWeight: 500,
                    fontSize: '1em',
                    color: '#fff'
                }}
            >{subText} {text}</Typography>
        </Box>
    );
}

export default SelectPage;