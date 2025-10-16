import cn from "../utils/cn";

const MobileFooter = () => {
  
  return (
    <div
      className={cn(
        "flex  gap-4  mt-auto pt-8 justify-between items-center w-full md:hidden relative",
        // { hidden: currentStep === 5 }
      )}
    >
      <div className="flex items-center gap-5">
        <img src="/time.svg" className="w-12 h-12 md:w-16 md:h-16" />
        <p className="text-sm font-bold">אורך פחות מדקה</p>
      </div>
      <div className="flex items-center gap-5">
        <img
          src="/lock.svg"
          className="w-12 h-12 md:w-16 md:h-16"
          alt="Secured Icon"
        />
        <p className="text-sm font-bold">סודי ומאובטח</p>
      </div>
    </div>
  );
};

export default MobileFooter;
