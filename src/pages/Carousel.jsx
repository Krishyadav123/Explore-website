// Carousel.jsx
import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';

const Carousel = () => {
  const slides = new Array(10).fill(
    'https://res.cloudinary.com/dhf8eyjee/image/upload/v1754665342/0d3b546640253c23ed646f2c784d3c6be293b748_a78tmo.jpg'
  );

  return (
    <div className="w-full mx-auto bg-black min-h-screen px-10 py-8">
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        loop={true} // enable infinite looping
        autoplay={{
          delay: 3000, // 2 seconds between slides
          disableOnInteraction: false, // keeps autoplay running after user interacts
        }}
        slidesPerView={4}
        spaceBetween={40}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        // style={{padding: '20px'}} // add padding to the Swiper container
        // className="px-20"
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]} // add Autoplay here
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="custom-slide">
  <div
    className="slide-inner rounded-2xl shadow-lg"
    style={{
      backgroundImage: `url(${slide})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '500px',
    }}
  />
</SwiperSlide>

        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
