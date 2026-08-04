import React from "react";
import { Avatar } from "@mui/material";
import { TextWithIcon } from "@/components/_legacy";
import useMediaQuery from "@/hooks/useMediaQuery";
import Link from "next/link";

const ItemList = ({ datasetId, logo, title, organization, pilar, date, years }) => {
  const { isMobile, isTablet } = useMediaQuery();

  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );
  
  return (
    <Link href={`/dataset/${datasetId}`}>
      <a target='_blank'>
        <div className={`p-5 ${mobileTab ? '' : 'flex'} align-middle hover:bg-gray-200 cursor-pointer font-lato`}>
            <Avatar
              alt="Logo"
              src={logo}
              sx={{ width: 100, height: 100 }}
            />
            <div className={`${mobileTab ? '' : 'ml-5'} my-auto w-full`}>
              <p className="text-md font-medium">{title}</p>
              <div className={`${mobileTab ? '' : 'grid grid-cols-2'}`}>
                <TextWithIcon icon="/icons/office-building.svg" text={organization} style={{marginRight: mobileTab ? '0px' : '20px'}}/>
                <TextWithIcon icon="/icons/md-library.svg" text={pilar} />
                <TextWithIcon icon="/icons/database.svg" text={years} />
                <TextWithIcon icon="/icons/calendar.svg" text={date} />
              </div>
            </div>
        </div>
      </a>
    </Link>
  );
};

export default ItemList;
