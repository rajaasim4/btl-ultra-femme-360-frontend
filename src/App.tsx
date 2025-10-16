import { useAtom } from "jotai";
import { useEffect } from "react";
import { v4 } from "uuid";
import FormButtons from "./components/FormButtons";
import Header from "./components/Header";
import Loader from "./components/Loader/Loader";
import Stepper from "./components/Stepper";
import TermsOfUseModal from "./components/TermsOfUseModal";
import StepTwo from "./components/steps/StepTwo";
import StepLast from "./components/steps/StepLast";
import StepOne from "./components/steps/StepOne";
import StepFour from "./components/steps/StepFour";
import StepThree from "./components/steps/StepThree";
import {
  modalDisplayAtom,
  currentStepAtom,
  formIdAtom,
  loadingAtom,
} from "./store";
import MobileFooter from "./components/MobileFooter";
import StepTwoNegative from "./components/steps/StepTwoNegative";
import StepEight from "./components/steps/StepEight";
import StepFive from "./components/steps/StepFive";
import StepSix from "./components/steps/StepSix";
import StepSeven from "./components/steps/StepSeven";
import NegativeStep from "./components/steps/NegativeStep";
import { GiftIcon } from "./utils/Icons";
// import StepNine from "./components/steps/StepNine";

const App = () => {
  const [, setIsModalOpen] = useAtom(modalDisplayAtom);
  const [currentStep] = useAtom(currentStepAtom);
  const [isLoading] = useAtom(loadingAtom);
  const [, setFormId] = useAtom(formIdAtom);

  useEffect(() => {
    const id = localStorage.getItem("formId");
    if (id) {
      setFormId(id);
    } else {
      const newId = v4();
      localStorage.setItem("formId", newId);
      setFormId(newId);
    }
  }, []);
  return (
    <div
      dir="rtl"
      className="font-['Assistant'] bg-[url('/bg.jpg')] bg-no-repeat bg-cover min-w-full min-h-screen flex items-center justify-center overflow-hidden pt-6 pb-16 md:pt-12 md:pb-6 relative"
    >
      {/* <img
        src="/passport.webp"
        className={cn(
          "absolute bottom-28 md:bottom-0 -left-2 md:left-0 md:block z-10 w-[120px] xsm:w-36 sm:w-40 md:w-44 lg:w-52 xl:w-[17rem] 2xl:w-[17%]",
          {
            hidden: currentStep !== 5 || isLoading,
          }
        )}
      /> */}
      <TermsOfUseModal />
      <div className="bg-transparent p-8 md:px-20 md:py-16 border-8 border-white rounded-2xl w-11/12 md:w-10/12 max-w-screen-2xl relative">
        <div className="bg-white/85 p-4 rounded-2xl  min-h-[700px] flex flex-col">
          <div className="text-center flex sm:items-center items-start justify-center gap-2 font-medium">
            <GiftIcon />
            הטבה לחודש הקרוב: הנחה של 2,000 ₪ לחברי קופות החולים
          </div>
          <p className="text-center">בדיקת התאמה לטיפול בעזרת ™BTL EMSella</p>
          {!isLoading && currentStep !== 9 && <Stepper />}
          <Header />
          {isLoading && <Loader />}
          {currentStep === 1 && !isLoading && <StepOne />}
          {currentStep === 2 && !isLoading && <StepTwo />}
          {currentStep === -2 && !isLoading && <StepTwoNegative />}
          {currentStep === 3 && !isLoading && <StepThree />}
          {currentStep === -3 && !isLoading && <NegativeStep />}
          {currentStep === 4 && !isLoading && <StepFour />}
          {currentStep === 5 && !isLoading && <StepFive />}
          {currentStep === 6 && !isLoading && <StepSix />}
          {currentStep === 7 && !isLoading && <StepSeven />}
          {currentStep === 8 && !isLoading && <StepEight />}
          {currentStep === 9 && !isLoading && <StepLast />}
          {/* {currentStep === 8 && !isLoading && <StepNine />} */}

          <FormButtons />
          <MobileFooter />
        </div>
        <div className="flex flex-col items-center absolute left-1/2 -translate-x-1/2 -bottom-16 md:bottom-1 w-full">
          <a
            // onClick={() => {
            //   setIsModalOpen("TermsOfUse");
            // }}
            href="https://ba-media.co.il/privacy-policy/"
            target="_blank"
            className="text-xl font-bold text-white underline cursor-pointer"
          >
            מדיניות פרטיות ותנאי שימוש
          </a>
          <span
            onClick={() => {
              setIsModalOpen("accessibility");
            }}
            className="text-xl font-bold text-white underline cursor-pointer"
          >
            הצהרת נגישות
          </span>
        </div>
      </div>
    </div>
  );
};

export default App;
