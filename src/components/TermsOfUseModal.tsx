import { useAtom } from "jotai";
import { modalDisplayAtom } from "../store";
import { useDisableBodyScroll } from "../utils/useDisableBodyScroll";
import AccessibilityStatement from "./AccessibilityStatement";
import TermsOfUse from "./TermsOfUse";

const TermsOfUseModal = () => {
  const [isModalOpen, setIsModalOpen] = useAtom(modalDisplayAtom);
  const handleClose = () => setIsModalOpen("none");

  useDisableBodyScroll(isModalOpen);

  return (
    <>
      {isModalOpen !== "none" && (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-black">
          <div className="bg-black opacity-70 md:opacity-50 fixed h-screen w-screen overflow-hidden pointer-events-none" />
          <div className="bg-white z-50 max-w-3xl overflow-hidden relative mx-4 my-6 max-h-[calc(100vh-4rem)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-10 w-10 cursor-pointer absolute top-4 left-6"
              onClick={handleClose}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <div className="overflow-y-auto max-h-[calc(100vh-4rem)] px-8 py-4 md:px-20 md:py-12  scrollbar-thumb-themeStepperGrey scrollbar-track-transparent scrollbar-thin border-2 ml-1">
              {isModalOpen === "TermsOfUse" && <TermsOfUse />}
              {isModalOpen === "accessibility" && <AccessibilityStatement />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TermsOfUseModal;
