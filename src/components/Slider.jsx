import React from "react";
import { Link } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../assets/css/mainslider.css";
import sliderImg1 from "../assets/images/slider/slider01.png";
import sliderImg2 from "../assets/images/slider/slider02.png";
import sliderImg3 from "../assets/images/slider/slider03.png";

const Slider = () => {

    // const BrandName = "samsung";

    const swiperContent = [{
        id: 1, img: sliderImg1
    }, {
        id: 2, img: sliderImg3
    }, {
        id: 3, img: sliderImg2
    }]

    return (
        <div className="flex relative container max-md:flex-wrap gap-4">
            <div className="w-full p-2 flex items-center justify-center md:w-3/12  max-md:hidden">
                <div className="img-bg h-full mt-3 rounded-lg" ></div>
            </div>
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                slidesPerView={1}
                navigation={true}
                loop={true}
                parallax={true}
                keyboard={{ enabled: true }}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false
                }}
                className="h-auto w-9/12 cursor-pointer select-none m-auto max-md:w-full md:rounded-lg"
            >
                {
                    swiperContent.map(swiperItem => {
                        return (
                            <SwiperSlide className="flex justify-center items-center w-full h-full pt-4" key={swiperItem.id}>
                                <div className="row">
                                    <img className="img-fluid md:rounded-lg" src={swiperItem.img} alt={`"slider ${swiperItem.id}`} />
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>

    );
};

export default Slider;