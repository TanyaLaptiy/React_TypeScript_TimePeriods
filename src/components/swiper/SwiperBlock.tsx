import React from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './Swiper.module.scss';
import { DatesType } from '../../redux/slices/dataSlice';

type DatesBlockProps = {
  dates: DatesType[];
};

export const SwiperBlock: React.FC<DatesBlockProps> = (props) => {
  return (
    <div>
      <Swiper
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className={styles.swiperCustom}>
        {props.dates.map((elem, index) => (
          <SwiperSlide key={elem.Data + index}>
            <h3 className={styles.title}>{elem.Data}</h3>
            <div className={styles.text_description}>{elem.Description}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
