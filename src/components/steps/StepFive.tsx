import { useAtom } from "jotai";
import { surgeryAtom } from "../../store";
import cn from "../../utils/cn";
import { StepFiveOptions } from "../../utils/options";
import { stepContainerStyles, subHeadingStyles } from "../../utils/styles";

const StepFive = () => {
  const [surgery, setsurgery] = useAtom(surgeryAtom);
  return (
    <div className={cn(stepContainerStyles, "mb-4")}>
      <h3 className={cn(subHeadingStyles, "mb-4 text-2xl")}>
        האם עברת ניתוח גינקולוגי (קיסרי / כריתת רחם / היסטרוסקופיה) ב־3 החודשים
        האחרונים?
      </h3>
      <div className="text-xl flex gap-4 mb-4 flex-wrap justify-center">
        {StepFiveOptions.map((option, index) => (
          <span
            key={index}
            className={cn(
              "w-36 md:w-52 px-2 py-4 rounded-lg border-themeBlue border-4 bg-white cursor-pointer text-lg md:text-3xl text-center",
              {
                "bg-themeBlue text-white": surgery === option,
              }
            )}
            onClick={() => {
              setsurgery(option);
            }}
          >
            {option}
          </span>
        ))}
      </div>
    </div>
  );
};

export default StepFive;
