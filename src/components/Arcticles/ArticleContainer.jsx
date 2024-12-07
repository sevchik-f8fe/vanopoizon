import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import { nanoid } from "nanoid";

import ArcticleBlock from "./ArticleBlock";
import { ARTICLES } from "../../utils/data";

const ArcticleContainer = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <></>,
        prevArrow: <></>
    };

    return (
        <Slider {...settings}>
            {ARTICLES.map((elem) => <ArcticleBlock key={nanoid()} picture={elem.picture} article_link={elem.link} />)}
        </Slider>
    );
}

export default ArcticleContainer;