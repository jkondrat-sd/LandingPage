import Image from "next/image";
import React from "react";
const TextWithIcon = ({ icon, text, style={}, iconWidth, iconHeight, mobileTab=false }) => {
  return (
    <div style={style}>
      <div
        className="my-1 flex align-middle"
        style={{color: "#757575"}}
        >
          <span style={{width: iconWidth || '20px', height: iconHeight || '20px'}}>
            <Image src={icon} alt="icon" width={iconWidth || '20px'} height={iconHeight || '20px'} />
          </span>
          <span className={`${mobileTab ? 'text-xs' : 'text-sm'} ml-2`} style={{maxWidth: '85%'}} dangerouslySetInnerHTML={{__html: text}}></span>
      </div>
    </div>
  );
};

export default TextWithIcon;
