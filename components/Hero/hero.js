"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./hero.module.scss";

export default function Hero(props) {
  const [moviesData, setMoviesData] = useState(); // Initialisez l'état local avec un tableau vide
  const [background, setBackground] = useState([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmUzOTgxNTliM2VhNjUxMTQ0YWYxNWZhZGJkMzllYSIsInN1YiI6IjY1OTgxZWE5NWNjMTFkNzdkODdkZDhkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8JFdLCqu_Wd-Ak6HAenpzr0WKCHZjThrnubAoLZqCm4",
    },
  };

  function convertirEnHeuresEtMinutes(dureeEnMinutes) {
    const heures = Math.floor(dureeEnMinutes / 60);
    const minutes = dureeEnMinutes % 60;

    return `${heures}h ${minutes}min`;
  }

  //crée un random number entre 1 et 20
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trendingResponse = await axios.get(
          `https://api.themoviedb.org/3/trending/${props.type}/day?language=en-US`,
          options
        );
        const responseId = trendingResponse.data.results[getRandomInt(20)].id;
        const movieDetailsResponse = await axios.get(
          `https://api.themoviedb.org/3/${props.type}/${responseId}`,
          options
        );
        const newMovieData = {
          id: movieDetailsResponse.data.id,
          title: movieDetailsResponse.data.title,
          image: movieDetailsResponse.data.poster_path,
          releaseDate: movieDetailsResponse.data.release_date,
          rating: movieDetailsResponse.data.vote_average,
          runtime: convertirEnHeuresEtMinutes(movieDetailsResponse.data.runtime),
          genre: movieDetailsResponse.data.genres,
        };
        
        const movieBackGroundResponse = await axios.get(`https://api.themoviedb.org/3/${props.type}/${responseId}/images`, options);
        const newBackground = {
          background: movieBackGroundResponse.data.backdrops[0].file_path,
        }
        //permet de changer le background du body
        //document.body.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${newBackground.background})`;

        // Mettez à jour l'état avec les nouvelles données
        setBackground(`url(https://image.tmdb.org/t/p/original/${newBackground.background}`);
        setMoviesData(newMovieData);
        document.body.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${newBackground.background}`;

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []); // Assurez-vous que le tableau de dépendances est vide si vous souhaitez exécuter l'effet une seule fois lors du montage

    
  return (
    <>
  {moviesData ? (
    <div className={styles.hero}>
      <p className={styles.hero__info}>
        {new Date(moviesData.releaseDate).getFullYear()} | {moviesData.runtime}
      </p>
      <h1 className={styles.hero__title}>{moviesData.title}</h1>
      <div className={styles.hero__genres}>
        {moviesData.genre.map((genre, index) => (
          <h2 key={index} className={styles.hero__genre}>{genre.name}</h2> 
        ))}
      </div>
      <div className={styles.hero__rating}>
        <div className={styles.hero__ratingImage}></div>
        <h3 className={styles.hero__ratingScore}>{moviesData.rating}</h3>
      </div>
      <button className={styles.hero__button}>Watch Now</button>
    </div>
  ) : (
    <p className={styles.hero__loading}>Chargement en cours...</p>
  )}
</>

  );
}
