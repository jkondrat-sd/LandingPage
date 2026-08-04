import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// molecules
const Header = dynamic(() => import("@/components/molecules/header"));
const Footer = dynamic(() => import("@/components/molecules/footer"));

const Custom500 = () => {
  return (
    <>
      <Header />
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>
              5<span></span>0
            </h1>
          </div>
          <h2>Oops, Something Went Wrong</h2>
          <p>
            We are experiencing an internal server problem, Please try back
            later. Or report to : <a href="mailto:puskomdkpp@gmail.com">puskomdkpp@gmail.com</a>
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

export default Custom500;
