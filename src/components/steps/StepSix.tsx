import { useAtom } from "jotai";
import { metalImplantsAtom } from "../../store";
import cn from "../../utils/cn";
import { StepSixOptions } from "../../utils/options";
import { stepContainerStyles, subHeadingStyles } from "../../utils/styles";

const StepSix = () => {
  const [metalImplants, setmetalImplants] = useAtom(metalImplantsAtom);
  return (
    <div className={cn(stepContainerStyles, "mb-4")}>
      <h3 className={cn(subHeadingStyles, "mb-4 text-2xl")}>
        האם יש נוכחות שתלים מתכתיים כגון התקן תוך־רחמי מסוג נחושת?
      </h3>
      <div className="text-xl flex gap-4 mb-4 flex-wrap justify-center">
        {StepSixOptions.map((option, index) => (
          <span
            key={index}
            className={cn(
              "w-36 md:w-52 px-2 py-4 rounded-lg bg-white border-themeBlue border-4 cursor-pointer text-lg md:text-3xl text-center",
              {
                "bg-themeBlue text-white": metalImplants === option,
              }
            )}
            onClick={() => {
              setmetalImplants(option);
            }}
          >
            {option}
          </span>
        ))}
      </div>
    </div>
  );
};

export default StepSix;
