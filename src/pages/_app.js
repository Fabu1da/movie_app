import "@/styles/globals.css";
import { AppProps } from "next/app";
import Layout from "@/pages/_layout";
import { createContext, useState } from "react";
export const favoriteContext = createContext();
export default function App({ Component, pageProps }) {
  const [favorite, setFavorite] = useState([]);
  return (
    <favoriteContext.Provider value={{ favorite, setFavorite }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </favoriteContext.Provider>
  );
}
