'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./discover.module.scss";

export default function Discover() {
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
                    `https://api.themoviedb.org/3/discover/tv`,
                    options
                );
                const responseIds = trendingResponse.data.results.map((result) => ({
                    id: result.id,
                    title: result.name,
                    image: result.poster_path,
                }));

                setMoviesData([responseIds]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);


    return (
        <>
            <div className={styles.discover}>
                {moviesData.length > 0 ? (
                    <>
                        <h2>Discover</h2>
                        <div className={styles.discover__container}>
                            {moviesData[0].map((movie) => (
                                <div key={movie.id} className={styles.discover__card}>
                                    <img
                                        className={styles.discover__card__image}
                                        src={`https://image.tmdb.org/t/p/w500/${movie.image}`}
                                        alt={movie.title}
                                    />
                                    <h3 className={styles.discover__card__title}>{movie.title}</h3>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>

        </>
    )
}
