import cn from "../../utils/cn";
import { headingStyles, stepContainerStyles } from "../../utils/styles";

const StepLast = () => {
  return (
    <div className={cn(stepContainerStyles, "mb-12")}>
      <h3 className={cn(headingStyles)}>
        אנו מודים לך, נציג מקצועי מטעמנו יבדוק את התאמתך לטיפול בעזרת
        ™btl-ultra-femme-360
        <br />
        ויחזור אלייך בשיחת טלפון
        <br />
        בקרוב.
      </h3>
    </div>
  );
};

export default StepLast;
