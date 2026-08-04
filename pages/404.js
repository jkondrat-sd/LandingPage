import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// molecules
const Header = dynamic(() => import("@/components/molecules/header"));
const Footer = dynamic(() => import("@/components/molecules/footer"));

const Custom404 = () => {
  return (
    <>
      <Header />
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>
              4<span></span>4
            </h1>
          </div>
          <h2>Oops! Page Not Be Found</h2>
          <p>
            Sorry but the page you are looking for does not exist, have been
            removed. name changed or is temporarily unavailable
          </p>
          <Link href="/" passHref>
            <a style={{ marginTop: 20 }}>Back to homepage</a>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Custom404;
