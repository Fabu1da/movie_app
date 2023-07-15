import React from "react";
import { Inter } from "next/font/google";

import styles from "./NavBar.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const NavBar = () => (
  <nav className={[styles.navbar, inter.className].join(" ")}>
    <div className={styles.logo}>OMDB</div>
    <ul className={styles.navLinks}>
      <div className={styles.menu}>
        <li>
          <Link href="/">Search</Link>
        </li>
        <li>
          <Link href="/recommend">Recommendations</Link>
        </li>
      </div>
    </ul>
  </nav>
);

export default NavBar;
