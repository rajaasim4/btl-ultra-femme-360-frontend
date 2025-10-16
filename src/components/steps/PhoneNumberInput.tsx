import React from "react";
import {
  inputFieldContainerStyles,
  inputFieldStyles,
} from "../../utils/styles";

interface PhoneNumberInputProps {
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  errorMsg: string;
  setErrorMsg: (msg: string) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  phoneNumber,
  setPhoneNumber,
  errorMsg,
  setErrorMsg,
}) => {
  return (
    <div>
      <div
        dir="ltr"
        className={inputFieldContainerStyles}
        onClick={() => document.getElementById("phone-input")?.focus()}
      >
        <img src="icons/phone-icon.svg" />
        <input
          id="phone-input"
          type="text"
          //   placeholder="טלפון:"
          className={inputFieldStyles}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            setErrorMsg("");
          }}
          value={phoneNumber}
        />
      </div>
      {errorMsg && <p className="errorMessage">{errorMsg}</p>}
    </div>
  );
};

export default PhoneNumberInput;
