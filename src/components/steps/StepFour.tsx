import { useAtom } from "jotai";
import { pregnantAtom } from "../../store";
import cn from "../../utils/cn";
import { StepFourOptions } from "../../utils/options";
import { stepContainerStyles, subHeadingStyles } from "../../utils/styles";

const StepFour = () => {
  const [pregnant, setpregnant] = useAtom(pregnantAtom);
  return (
    <div className={cn(stepContainerStyles, "mb-4")}>
      <h3 className={cn(subHeadingStyles, "mb-4 text-2xl")}>האם את בהיריון?</h3>
      <div className="text-xl flex gap-4 mb-4 flex-wrap justify-center">
        {StepFourOptions.map((option, index) => (
          <span
            key={index}
            className={cn(
              "w-36 md:w-52 px-2 py-4 rounded-lg border-themeBlue border-4 bg-white cursor-pointer text-lg md:text-3xl text-center",
              {
                "bg-themeBlue text-white": pregnant === option,
              }
            )}
            onClick={() => {
              setpregnant(option);
            }}
          >
            {option}
          </span>
        ))}
      </div>
    </div>
  );
};

export default StepFour;
