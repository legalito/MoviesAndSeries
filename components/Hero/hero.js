"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./hero.module.scss";

export default function Hero() {
  const [moviesData, setMoviesData] = useState([]); // Initialisez l'état local avec un tableau vide
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trendingResponse = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
          options
        );
        const responseId = trendingResponse.data.results[0].id;
        const movieDetailsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${responseId}`,
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

        // Mettez à jour l'état avec les nouvelles données
        setMoviesData([newMovieData]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []); // Assurez-vous que le tableau de dépendances est vide si vous souhaitez exécuter l'effet une seule fois lors du montage

  // Utilisez l'état local moviesData dans le reste de votre composant

  return (
    <>
      {moviesData.length > 0 ? (
        <div className={styles.hero}>
          <p>
            {new Date(moviesData[0].releaseDate).getFullYear()} | {moviesData[0].runtime}
          </p>
          <h1>{moviesData[0].title}</h1>
          <div>
            {moviesData[0].genre.map((genre, index) => (
              <h2 key={index}>{genre.name}</h2>
            ))}
          </div>
          <div className={styles.rating}>
            <div></div>
            <h2>{moviesData[0].rating}</h2>
          </div>
          <button>Watch Now</button>
        </div>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </>
  );
}
