import React from "react";

const CustomCheckbox = ({ label, checked, onChange, value, id }) => {
  const [isChecked, setIsChecked] = React.useState(checked || false);
  React.useEffect(() => {
    if (isChecked) {
      onChange(value);
    } else {
      onChange()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);
  return (
    <div className="form-check flex align-middle my-2">
      <input
        className="form-check-input appearance-none h-5 w-5 border border-gray-400 rounded-md bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer my-auto"
        type="checkbox"
        id={id}
        value={value}
        style={{backgroundImage: 'url("/icons/check.png")', backgroundSize: '75%'}}
        checked={isChecked}
        onChange={() => {
          setIsChecked(!isChecked);
        }}>
      </input>
      <label className="form-check-label inline-block text-gray-900 text-sm font-normal" htmlFor={id} style={{maxWidth: '85%'}}>
        {label}
      </label>
    </div>
  );
};
  
export default CustomCheckbox;
