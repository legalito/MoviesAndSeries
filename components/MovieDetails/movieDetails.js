"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./movieDetails.module.css";

export default function MovieDetails() {
  const [moviesData, setMoviesData] = useState([]);
  const [idMovie, setIdMovie] = useState(null); // Ajout d'un état pour stocker l'idMovie

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmUzOTgxNTliM2VhNjUxMTQ0YWYxNWZhZGJkMzllYSIsInN1YiI6IjY1OTgxZWE5NWNjMTFkNzdkODdkZDhkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8JFdLCqu_Wd-Ak6HAenpzr0WKCHZjThrnubAoLZqCm4",
    },
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // On vérifie que window est défini
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get("idMovie");
      setIdMovie(id); // On met à jour l'état avec l'idMovie
    }
  }, []);

  useEffect(() => {
    if (idMovie) {
      // On ne lance la requête que si idMovie est défini
      const fetchData = async () => {
        try {
          const trendingResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${idMovie}`,
            options
          );
          const additionnalDataVideo = await axios.get(
            `https://api.themoviedb.org/3/movie/${idMovie}/videos`,
            options
          );
          const detailsResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${idMovie}/images`,
            options
          );
          console.log(
            "additionnalDataVideo",
            additionnalDataVideo.data.results[0].key
          );
          const responseIds = trendingResponse.data;
          const finalData = {
            id: responseIds.id,
            title: responseIds.title,
            original_title: responseIds.original_title,
            backdrop_path: responseIds.backdrop_path,
            overview: responseIds.overview,
            video: additionnalDataVideo.data.results[0].key,
            genres: responseIds.genres,
            note: responseIds.vote_average,
            images: detailsResponse.data.backdrops,
          };
          console.log("finalData", finalData);
          setMoviesData([finalData]);
          document.body.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${finalData.backdrop_path}`;
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [idMovie]); // Dépend de idMovie

  return (
    <>
      {moviesData.length > 0 && (
        <div className={styles["movie-container"]}>
          <div className={styles["movie-container__content"]}>
            <div className={styles["movie-container__header"]}>
              <h1 className={styles["movie-container__title"]}>
                {moviesData[0].original_title}
              </h1>
              <div className={`${styles["movie-container__details"]} stack`}>
                <h2 className={styles["movie-container__subtitle"]}>
                  {moviesData[0].title}
                </h2>
                <h2 className={styles["movie-container__rating"]}>
                  {moviesData[0].note}
                </h2>
                <p className={styles["movie-container__description"]}>
                  {moviesData[0].overview}
                </p>
                <div className={styles["movie-container__genres"]}>
                  {moviesData[0].genres.map((genre, index) => (
                    <p className={styles["movie-container__genre"]} key={index}>
                      {genre.name}
                    </p>
                  ))}
                </div>
              </div>
              <div className={styles["movie-container__iframe-wrapper"]}>
                <iframe
                  src={`https://www.youtube.com/embed/${moviesData[0].video}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className={styles["movie-container__iframe"]}
                ></iframe>
              </div>
            </div>
            <div className={styles["movie-container__images"]}>
              {moviesData[0].images.slice(0, 9).map((image, index) => (
                <img
                  key={index}
                  className={styles["movie-container__image"]}
                  src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                  alt={image.file_path}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
