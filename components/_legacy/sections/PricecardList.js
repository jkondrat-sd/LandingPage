import React from "react";

import { PriceCard } from "@/components/_legacy";
import Image from "next/image";

const PriceCardList = ({ comodityId, data }) => {

  const minMaxAvgCommodityList = [
    {
      name: "max_value",
      nameId: "harga tertinggi",
      textColor: "text-green-500",
    },
    {
      name: "avg_value",
      nameId: "harga rata-rata",
      textColor: "text-yellow-500",
    },
    {
      name: "min_value",
      nameId: "harga terendah",
      textColor: "text-red-500",
    },
  ];

  return (
    <section className="">
      <div className="flex flex-wrap">
        {!data.length ? (
          <p></p>
        ) : (
          minMaxAvgCommodityList.map((prop) => {
            return (
              <PriceCard trait={prop} data={data} key={prop.name}>
                <div style={{width: '62px', height: '62px', position: 'relative'}}>
                  <Image src={`/icons/komoditas/${comodityId || 'default'}.svg`} layout="fill" alt="icon" />
                </div>
              </PriceCard>
            );
          })
        )}
      </div>
    </section>
  );
};

export default PriceCardList;
