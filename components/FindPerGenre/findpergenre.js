"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./findpergenre.module.scss";

export default function FindPerGenre(props) {
  const [genresData, setGenresData] = useState([]); // Initialisez l'état local avec un tableau vide
  const [selectedGenre, setSelectedGenre] = useState(""); // État pour stocker le genre sélectionné
  const [dataByGenre, setdataByGenre] = useState([]); // État pour stocker les données de films par genre
  const [genreId, setGenreId] = useState(28); // État pour stocker l'ID du genre
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmUzOTgxNTliM2VhNjUxMTQ0YWYxNWZhZGJkMzllYSIsInN1YiI6IjY1OTgxZWE5NWNjMTFkNzdkODdkZDhkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8JFdLCqu_Wd-Ak6HAenpzr0WKCHZjThrnubAoLZqCm4",
    },
  };

  const handleGenreChange = async (event) => {
    setSelectedGenre(event.target.value);
    const genreId = event.target.value;
    console.log("genreId", genreId);
    const genreID = await axios
      .get(
        `https://api.themoviedb.org/3/discover/${props.type}?with_genres=${genreId}`,
        options
      )
      .then((response) => {
        setdataByGenre(response.data.results);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genreID = await axios
      .get(
        `https://api.themoviedb.org/3/discover/${props.type}?with_genres=${genreId}`,
        options
      )
      .then((response) => {
        setdataByGenre(response.data.results);
      });
        const GenreResponse = await axios
          .get(
            `https://api.themoviedb.org/3/genre/${props.type}/list?language=en`,
            options
          )
          .then((response) => {
            setGenresData(response.data.genres);
            console.log("GenreResponse", response.data.genres);
          });
        //console.log("GenreResponse", GenreResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return ( 
    <>
  <div className={styles['find-per-genre']}>
    {genresData.length > 0 ? (
      <>
        <div className={styles['find-per-genre__container']}>
          <h2 className={styles['find-per-genre__title']}>Find per genre</h2>
          <select
            onChange={handleGenreChange}
            value={selectedGenre}
            className={styles['find-per-genre__select']}
          >
            {genresData.map((genre) => (
              <option
                key={genre.id}
                value={genre.id}
                className={styles['find-per-genre__option']}
              >
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      </>
    ) : (
      <h2 className={styles['find-per-genre__loading']}>Loading...</h2>
    )}
  </div>
  <div className={styles['list-film']}>
    {dataByGenre.length > 0 ? (
      <div className={`${styles['list-film__grid']} grid-templates-3`}>
        {dataByGenre.map((data) => (
          <div key={data.id} className={styles['list-film__item']}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
              alt={data.title}
              className={styles['list-film__image']}
            />
            <h3 className={styles['list-film__title']}>{data.title}</h3>
            <p className={styles['list-film__overview']}>{data.overview}</p> 
          </div>
        ))}
      </div>
    ) : (
      <h2 className={styles['list-film__loading']}>Loading...</h2>
    )}
  </div>
</>

  );
}
