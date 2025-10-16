import cn from "../../utils/cn";
import { stepContainerStyles, subHeadingStyles } from "../../utils/styles";

const NegativeStep = () => {
  return (
    <div className={cn(stepContainerStyles, "mb-4")}>
      <h3 className={cn(subHeadingStyles, "mb-4 text-2xl")}>
        נראה כי לא קיימת התאמה
      </h3>
    </div>
  );
};

export default NegativeStep;
