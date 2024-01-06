"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./popular.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

export default function Popular() {
  const [moviesData, setMoviesData] = useState([]); // Initialisez l'état local avec un tableau vide
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmUzOTgxNTliM2VhNjUxMTQ0YWYxNWZhZGJkMzllYSIsInN1YiI6IjY1OTgxZWE5NWNjMTFkNzdkODdkZDhkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8JFdLCqu_Wd-Ak6HAenpzr0WKCHZjThrnubAoLZqCm4",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trendingResponse = await axios.get(
          " https://api.themoviedb.org/3/movie/popular",
          options
        );
        const responseIds = trendingResponse.data.results.map((result) => ({
          id: result.id,
          title: result.title,
          image: result.poster_path,
        }));
        console.log("responseId", responseIds);

        setMoviesData([responseIds]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log("test", moviesData.length);

  return (
    <div className={styles.popular}>
      {moviesData.length > 0 ? (
        <>
          <h2>Popular Collections</h2>
          <Swiper
            breakpoints={{
                '760': {
                    slidesPerView: 6,
                    spaceBetween: 20,
                }
            }
            }
            spaceBetween={15}
            slidesPerView={3}
            grabCursor={true}
            
            className={styles.Myswiper}
          >
            {moviesData[0].map((movie) => (
              <SwiperSlide className={styles.popular__container__card}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.image}`}
                  alt={movie.title}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
}
