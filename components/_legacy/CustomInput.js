import React from "react";
import Image from "next/image";

const CustomInput = ({ name, placeholder, icon, value='', onChange=() => {}, required, style={}, actionButton, type="text" }) => {
  return (
    <div className="relative rounded-md shadow-sm w-full" style={{...style}}>
      {icon &&
        <div className="absolute inset-y-0 left-2 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm" style={{width: "13px"}}>
            <Image src={icon} alt="icon" layout='fill' objectFit='contain' />
          </span>
        </div>
      }
      <input
        type={type}
        name={name}
        value={value}
        className={icon 
          ? "border border-green-500 focus:outline-none focus:border-green-500 focus:invalid:border-pink-500 invalid:border-pink-300 invalid:text-pink-600 block w-full pr-12 rounded-md p-2 pl-9" 
          : "border border-green-500 focus:outline-none focus:border-green-500 focus:invalid:border-pink-500 invalid:border-pink-300 invalid:text-pink-600 block w-full pr-12 rounded-md p-2"
        }
        placeholder={placeholder}
        onChange={onChange}
        style={{fontFamily: "Lato"}}
        required={required}
      ></input>
      {actionButton &&
        <div className="absolute inset-y-0 right-2 pl-3 flex items-center">
          {actionButton}
        </div>
      }
    </div>
  );
};
  
export default CustomInput;
