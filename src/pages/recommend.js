import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/recommend.module.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Card from "./card/card";

const inter = Inter({ subsets: ["latin"] });

export default function Recommend() {
  const [recommended, setRecommend] = useState([]);

  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  const getRecommendedMovies = () => {
    const searchName = localStorage.getItem("SEARCHED_KEYWORD");
    const key = process.env.NEXT_PUBLIC_API_KEY;
    const endTime = Number(localStorage.getItem("START_TIME"));

    axios
      .get(`http://www.omdbapi.com/?apikey=2aa72e41&s=${searchName}`)
      .then((allmovie) => {
        let page = Math.ceil(allmovie.data.totalResults / 10);
        const randomPage = Math.floor(Math.random() * page) + 1;
        axios
          .get(
            `http://www.omdbapi.com/?apikey=${key}&s=${searchName}&page=${randomPage}`
          )
          .then((results) => {
            let array = results.data.Search;

            let shuffled = shuffleArray(array);
            const savedRecommendedMovie = JSON.parse(
              localStorage.getItem("RECOMMENDED_MOVIE")
            );

            if (savedRecommendedMovie === null) {
              localStorage.setItem(
                "RECOMMENDED_MOVIE",
                JSON.stringify({
                  movies: shuffled,
                  endTime: endTime,
                })
              );

              setRecommend(shuffled);
            } else {
              const currentdate = new Date().getTime();

              if (savedRecommendedMovie.endTime <= currentdate) {
                localStorage.removeItem("RECOMMENDED_MOVIE");
                localStorage.removeItem("START_TIME");
                localStorage.setItem(
                  "START_TIME",
                  new Date().getTime() + 24 * 60 * 60 * 1000
                );
              }
              setRecommend(savedRecommendedMovie.movies);
            }
          });
      });
  };

  useEffect(() => {
    getRecommendedMovies();
  }, [getRecommendedMovies]);

  return (
    <>
      <Head>
        <title>OMDB Browser - Recommendations</title>
        <meta name="description" content="Get movie recommendations." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={`${styles.title}`}>
          <h1>Recommended</h1>
          <div className={`${styles.underLineBox}`} />
        </div>

        <div className={`${styles.movieList}`}>
          {recommended ? (
            recommended
              .slice(0, 5)
              .map((movie, index) => <Card movie={movie} key={index} />)
          ) : (
            <div> No mvies in the database</div>
          )}
        </div>
      </main>
    </>
  );
}
