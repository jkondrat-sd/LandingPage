import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/utils/common";
// rumus harga persen = (changed_price_average/compare_price_average) * 100
import CircularProgress from "@mui/material/CircularProgress";

const ComodityCard = ({ children, comodity, mobileTab }) => {

  const [clicked, setClicked] = React.useState(false);
  const replaceComodityName = (name) => {
    return name.replace(
      'boiler', 'RAS'
    ).replace(
      'broiler', 'RAS'
    )
  }

  const status_icon = comodity.status === "rise" ? "/icons/price_rise_icon.svg"
    : comodity.status === "fall" ? "/icons/price_fall_icon.svg"
    : "/icons/price_stable_icon.svg";

  const percent_icon = comodity.status === "rise" ? "/icons/rise_icon.svg"
  : comodity.status === "fall" ? "/icons/fall_icon.svg"
  : "/icons/stable_icon.svg";
  const price_percentage = (Number(comodity.changed_price_average)/Number(comodity.compare_price_average)) * 100;

  return (
    <div className="xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-full w-full px-5 mb-5">
      <Link className="flex-1" href={`/dashboard/harga?comodity_id=${comodity.id_commodity}`} passHref>
        <div className="h-full" onClick={(e) => setClicked(true)}>
          <div className="flex h-full items-center hover:shadow-lg rounded-xl p-4 cursor-pointer" style={{border: 'solid 1px #AAD6C1'}}>
            {children}
            <div className="ml-4">
              <h5 className="font-lato capitalize" style={{fontSize: mobileTab ? '16px' : '20px', color: '#757575'}}>
                {replaceComodityName(comodity.name_commodity)}
              </h5>
              <p className="font-lato-700" style={{fontSize: mobileTab ? '24px' : '28px', color: '#757575'}}>
                {formatCurrency(comodity.price_average)}/kg
              </p>
            </div>
            {clicked ? (
              <div style={{ marginLeft: "auto" }}>
                <CircularProgress color="success" />
              </div>
            ) : 
            (
              <>
                <div style={{width: '100px', height: '40px', position: 'relative', marginLeft: "auto"}}>
                  <Image src={status_icon} layout="fill" alt="icon" />
                </div>
                <div style={{width: '8px', height: '8px', position: 'relative'}}>
                  <Image src={percent_icon} layout="fill" alt="icon" />
                </div>
                <p style={{color: '#757575', fontSize: '12px', marginLeft: '3px'}}>{price_percentage.toFixed(2)}%</p>
              </>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ComodityCard;
