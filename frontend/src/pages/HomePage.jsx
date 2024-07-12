import React, { useState, useEffect } from 'react';
import { Flex, Heading, Image } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import userShowToast from '../hooks/useShowToast';
import { useSetRecoilState } from 'recoil';
import movieAtom from '../Atoms/MovieAtom';
import { useNavigate } from 'react-router-dom';
import Headers from '../components/Headers';
import MovieCard from '../components/MovieCard';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const setMovie = useSetRecoilState(movieAtom);
  const showToast = userShowToast();
  const navigate = useNavigate();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await fetch('/api/movie/getMovies');
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.log(error.message);
        showToast('Error', error.message, 'error');
      }
    };
    getMovies();
  }, []);

  return (
    <>
      <Headers />
      <Heading size="md" textColor="black" marginBottom="20px">Upcoming Events</Heading>
      <Flex justifyContent="center" width="100%" alignItems="center" marginBottom="30px">
        <Swiper
          slidesPerView={2}
          slidesPerGroupSkip={1}
          centeredSlides={true}
          // spaceBetween={10}
          pagination={{ clickable: false }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          navigation={true}
          modules={[Navigation, Pagination, Autoplay]}
          borderRadius="md"
          height="300px"
        >
          <SwiperSlide>
            <Flex justifyContent="center">
              <Image
                src="https://res.cloudinary.com/dyylkrsak/image/upload/v1712596273/media-desktop-kisi-ko-batana-mat-ft-anubhav-singh-bassi-0-2023-7-25-t-16-3-33_we3nej.avif"
                alt="Slide 1"
                height="300px"
                overflow="hidden"
                width="550px"
                borderRadius="md"
              />
            </Flex>
          </SwiperSlide>
          <SwiperSlide>
            <Flex justifyContent="center">
              <Image
                src="https://res.cloudinary.com/dyylkrsak/image/upload/v1712596223/media-desktop-abhishek-upmanyu-live-jaipur-0-2024-1-27-t-11-57-4_aml6hv.avif"
                alt="Slide 2"
                height="300px"
                overflow="hidden"
                width="550px"
                borderRadius="md"
              />
            </Flex>
          </SwiperSlide>
          <SwiperSlide>
            <Flex justifyContent="center">
              <Image
                src="https://res.cloudinary.com/dyylkrsak/image/upload/v1712597789/et00379741-skqgyxqdsj-landscape_jfgtqh.avif"
                alt="Slide 3"
                height="300px"
                overflow="hidden"
                width="550px"
                borderRadius="md"
              />
            </Flex>
          </SwiperSlide>
          <SwiperSlide>
            <Flex justifyContent="center">
              <Image
                src="https://res.cloudinary.com/dyylkrsak/image/upload/v1712594230/music-event-poster-template-with-abstract-shapes_1361-1316_yxtkzp.avif"
                alt="Slide 3"
                height="300px"
                overflow="hidden"
                width="550px"
                borderRadius="md"
              />
            </Flex>
          </SwiperSlide>
        </Swiper>
      </Flex>
      <Heading size="md" textColor="black">Recommended Events</Heading>
      <Flex flexWrap="wrap" justifyContent="center">
        {movies && movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} setMovie={setMovie} navigate={navigate} />
        ))}
      </Flex>
    </>
  );
}

export default HomePage;
