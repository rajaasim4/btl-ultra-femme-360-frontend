import { useAtom } from "jotai";
import { currentStepAtom, loadingAtom } from "../store";

const Header = () => {
  const [isLoading] = useAtom(loadingAtom);
  const [currentStep] = useAtom(currentStepAtom);

  return (
    <header className="flex flex-col items-center gap-7 mb-7">
      <div className="flex gap-8 justify-center md:justify-around items-center w-full">
        {currentStep !== 9 && (
          <div className="hidden md:flex items-center gap-5">
            <img src="/time.svg" className="w-12 h-12 md:w-16 md:h-16" />
            <p className="text-xl md:text-2.5xl font-bold">
              השאלון אורך <br />
              פחות מדקה
            </p>
          </div>
        )}
        <img
          src="/logo.webp"
          className="max-w-52 min-w-36 md:max-w-60 md:max-h-none mt-4 md:mt-0"
          alt="btl-ultra-femme-360"
        />
        {currentStep !== 9 && (
          <div className="hidden md:flex items-center gap-5">
            <img
              src="/lock.svg"
              className="w-12 h-12 md:w-16 md:h-16"
              alt="Secured Icon"
            />
            <p className="text-xl md:text-2.5xl font-extrabold">
              השימוש באתר
              <br />
              מאטובח ב ssl
            </p>
          </div>
        )}
      </div>
      {!isLoading && (
        <img src="/person.png" className="size-36 bg-top  rounded-full" />
      )}
    </header>
  );
};

export default Header;
