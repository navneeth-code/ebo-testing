import React from "react";

const PhoneInput = ({ number, setNumber, disabled }) => {
  return (
    <div className="flex gap-4 my-1">
      <span className="border-b-[1px] border-black pr-1">+91</span>
      <input
        className="border-b-[1px] border-black px-2 outline-none pb-[3px] w-[90%]"
        type="number"
        onChange={(e) => setNumber(e.target.value)}
        value={number}
        disabled={disabled ? disabled : false}
      />
    </div>
  );
};

export default PhoneInput;
