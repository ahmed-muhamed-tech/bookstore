// Import Swiper React components
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.css";
import HeadSection from "../ui/HeadSection";

function CustomerReviews() {
  const review_clients = () => {
    return Array.from(
      { length: 20 },
      (_, index) => `/review_clients/v${index + 1}.webp`,
    );
  };

  return (
    <section className="py-12">
      <div className="container">
        {/* Head section */}
        <HeadSection text="اراء العملاء"/>
        {/*=== Head section ===*/}
        {/* Photos */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1440: {
              slidesPerView: 4,
            },
          }}
          loop={true}
          speed={5000}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          allowTouchMove={false}
          className="mySwiper"
        >
          {review_clients().map((photo, index) => (
            <SwiperSlide key={index}>
              <img
                src={photo}
                alt="photo"
                loading="lazy"
                className="rounded-2xl h-full w-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {/*=== Photos ===*/}
      </div>
    </section>
  );
}

export default CustomerReviews;
