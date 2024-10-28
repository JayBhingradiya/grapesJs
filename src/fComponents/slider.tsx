import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

interface sliderDataProps {
  sliderData: any;
}
const FrontendSlider = ({ sliderData }: sliderDataProps) => {
  console.log("slide", sliderData);
  return (
    <div>
      <Swiper spaceBetween={50} slidesPerView={1}>
        <SwiperSlide>1</SwiperSlide>
        <SwiperSlide>2</SwiperSlide>
        <SwiperSlide>3</SwiperSlide>
        <SwiperSlide>4</SwiperSlide>
        <SwiperSlide>5</SwiperSlide>
        <SwiperSlide>6</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default FrontendSlider;
