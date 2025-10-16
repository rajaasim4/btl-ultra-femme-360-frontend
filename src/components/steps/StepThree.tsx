import { useAtom } from "jotai";
import { dealingTimeAtom } from "../../store";
import cn from "../../utils/cn";
import { StepThreeOptions } from "../../utils/options";
import { stepContainerStyles, subHeadingStyles } from "../../utils/styles";

const StepThree = () => {
  const [dealingTime, setdealingTime] = useAtom(dealingTimeAtom);
  return (
    <div className={cn(stepContainerStyles, "mb-4")}>
      <h3 className={cn(subHeadingStyles, "mb-4 text-2xl")}>
        כמה זמן את מתמודדת עם זה?
      </h3>
      <div className="text-xl flex gap-4 mb-4 flex-wrap justify-center">
        {StepThreeOptions.map((option, index) => (
          <span
            key={index}
            className={cn(
              "w-36 md:w-52 px-2 py-4 rounded-lg border-themeBlue border-4 bg-white cursor-pointer text-lg md:text-3xl text-center",
              {
                "bg-themeBlue text-white": dealingTime === option,
              }
            )}
            onClick={() => {
              setdealingTime(option);
            }}
          >
            {option}
          </span>
        ))}
      </div>
    </div>
  );
};

export default StepThree;
