import cn from "../../utils/cn";
import { headingStyles, stepContainerStyles } from "../../utils/styles";

const StepTwoNegative = () => {
    return (
        <div className={cn(stepContainerStyles, "mb-4 md:mb-12")}>
            <h3
                className={cn(
                    headingStyles,
                    "text-xl md:text-[40px] md:mb-4 md:leading-10"
                )}
            >
              במבט ראשוני נראה שאין התאמה לתנאים הנדרשים לקבלת דרכון גרמני.
              
                <br />
         
                
                *יש לשים לב אם אתה צאצא למוצא פולני / יוצאי ברית המועצות שהתגוררו בגרמניה, מומלץ לחזור ולמלא את האפשרות לא בטוח*
                
                <br />
                כמו כן, אם חלה טעות בבחירה ניתן לחזור לשלב הקודם <br />
                (חשוב למלא את הפרטים הנכונים כדי שנוכל לסייע בתהליך).
                
                <br />
            </h3>
        </div>
    );
};

export default StepTwoNegative;
