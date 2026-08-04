import React from "react";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";

const RoundedCard = ({ children, comodity, comodityId }) => {
  const [clicked, setClicked] = React.useState(false);

  return (
    <div className="xl:w-1/3 lg:w-1/3 md:w-1/3 sm:w-full w-full px-2 mb-4">
      <Link href={`/ketahanan_pangan/harga/${comodityId}`} passHref>
        <div onClick={(e) => setClicked(true)}>
          <div className="flex items-center hover:shadow-lg rounded-md p-4 cursor-pointer">
            {children}
            <div className="ml-4">
              <h5 className="font-sans text-base font-bold text-neutral-blue-gray">
                {"Harga " + comodity}
              </h5>
              <p className="font-sans text-gray-500 text-sm">
                Rata-rata Provinsi
              </p>
            </div>
            {clicked && (
              <div style={{ marginLeft: "auto" }}>
                <CircularProgress color="success" />
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RoundedCard;
