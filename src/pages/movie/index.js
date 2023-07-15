import React from "react";
import Image from "next/image";
import styles from "./movie.module.css";
import { AiFillStar, AiFillClockCircle, AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";

const Movie = (data) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <>
      <div className={`${styles.backButton}`}>
        <button type="button" onClick={handleBack}>
          <AiOutlineClose />
          go back
        </button>
      </div>
      <div className={`${styles.container}`}>
        <div className={`${styles.mainIamge}`}>
          <Image src={data.data.Poster} alt="" width={500} height={500} />
        </div>
        <div className={`${styles.content}`}>
          <h1>{data.data.Title}</h1>
          <div className={`${styles.rated}`}>{data.data.Rated}</div>
          <div className={`${styles.underLine}`} />
          <span className={`${styles.time}`}>
            <AiFillClockCircle /> {data.data.Runtime}
          </span>
          <p>{data.data.Plot}</p>
          <span>Country : {data.data.Country}</span>
          <h3 className={`${styles.smallTitle}`}>Actors</h3>
          <div>{data.data.Actors}</div>
          <div className={`${styles.gerneRating}`}>
            <span>Realesed : {data.data.Year}</span>
          </div>
          <div className={`${styles.gerneRating}`}>
            <span>Genre : {data.data.Genre}</span>
            <span className={`${styles.rate}`}>
              Rate : <AiFillStar className="RateIcon" />
              {data.data.imdbRating}
            </span>
          </div>
          <div className={`${styles.language}`}>
            <span>{data.data.Language}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movie;

export async function getServerSideProps(context) {
  const id = context.query.movieID;
  const key = process.env.NEXT_PUBLIC_API_KEY;
  const rsponse = await fetch(
    `http://www.omdbapi.com/?apikey=${key}&i=${id}&plot=full`
  );
  const data = await rsponse.json();

  return {
    props: { data },
  };
}
