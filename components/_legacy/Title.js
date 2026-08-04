import React from "react";
import useMediaQuery from "@/hooks/useMediaQuery";

const Title = ({ text, className='', style={} }) => {
  const { isMobile, isTablet } = useMediaQuery();

  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );
  return (
    <div
      className={`title w-full text-center my-5 ${className}`}
      style={{
        color: "#008444",
        fontSize: mobileTab ? '24px' : '40px',
        lineHeight: mobileTab ? '30px' : '48px',
        ...style
      }}
      dangerouslySetInnerHTML={{__html: text}}>
    </div>
  );
};

export default Title;
