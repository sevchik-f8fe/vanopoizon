import { Box } from "@mui/material";
import Slider from "react-slick";
import { nanoid } from "nanoid";

import ArcticleBlock from "./ArticleBlock";
import { useArticles } from "../../pages/NewsPage/store";

const ArcticleContainer = () => {
    const { articles } = useArticles();

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        // slidesToShow: articles?.filter(elem => elem?.type == 'small').length > 3 ? 3 : articles?.filter(elem => elem?.type == 'small').length,
        slidesToScroll: 1,
        // slidesToScroll: articles?.filter(elem => elem?.type == 'small').length > 3 ? 3 : articles?.filter(elem => elem?.type == 'small').length,
        nextArrow: <></>,
        prevArrow: <></>
    };

    return (
        // <Slider {...settings}>
        //     {articles
        //         ?.filter(elem => elem?.type == 'small')
        //         ?.map((elem) => <ArcticleBlock key={nanoid()} picture={elem?.photoUrl} article_link={elem?.link} />)}
        // </Slider>
        <Box
            sx={{
                display: 'flex',
                gap: '.5em',
                overflowX: 'auto'
            }}
        >
            {articles
                ?.filter(elem => elem?.type == 'small')
                ?.map((elem) => <ArcticleBlock key={nanoid()} picture={elem?.photoUrl} article_link={elem?.link} />)}
        </Box>
    );
}

export default ArcticleContainer;