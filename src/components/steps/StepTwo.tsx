import { useAtom } from "jotai";
import { problemSufferingAtom } from "../../store";
import cn from "../../utils/cn";
import { stepContainerStyles, subHeadingStyles } from "../../utils/styles";
import { StepTwoOptions } from "../../utils/options";

const StepTwo = () => {
  const [problemSuffering, setproblemSuffering] = useAtom(problemSufferingAtom);

  return (
    <div className={cn(stepContainerStyles, "mb-4")}>
      <h4 className={cn(subHeadingStyles, "mb-4 text-2xl")}>
        מה הבעיה העיקרית שממנה את סובלת?
      </h4>
      <div className="text-xl flex gap-4 mb-4 flex-wrap justify-center max-w-full">
        {StepTwoOptions.map((option, index) => (
          <span
            key={index}
            className={cn(
              "py-4 px-2 rounded-lg bg-white cursor-pointer border-themeBlue border-4 w-40 md:w-48 max-w-full text-center text-lg md:text-3xl select-none",
              {
                "bg-themeBlue text-white": problemSuffering === option,
              }
            )}
            onClick={() => {
              setproblemSuffering(option);
            }}
          >
            {option}
          </span>
        ))}
      </div>
    </div>
  );
};

export default StepTwo;
