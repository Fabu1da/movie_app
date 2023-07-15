import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/search.module.css";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { favoriteContext } from "./_app";
import Card from "./card/card";

const inter = Inter({ subsets: ["latin"] });

export default function Search() {
  const { favorite, setFavorite } = useContext(favoriteContext);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const searchQuery = (event) => {
    event.preventDefault();
    const encodedSearch = encodeURI(search);
    localStorage.getItem("keywords", search);
    router.push(`/search/?s=${encodedSearch}`);
  };

  return (
    <>
      <Head>
        <title>OMDB Browser - Search</title>
        <meta name="description" content="Search the OMDB database." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1>Browse your favorite movie</h1>

        <div className={`${styles.underLineBox}`} />

        <form className={`${styles.searchBox}`} onSubmit={searchQuery}>
          <input
            type="text"
            name="search"
            onChange={handleChange}
            value={search}
            placeholder="Search..."
          />
          <button className="">Search</button>
        </form>

        <div className={`${styles.favorite}`}>
          <h1>Your favorite movies</h1>
          <div className={`${styles.underLineBox}`} />
          <div className={`${styles.favoriteList}`}>
            {favorite.length !== 0 ? (
              favorite.map((movie, index) => <Card movie={movie} key={index} />)
            ) : (
              <div className="">
                You favorite list is empty please add them ☺☻♥♦♣
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
