import { useAtom } from "jotai";
import TagManager from "react-gtm-module";
import { v4 } from "uuid";
import {
  branchAtom,
  canResendOtpAtom,
  continueBtnLoadingAtom,
  createdAtAtom,
  currentStepAtom,
  dealingTimeAtom,
  errorMsgAtom,
  fullNameAtom,
  isPrivayReadAtom,
  loadingAtom,
  metalImplantsAtom,
  otpAttemptsAtom,
  phoneNumberAtom,
  pregnantAtom,
  problemSufferingAtom,
  sentOTPAtom,
  surgeryAtom,
  timeRemainingAtom,
  verifyOTPAtom,
} from "../store";
import {
  MAX_OTP_ATTEMPTS,
  OTP_EXPIRY_TIME,
  WEBHOOK_URL,
} from "../utils/CONSTS";
import cn from "../utils/cn";
import TermsAndPrivacyAgreement from "./TermsAndPrivacyAgreement";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { commonButtonStyles, inputFieldContainerStyles } from "../utils/styles";
import { formatPhoneNumber } from "../helpers/formatPhoneNumber";
import Modal from "../Modal/Modal";

const FormButtons = () => {
  const [currentStep, setCurrentStep] = useAtom(currentStepAtom);
  const [fullName] = useAtom(fullNameAtom);
  const [isLoading, setIsLoading] = useAtom(loadingAtom);
  const [phoneNumber] = useAtom(phoneNumberAtom);

  const [createdAt] = useAtom(createdAtAtom);
  const [btnLoading, setBtnLoading] = useAtom(continueBtnLoadingAtom);
  const [errorMsg, setErrorMsg] = useAtom(errorMsgAtom);
  const [isPrivacyRead] = useAtom(isPrivayReadAtom);
  const [stepTwo] = useAtom(problemSufferingAtom);
  const [stepThree] = useAtom(dealingTimeAtom);
  const [stepFour] = useAtom(pregnantAtom);
  const [stepFive] = useAtom(surgeryAtom);
  const [stepSix] = useAtom(metalImplantsAtom);
  const [stepSeven] = useAtom(branchAtom);
  const [otpVerified] = useAtom(verifyOTPAtom);
  // const [branch] = useAtom(branchAtom);

  const [, setOtpSent] = useAtom(sentOTPAtom);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useAtom(verifyOTPAtom);
  const [canResendOtp, setCanResendOtp] = useAtom(canResendOtpAtom);
  const [otpAttempts, setOtpAttempts] = useAtom(otpAttemptsAtom);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const [, setTimeRemaining] = useAtom(timeRemainingAtom);

  const inputRef = useRef<HTMLInputElement | null>(null);
  // const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const [redirectTimer, setRedirectTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const regex = /\d{10}$/;
  const startRedirectTimer = () => {
    // Clear any existing timer
    if (redirectTimer) {
      clearTimeout(redirectTimer);
    }

    // Set new 3-minute timer
    const timer = setTimeout(() => {
      if (!isVerified && currentStep === 8) {
        setCurrentStep(-2);
        closeOtpModal();
      }
      // }, 5 * 1000);
    }, 3 * 60 * 1000); // 3 minutes in milliseconds

    setRedirectTimer(timer);
  };

  //Redirection Logic

  useEffect(() => {
    if (isVerified && redirectTimer) {
      clearTimeout(redirectTimer);
      setRedirectTimer(null);
    }
  }, [isVerified]);

  useEffect(() => {
    return () => {
      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }
    };
  }, [redirectTimer]);

  // Handle OTP modal open/close
  const openOtpModal = () => setShowOtpModal(true);
  const closeOtpModal = () => setShowOtpModal(false);

  //Send Data to API

  const sendData = async () => {
    try {
      const payload = {
        fullName,
        stepTwo,
        stepThree,
        stepFour,
        stepFive,
        stepSix,
        stepSeven,
        createdAt,
        phoneNumber: formatPhoneNumber(phoneNumber),
        status: false,
        otpVerified: isVerified,
        pageUrl: window.location.href,
        isSendToZapier: false,
      };
      await fetch(`${API_BASE_URL}/api/send-data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      console.log(event);
      if (event.key === "Enter") {
        !isContinueBtnDisable() && handleContineBtnClick();
      }
    };

    document.body.addEventListener("keydown", handleKeyPress);

    return () => {
      document.body.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentStep, errorMsg, fullName, phoneNumber, isPrivacyRead]);

  const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    "https://btl-ultra-femme-360-backend.vercel.app";

  //Handle Update User Data

  const updateUserData = async () => {
    try {
      await axios.put(`${API_BASE_URL}/api/update-data`, {
        phoneNumber: formatPhoneNumber(phoneNumber),
        status: true,
        isSendToZapier: false,
      });
    } catch (error) {
      console.log("Error updating data");
    }
  };

  // Handle OTP input change
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    if (value.length <= 4) {
      setOtp(value);
    }
  };

  // Check if OTP can be sent (attempts limit)
  const canSendOtp = () => {
    return otpAttempts < MAX_OTP_ATTEMPTS;
  };

  // Handle Send OTP
  const handleSendOTP = async () => {
    if (!regex.test(phoneNumber)) {
      setErrorMsg("יש להזין מספר טלפון תקין");
      return;
    }

    if (!isPrivacyRead) {
      setErrorMsg("לתוצאות הבדיקה אנא עיין בתנאי השימוש");
      return;
    }

    if (!canSendOtp()) {
      setErrorMsg("הגעת למגבלת הבקשות היומית. נסה שוב מחר");
      return;
    }

    // setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: formatPhoneNumber(phoneNumber) }),
      });

      if (response.ok) {
        await sendData();

        startTimeRef.current = Date.now();
        setOtpSent(true);
        setErrorMsg("");
        startRedirectTimer();
        setOtp("");
        setTimeRemaining(OTP_EXPIRY_TIME);
        setCanResendOtp(false);
        setOtpAttempts((prev) => prev + 1);
        openOtpModal();

        localStorage.setItem(
          "otpState",
          JSON.stringify({
            expiryTimestamp: Date.now() + OTP_EXPIRY_TIME * 1000,
            otpSentState: true,
            phoneNumberState: phoneNumber,
            attempts: otpAttempts + 1,
          })
        );
      } else {
        const data = await response.json();
        setErrorMsg(data.error || "שגיאה בשליחת קוד האימות. נסה שוב");
      }
    } catch (error) {
      setErrorMsg("שגיאה בהתחברות לשרת. נסה שוב מאוחר יותר");
    }
    // setIsLoading(false);
  };

  // Sending Data to Zapier

  const submitFinalData = async () => {
    const payload = {
      fullName,
      stepTwo,
      stepThree,
      stepFour,
      stepFive,
      stepSix,
      stepSeven,
      phoneNumber,
      createdAt,
      pageUrl: window.location.href,
    };
    await fetch(WEBHOOK_URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    await updateUserData();
    TagManager.dataLayer({
      dataLayer: {
        event: `registration_complete_btl-ultra-femme-360`,
      },
    });
    localStorage.setItem("formId", v4());
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep((prev) => prev + 1);
    }, 800);
  };

  // Handle Verify OTP
  const handleVerifyOTP = async () => {
    if (otp.length !== 4) {
      setErrorMsg("נא להזין קוד אימות תקין");
      return;
    }

    // setIsLoading(true);
    console.log("this is sending to backend", otp);
    try {
      const response = await fetch(`${API_BASE_URL}/api/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: formatPhoneNumber(phoneNumber),
          otp,
        }),
      });

      if (response.ok) {
        setIsVerified(true);
        setErrorMsg("");
        setTimeRemaining(0);
        setCanResendOtp(false);
        localStorage.removeItem("otpState");
        startTimeRef.current = null;
        closeOtpModal();
        // setCurrentStep((currentStep) => currentStep + 1);

        // Submit data to Zapier after verification

        await submitFinalData();
      } else {
        const data = await response.json();
        if (data.error?.toLowerCase().includes("expired")) {
          setErrorMsg("קוד האימות פג תוקף. אנא שלח קוד חדש");
          setCanResendOtp(true);
          setTimeRemaining(0);
          localStorage.removeItem("otpState");
          startTimeRef.current = null;
        } else {
          setErrorMsg(data.error || "קוד אימות שגוי. נסה שוב");
        }
      }
    } catch (error) {
      setErrorMsg("שגיאה בהתחברות לשרת. נסה שוב מאוחר יותר");
    }
    // setIsLoading(false);
  };

  const handleContineBtnClick = async () => {
    setErrorMsg("");
    try {
      if (currentStep === 1 && fullName.length < 2) {
        setErrorMsg("לפחות 2 תווים");
        return;
      }
      if (currentStep === 8) {
        if (!regex.test(phoneNumber)) {
          setErrorMsg("יש להזין מספר טלפון תקין");
          return;
        }

        if (!otpVerified) {
          await handleSendOTP();
          return;
        }
      } else {
        setCurrentStep((prev) => prev + 1);
      }
      setBtnLoading(true);
    } catch (error) {
      console.log("Error: ", error);
    }
    setBtnLoading(false);
  };

  const handleReturnBtnClick = () => {
    if (currentStep === -2) setCurrentStep(2);
    else if (currentStep === -4) setCurrentStep(4);
    else setCurrentStep((prev) => prev - 1);
  };

  const isContinueBtnDisable = () => {
    if (btnLoading) return true;
    // else if (currentStep === 6 && !isPrivacyRead) return true;
    else if (currentStep === 2 && !stepTwo) return true;
    else if (currentStep === 3 && !stepThree) return true;
    else if (currentStep === 4 && !stepFour) return true;
    else if (currentStep === 5 && !stepFive) return true;
    else if (currentStep === 6 && !stepSix) return true;
    else if (currentStep === 7 && !stepSeven) return true;

    return false;
  };

  return (
    <>
      {!isLoading && currentStep !== 9 && (
        <div
          className={cn(
            "flex gap-4 xl:gap-12 2xl:gap-20 items-center flex-col-reverse md:flex-row justify-center md:justify-between md:mt-auto select-none",
            {
              "md:justify-center": [1, -2].includes(currentStep),
              "md:-mt-4": currentStep === -2,
            }
          )}
        >
          {![1, -3].includes(currentStep) && (
            <button
              disabled={currentStep === 1 || btnLoading}
              onClick={handleReturnBtnClick}
              className={`${commonButtonStyles} bg-themeBackBtnGrey`}
            >
              חזור
            </button>
          )}
          {currentStep === 8 && (
            <div className="hidden xl:block">
              <TermsAndPrivacyAgreement />
            </div>
          )}
          {![-2, -3].includes(currentStep) && (
            <button
              onClick={handleContineBtnClick}
              disabled={isContinueBtnDisable()}
              className={cn(`${commonButtonStyles} bg-themeBlue text-white`, {
                "opacity-70":
                  btnLoading ||
                  (currentStep === 8 && !isPrivacyRead) ||
                  (currentStep === 8 && !regex.test(phoneNumber)) ||
                  (currentStep === 1 && fullName.length < 2) ||
                  (currentStep === 7 && stepSeven.length < 2),
              })}
            >
              {currentStep === 8 ? "שלח" : "המשך"}
            </button>
          )}
        </div>
      )}

      {/* OTP Verification Modal */}
      <Modal isOpen={showOtpModal} onClose={closeOtpModal}>
        <div className="p-10 text-center">
          <h3 className="text-3xl font-medium mb-4">אימות מספר טלפון</h3>
          <p className="mb-4 font-medium">
            שלחנו קוד אימות למספר {phoneNumber}. הזן את הקוד להשלמת התהליך.
          </p>

          <div className="mb-4">
            <input
              type="number"
              value={otp}
              onChange={handleOtpChange}
              maxLength={4}
              placeholder="הזן קוד אימות"
              className={`${inputFieldContainerStyles} !w-full`}
              ref={inputRef}
            />
          </div>

          {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}

          <div className="flex justify-center gap-4">
            <button
              onClick={closeOtpModal}
              className="bg-gray-300 font-medium text-xl px-4 py-2 rounded"
            >
              ביטול
            </button>
            <button
              onClick={handleVerifyOTP}
              disabled={otp.length !== 4 || isLoading}
              className="bg-themeBlue font-medium px-5 text-white  text-xl py-2 rounded disabled:opacity-50"
            >
              {isLoading ? "מאמת..." : "אימות"}
            </button>
          </div>

          {canResendOtp && (
            <button
              onClick={handleSendOTP}
              disabled={!canSendOtp()}
              className="mt-4 text-themeBlue font-medium px-5 text-xl underline disabled:opacity-50"
            >
              שלח קוד מחדש ({MAX_OTP_ATTEMPTS - otpAttempts} ניסיונות נותרו)
            </button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default FormButtons;
