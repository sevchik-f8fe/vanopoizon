import { useEffect, useRef } from "react";
import { Box, Typography, Button, Skeleton } from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";

import { useDeliveryData } from "../DeliveryDataPage/store";
import { useGeoSelect } from "./store";

const GeoSelectPage = () => {
    let tg = window.Telegram.WebApp;
    const location = useLocation();
    const mapContainerRef = useRef(null);
    const { currentObject, setCurrentObject, isLoading, setIsLoading, objects, setObjects } = useGeoSelect();
    const { setFieldValue } = useDeliveryData();

    useEffect(() => {
        const getPvzList = async () => {
            setIsLoading(true);

            const pvzs = await axios.post('https://vanopoizonserver.ru/vanopoizon/api/getPvzs', { code: location.state.cityCode }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .catch(error => console.error('Ошибка: ', error))
                .finally(() => setIsLoading(false));

            const dataList = pvzs.data.pvzs.map((elem) => (
                {
                    coords: [elem.location.latitude, elem.location.longitude],
                    address: elem.location.address,
                    full_address: elem.location.address_full,
                    onClickEvent: () => {
                        setCurrentObject({
                            address: elem.location.address,
                            full_address: elem.location.address_full,
                        })
                    }
                }
            ));

            setCurrentObject(dataList[0]);

            await fetch(`https://api-maps.yandex.ru/2.1/?apikey=${import.meta.env.VITE_YAMAP_KEY}&lang=ru_RU`)
                .then(response => response.text())
                .then(script => {
                    new Function(script)();
                });

            function initMap() {
                let cdekMap = new ymaps.Map(mapContainerRef.current, {
                    center: location.state.cityCoords,
                    zoom: 10,
                    controls: ['zoomControl', 'searchControl', 'geolocationControl']
                }, {
                    searchControlProvider: 'yandex#search'
                });

                let cdekCollection = new ymaps.GeoObjectCollection({}, {
                    preset: 'islands#greenDotIcon',
                    draggable: false
                });

                dataList.forEach(elem => {
                    let mark = new ymaps.Placemark(elem.coords);
                    cdekCollection.add(mark);
                    mark.events.add('click', elem.onClickEvent)
                });

                cdekMap.geoObjects.add(cdekCollection);
            }

            ymaps.ready(initMap);
        }

        tg.BackButton.show();
        tg.MainButton.hide();

        getPvzList();
    }, [])

    return (
        <>
            {isLoading ? (
                <Skeleton height={"75vh"} variant="rounded" animation="wave" />
            ) : (
                <Box
                    sx={{
                        minHeight: '75vh',
                        maxHeight: '75vh'
                    }}
                    ref={mapContainerRef}
                >
                </Box >
            )}

            <Box
                sx={{
                    borderRadius: '1em 1em 0 0',
                    position: 'fixed',
                    bottom: '0',
                    left: 0,
                    minWidth: '100%',
                    minHeight: '26vh',
                    backgroundColor: '#fff',
                    zIndex: 10000,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.5em',
                    justifyContent: 'space-between'
                }}
            >
                {isLoading ? (
                    <>
                        <Box>
                            <Skeleton height={"2em"} sx={{ mb: '.5em' }} variant="rounded" animation="wave" />
                            <Skeleton height={"3.5em"} variant="rounded" animation="wave" />
                        </Box>
                        <Skeleton height={"2em"} variant="rounded" animation="wave" />
                    </>
                ) : (
                    <>
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: '1.2em',
                                    fontWeight: '500',
                                    color: '#202029',
                                    pb: '.5em'
                                }}
                            >{currentObject?.address}</Typography>
                            <Typography variant="body1" sx={{ color: '#20202980' }}>
                                CDEK {currentObject?.full_address}</Typography>
                        </Box>

                        <Button
                            onClick={() => {
                                setFieldValue('pvz', { smallAddress: currentObject?.address, fullAddress: currentObject?.full_address });
                                window.history.back();
                            }}
                            variant="contained">
                            Доставить сюда
                        </Button>
                    </>
                )}
            </Box>
        </>
    );
}

export default GeoSelectPage;