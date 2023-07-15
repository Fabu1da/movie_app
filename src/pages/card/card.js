import React, { useContext, useEffect } from "react";
import styles from "./card.module.css";
import { RxHeartFilled, RxHeart } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { favoriteContext } from "../_app";

const Card = ({ movie }) => {
  const router = useRouter();
  const { favorite, setFavorite } = useContext(favoriteContext);
  const isFavorite = favorite.some(
    (item) => JSON.stringify(item) === JSON.stringify(movie)
  );

  const handleOpenMovie = (event) => {
    const movieName = event.target.name;
    const movieID = event.target.id;
    const movieUrl = encodeURI(movieName);
    router.push(`/movie/?name=${movieUrl}&movieID=${movieID}`);
  };

  const handleRemoveFromFavorite = () => {
    const result = favorite.filter((singleMovie) => singleMovie !== movie);
    setFavorite(result);
  };

  const handleAddToFavorite = (event) => {
    setFavorite([...favorite, movie]);
  };

  useEffect(() => {
    localStorage.setItem("FAVORITES", JSON.stringify(favorite));
  }, [favorite]);

  return (
    <div className={`${styles.card}`}>
      <div className={`${styles.thumbnail}`}>
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
          }
          alt=""
          onClick={handleOpenMovie}
          id={movie.imdbID}
          name={movie.Title}
        />
        <div className={`${styles.movieType}`}>
          {movie.Type} ↔ {movie.Year}
          {!isFavorite ? (
            <button
              type="button"
              onClick={handleAddToFavorite}
              id={movie.imdbID}
            >
              <RxHeart />
            </button>
          ) : (
            <button
              type="button"
              className={`${styles.isFavorite}`}
              onClick={handleRemoveFromFavorite}
              id={movie.imdbID}
            >
              <RxHeartFilled />
            </button>
          )}
        </div>
      </div>
      <div className={`${styles.description}`}>
        <div className={`${styles.movieTitle}`}>{movie.Title}</div>
      </div>
    </div>
  );
};

export default Card;
