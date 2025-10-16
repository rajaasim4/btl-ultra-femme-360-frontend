import { useAtom } from "jotai";
import { currentStepAtom } from "../store";
// import cn from "../utils/cn";

const PROGRESS_LINE_WIDTH = [
  "0%",
  "12.5%",
  "25%",
  "37.5%",
  "50%",
  "62.5%",
  "75%",
  "87.5%",
  "100%",
];

const Stepper = () => {
  const [currentStep] = useAtom(currentStepAtom);

  return (
    // <div className="w-full absolute top-5 sm:top-4 md:-top-11 left-1/2 -translate-x-1/2 max-w-56 xsm:max-w-80 sm:max-w-md md:max-w-3xl">
    <div className="w-full absolute -top-6 md:-top-11 left-1/2 -translate-x-1/2  max-w-[calc(100%-4.5rem)] md:max-w-3xl">
      <div className="relative flex items-center justify-between w-full">
        <div className="absolute right-0 top-5 md:top-10 h-7 rounded-lg w-full -translate-y-2/4 bg-themeStepperGrey"></div>
        <div
          className="absolute right-0 top-5 md:top-10 h-7 rounded-lg w-1/2 -translate-y-2/4 bg-themeBlue transition-all duration-500"
          style={{
            width: PROGRESS_LINE_WIDTH[Math.abs(currentStep) - 1],
          }}
        ></div>
      </div>
    </div>
  );
};

export default Stepper;
