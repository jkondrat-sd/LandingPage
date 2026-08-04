import React from "react";
import Image from "next/image";

// options example
// const options = [
//   { value: 'val1', label: 'Value 1'},
//   { value: 'val2', label: 'Value 2'},
// ];

const CustomSelect = ({ placeholder, icon, onChange, options, value = undefined, style={}, buttonStyle={} }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(placeholder);

  const ref = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  React.useEffect(() => {
    const val = value ? options.find((item) => item.value?.toString() === value.toString() || item.id?.toString() === value.toString()) : {};
    setSelected( val?.label || val?.name || placeholder);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeholder, value]);
  
  const handleSelect = (selected) => {
    if (selected) {
      onChange(selected.value || selected.id);
      setSelected(selected.label || selected.name);
      setIsOpen(false);
    }
  };

  const openDropdown = isOpen ? 'z-50 visible' : 'invisible';
  const existIcon = icon ? 'pl-9' : '';

  return (
    <div className="relative inline-block text-left w-full font-lato" ref={ref} style={style}>
      <div>
        <button type="button" 
          className={`inline-flex border border-green-500 focus:outline-none focus:border-green-700 focus:invalid:border-pink-500 invalid:border-pink-300 invalid:text-pink-600 block w-full pr-12 rounded-md p-2 capitalize ${existIcon}`}
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
          style={buttonStyle}
        >
          {icon ?
            (
              <div className="absolute inset-y-0 left-2 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm" style={{width: "13px"}}>
                  <Image src={icon} alt="icon" layout='fill' objectFit='contain' />
                </span>
              </div>
            )
            : (
              <div className="absolute inset-y-0 right-2 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm" style={{width: "5px"}}>
                  <Image src="/icons/select_icon.svg" alt="icon" layout='fill' />
                </span>
              </div>
            )
          }
          {selected}
        </button>
      </div>

      <div 
        className= {`origin-top-right absolute right-0 mt-2 w-full rounded-b-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-300 focus:outline-none ${openDropdown}`}
        style={{
          maxHeight: "50vh",
          overflow: "auto"
        }}
      >
        {Array.isArray(options) && options.map((item, idx) => (
          <div className="py-1 hover:bg-gray-200" key={idx} >
            <div className="block px-4 py-2 cursor-pointer capitalize" onClick={() => handleSelect(item)}>{item?.label || item?.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
  
export default CustomSelect;
