import React from "react";
import Link from "next/link";

const Button = (props) => {
  return (
    <div style={props.style}>
      <Link href="/map_ketahanan_pangan" passHref>
        <button className="flex flex-row items-center font-lato text-white px-2 w-auto h-10 rounded-md bg-gray-900 hover:bg-gray-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none content-center">
          <p className="py-1 px-2 font-normal flex">{props.title}</p>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.3333 14.2222H2.66667C2.17778 14.2222 1.77778 13.8222 1.77778 13.3333V2.66667C1.77778 2.17778 2.17778 1.77778 2.66667 1.77778H7.11111C7.6 1.77778 8 1.37778 8 0.888889C8 0.4 7.6 0 7.11111 0H1.77778C1.30628 0 0.854097 0.187301 0.520699 0.520699C0.187301 0.854097 0 1.30628 0 1.77778V14.2222C0 15.2 0.8 16 1.77778 16H14.2222C15.2 16 16 15.2 16 14.2222V8.88889C16 8.4 15.6 8 15.1111 8C14.6222 8 14.2222 8.4 14.2222 8.88889V13.3333C14.2222 13.8222 13.8222 14.2222 13.3333 14.2222ZM9.77778 0.888889C9.77778 1.37778 10.1778 1.77778 10.6667 1.77778H12.9689L4.85333 9.89333C4.68713 10.0595 4.59376 10.285 4.59376 10.52C4.59376 10.755 4.68713 10.9805 4.85333 11.1467C5.01954 11.3129 5.24495 11.4062 5.48 11.4062C5.71505 11.4062 5.94046 11.3129 6.10667 11.1467L14.2222 3.03111V5.33333C14.2222 5.82222 14.6222 6.22222 15.1111 6.22222C15.6 6.22222 16 5.82222 16 5.33333V0.888889C16 0.4 15.6 0 15.1111 0H10.6667C10.1778 0 9.77778 0.4 9.77778 0.888889Z"
              fill="white"
            />
          </svg>
        </button>
      </Link>
    </div>
  );
};

export default Button;
