import React, { useContext, useEffect } from "react";
import Image from "next/image";
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

  const handleAddToFavorite = () => {
    setFavorite([...favorite, movie]);
  };

  useEffect(() => {
    localStorage.setItem("FAVORITES", JSON.stringify(favorite));
  }, [favorite]);

  return (
    <div className={`${styles.card}`}>
      <div className={`${styles.thumbnail}`}>
        <Image
          src={
            movie && movie.Poster !== "N/A"
              ? movie.Poster
              : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
          }
          alt="thumbnail"
          onClick={handleOpenMovie}
          id={movie && movie.imdbID}
          name={movie && movie.Title}
          width={500}
          height={500}
        />
        <div className={`${styles.movieType}`}>
          {movie.Type} ↔ {movie && movie.Year}
          {!isFavorite ? (
            <button
              type="button"
              onClick={handleAddToFavorite}
              id={movie && movie.imdbID}
            >
              <RxHeart />
            </button>
          ) : (
            <button
              type="button"
              className={`${styles.isFavorite}`}
              onClick={handleRemoveFromFavorite}
              id={movie && movie.imdbID}
            >
              <RxHeartFilled />
            </button>
          )}
        </div>
      </div>
      <div className={`${styles.description}`}>
        <div className={`${styles.movieTitle}`}>{movie && movie.Title}</div>
      </div>
    </div>
  );
};

export default Card;
