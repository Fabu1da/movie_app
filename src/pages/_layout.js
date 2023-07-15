import React, { PropsWithChildren } from "react";
import NavBar from "@/components/navbar/NavBar";

const Layout = ({ children }) => (
  <>
    <NavBar />
    <main>{children}</main>
  </>
);

export default Layout;
