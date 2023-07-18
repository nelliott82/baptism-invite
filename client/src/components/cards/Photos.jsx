import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

const photos = new Array(20).fill(0);

export default function Photos() {

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {photos.map((x, i) =>
          <SwiperSlide key={i}>
            <img src={`./assets/photos/${i + 1}.jpg`}/>
          </SwiperSlide>
        )}
      </Swiper>
      <br/>
      <a href='https://www.instagram.com/explore/tags/summer/' target='_blank'>
        <p className='font-mono'><u>Follow and use our wedding hashtag on Instagram</u></p>
      </a>
    </>
  );
}