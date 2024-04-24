"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./movieDetails.module.css";

export default function MovieDetails() {
  const [moviesData, setMoviesData] = useState([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmUzOTgxNTliM2VhNjUxMTQ0YWYxNWZhZGJkMzllYSIsInN1YiI6IjY1OTgxZWE5NWNjMTFkNzdkODdkZDhkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8JFdLCqu_Wd-Ak6HAenpzr0WKCHZjThrnubAoLZqCm4",
    },
  };

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idMovie = urlParams.get("idMovie");

  useEffect(() => {
    console.log("idMovie", idMovie);
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
          genres : responseIds.genres,
          note : responseIds.vote_average,
          images : detailsResponse.data.backdrops,
        };
        console.log("finalData", finalData);
        setMoviesData([finalData]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    // Cleanup function to cancel any pending requests if the component unmounts
    return () => {};
  }, []); // Empty dependency array to ensure this effect runs only once
  return (
    <>
      {moviesData.length > 0 && (
        <div
          className={styles.ContainerMovie}
          style={{
            background: `url(https://image.tmdb.org/t/p/original${moviesData[0].backdrop_path})`,
          }}
        >
          <div>
            <div>
              <h1>{moviesData[0].original_title}</h1>
              <div>
                <h2>{moviesData[0].title}</h2>
                <h2>{moviesData[0].note}</h2>
                <p>{moviesData[0].overview}</p>
                <div className={styles.genres}>
                {moviesData[0].genres.map((genre, index) => (
                  <p key={index}>{genre.name}</p>
                ))
                }

                </div>
              </div>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${moviesData[0].video}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <div className={styles.images}>
              {moviesData[0].images.slice(0,9).map((image, index) => (
                <img
                  key={index}
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
