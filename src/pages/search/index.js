import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Card from "@/pages/card/card";
import styles from "@/styles/search.module.css";

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const search = useSearchParams();
  const searchName = encodeURI(search.get("s"));
  const numberOfPages = Math.ceil(movies.totalResults / 10);

  const handlePreview = (event) => {
    event.preventDefault();
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage >= numberOfPages) return;
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_API_KEY;
    axios
      .get(
        `//www.omdbapi.com/?apikey=${key}&s=${searchName}&page=${currentPage}`
      )
      .then((movies) => setMovies(movies.data));
  }, [currentPage, searchName]);

  return (
    <div className={`${styles.pagePadding}`}>
      <h1 className={`${styles.searchKeyword}`}>
        Your search keyword: <span>{search.get("s")}</span>{" "}
      </h1>
      <div className={`${styles.underLineBox}`} />
      <div className={`${styles.movieList}`}>
        {movies.Search ? (
          movies.Search.map((movie, index) => (
            <Card movie={movie} key={index} />
          ))
        ) : (
          <div> No mvies in the database</div>
        )}
      </div>
      {numberOfPages ? (
        <div className={`${styles.pagenation}`}>
          <button onClick={handlePreview}>←</button>
          {currentPage} - {numberOfPages} pages
          <button onClick={handleNext}>→</button>
        </div>
      ) : (
        <p>waiting ....</p>
      )}
    </div>
  );
};
export default SearchPage;
