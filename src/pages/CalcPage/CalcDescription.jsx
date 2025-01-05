// import { Box, Typography, Button } from "@mui/material";
// import { useEffect } from "react";

// import dewu_app_icon from '../../assets/dewu_app_icon.jpg';
// import { useNavigate } from "react-router-dom";

// const CalcDescription = () => {
//     const navigate = useNavigate();
//     let tg = window.Telegram.WebApp;

//     useEffect(() => {
//         tg.BackButton.show();
//         tg.MainButton.hide();
//     }, []);

//     return (
//         <Box
//             sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '1em',
//                 p: '.5em',
//                 pt: '4em'
//             }}
//         >
//             <Box
//                 sx={{
//                     p: '.5em',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '.5em',
//                     w: '100%',
//                 }}
//             >
//                 <Box
//                     sx={{
//                         borderRadius: '1em',
//                         backgroundColor: 'white',
//                         backgroundImage: `url(${dewu_app_icon})`,
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                         backgroundRepeat: 'no-repeat',
//                         minHeight: '6em',
//                         maxHeight: '6em',
//                         maxWidth: '6em',
//                         minWidth: '6em',
//                     }}
//                 ></Box>

//                 <Box
//                     sx={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                     }}
//                 >
//                     <Typography
//                         sx={{
//                             color: '#fff',
//                             fontWeight: '700',
//                             fontSize: '1.2em',
//                         }}
//                     >Poizon (De Wu)</Typography>
//                     <Typography
//                         sx={{
//                             color: '#ffffff50',
//                             fontWeight: '500',
//                             fontSize: '.9em',
//                         }}
//                     >Китайский маркетплейс оригинальных брендовых товаров</Typography>
//                     <a target="_blank" href="https://a17.app.qq.com/o/simple.jsp?pkgname=com.shizhuang.duapp&g_f=1185402&fromcase=70052#">
//                         <Button
//                             sx={{
//                                 mt: '.5em',
//                                 maxWidth: 'fit-content'
//                             }}
//                             size="small"
//                             variant="contained"
//                         >Скачать APK</Button>
//                     </a>
//                 </Box>
//             </Box>

//             <Box
//                 sx={{
//                     borderRadius: '1em',
//                     p: '1em .5em',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     gap: '.5em',
//                     backgroundColor: '#2E2E3A',
//                 }}
//             >
//                 <Typography
//                     sx={{
//                         color: '#fff',
//                         fontSize: '1.5em',
//                         mb: '.5em',
//                         fontWeight: '900',
//                     }}
//                 >Расчёт стоимости</Typography>
//                 <Typography
//                     sx={{
//                         color: '#fff',
//                         fontSize: '1em',
//                         mb: '.5em',
//                         fontWeight: '500',
//                     }}
//                 >
//                     Рассчитаем стоимость заказа в маркетплейсе Poizon, включая нашу комиссию и доставку.
//                 </Typography>
//                 <Typography
//                     sx={{
//                         color: '#fff',
//                         mb: '.5em',
//                         fontSize: '1em',
//                         fontWeight: '500',
//                     }}
//                 >
//                     Если у тебя еще нет приложения Poizon — скачивай по кнопке выше. Там есть любые кроссы и вещи, дешевле на 30-50% чем в РФ.
//                 </Typography>
//                 <Typography
//                     sx={{
//                         color: '#fff',
//                         mb: '1em',
//                         fontSize: '1em',
//                         fontWeight: '500',
//                     }}
//                 >
//                     А если не хочешь заморачиваться — пиши в чат, какие кроссы или одежду хочешь. Можешь вообще просто скинуть фотку кроссовок, а мы сами все найдем, заполним и рассчитаем.
//                 </Typography>
//                 <Button
//                     onClick={() => navigate('/calcLink')}
//                     variant="text"
//                     size="large"
//                 >Начать</Button>
//             </Box>
//         </Box>
//     );
// }

// export default CalcDescription;