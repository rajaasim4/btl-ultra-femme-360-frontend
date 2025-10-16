import { useAtom } from "jotai";
import { errorMsgAtom, fullNameAtom } from "../../store";
import { useRef } from "react";
import {
  errorStyles,
  headingStyles,
  inputFieldContainerStyles,
  inputFieldStyles,
  stepContainerStyles,
  subHeadingStyles,
} from "../../utils/styles";
import cn from "../../utils/cn";

const StepOne = () => {
  const [fullName, setFullName] = useAtom(fullNameAtom);
  const [errorMsg] = useAtom(errorMsgAtom);
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className={stepContainerStyles}>
      {/* <h3 className={headingStyles}>היי, כאן מיכל</h3> */}
      <h4 className={cn(subHeadingStyles, "md:leading-10 w-11/12")}>
        היי, אני כאן כדי לעזור לך לבדוק התאמה לטיפול – זה מהיר ודיסקרטי.
        <br />
        מה שמך המלא?
      </h4>
      <div
        className={inputFieldContainerStyles}
        onClick={() => inputRef.current?.focus()}
      >
        <img src="icons/person-icon.svg" />
        <input
          ref={inputRef}
          type="text"
          placeholder="מה שמך המלא?"
          className={inputFieldStyles}
          onChange={(e) => {
            if (!/\d/.test(e.target.value)) {
              // Update the state if there are no numbers
              setFullName(e.target.value);
            }
          }}
          value={fullName}
        />
      </div>
      <p className={cn(errorStyles, "md:mb-2")}>{errorMsg ? errorMsg : " "}</p>
    </div>
  );
};

export default StepOne;
