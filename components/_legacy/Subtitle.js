import React from "react";
import useMediaQuery from "@/hooks/useMediaQuery";

const Subtitle = ({ text, className='', style={} }) => {
  const { isMobile, isTablet } = useMediaQuery();

  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );
  return (
    <div
      className={`subtitle w-full text-center my-5 ${className}`}
      style={{
        color: "#000000",
        fontSize: mobileTab ? '16px' : '20px',
        lineHeight: mobileTab ? '20px' : '28px',
        ...style
      }}
      dangerouslySetInnerHTML={{__html: text}}>
    </div>
  );
};

export default Subtitle;
