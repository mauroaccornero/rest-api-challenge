import React, { memo } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./layout.css";
import Nav from "../Nav/Nav";

declare interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = memo(({ children }: ILayoutProps) => {
  return (
    <div id={"layout"} data-testid={"Layout"}>
      <Header />
      <Nav />
      <section id={"main-section"}>
        <div className="container">{children}</div>
      </section>
      <Footer />
    </div>
  );
});

Layout.displayName = "Layout";

export default Layout;
