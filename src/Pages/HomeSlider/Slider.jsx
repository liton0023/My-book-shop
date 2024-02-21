import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import Books from "../Hooks/Books";

const Slider = () => {
    SwiperCore.use([Navigation]);
  const [book]= Books();
   
    return (
        <div>
                  {/* swiper */}
      <Swiper  spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
       >
        {book &&
          book.length > 0 &&
          book.map((listing) => (
            <SwiperSlide key={listing}>
              <div
                style={{
                  background: `url(${listing.imgUrl[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

        </div>
    );
};

export default Slider;