// import { useAtom } from "jotai";
// import { useRef, useState, useEffect } from "react";
// import {
//   errorMsgAtom,
//   // otpAtom,
//   phoneNumberAtom,
//   sentOTPAtom,
//   verifyOTPAtom,
//   timeRemainingAtom,
//   canResendOtpAtom,
//   createdAtAtom,
//   urinaryIncontinenceAtom,
//   urinationUrgentAtom,
//   // documentOfFamilyMemberOptionsAtom,
//   pacemakerAtom,
//   paltinumsInPelvicAreaAtom,
//   pregnantAtom,
//   cityAtom,
//   branchtAtom,
//   fullNameAtom,
// } from "../../store";
// import cn from "../../utils/cn";
// import {
//   errorStyles,
//   inputFieldContainerStyles,
//   inputFieldStyles,
//   stepContainerStyles,
//   subHeadingStyles,
// } from "../../utils/styles";
// import TermsAndPrivacyAgreement from "../TermsAndPrivacyAgreement";

// // const OTP_EXPIRY_TIME = 10; // 5 minutes in seconds
// const OTP_EXPIRY_TIME = 5 * 60; // 5 minutes in seconds

// const StepEight = () => {
//   const [phoneNumber, setPhoneNumber] = useAtom(phoneNumberAtom);
//   const [errorMsg, setErrorMsg] = useAtom(errorMsgAtom);
//   const [otpSent, setOtpSent] = useAtom(sentOTPAtom);
//   const [otp, setOtp] = useState("");
//   const [isVerified, setIsVerified] = useAtom(verifyOTPAtom);
//   const [isLoading, setIsLoading] = useState(false);
//   const [timeRemaining, setTimeRemaining] = useAtom(timeRemainingAtom);
//   const [canResendOtp, setCanResendOtp] = useAtom(canResendOtpAtom);
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const startTimeRef = useRef<number | null>(null);

//   // Data

//   const [createdAt] = useAtom(createdAtAtom);
//   const [fullName] = useAtom(fullNameAtom);

//   const [stepTwo] = useAtom(urinaryIncontinenceAtom);
//   const [stepThree] = useAtom(urinationUrgentAtom);
//   const [stepFour] = useAtom(pacemakerAtom);
//   const [stepFive] = useAtom(paltinumsInPelvicAreaAtom);
//   const [stepSix] = useAtom(pregnantAtom);
//   const [stepSeven] = useAtom(cityAtom);

//   const [branch] = useAtom(branchtAtom);

//   const regex = /\d{9}$/;
//   const API_BASE_URL =
//     import.meta.env.VITE_API_URL || "https://betterlife-backend.vercel.app";

//   useEffect(() => {
//     const loadPersistedState = () => {
//       const persistedState = localStorage.getItem("otpState");
//       if (persistedState) {
//         const { expiryTimestamp, otpSentState, phoneNumberState } =
//           JSON.parse(persistedState);

//         if (expiryTimestamp > Date.now()) {
//           const remainingTime = Math.ceil(
//             (expiryTimestamp - Date.now()) / 1000
//           );
//           startTimeRef.current = Date.now();
//           setTimeRemaining(remainingTime);
//           setOtpSent(otpSentState);
//           setPhoneNumber(phoneNumberState);
//           setCanResendOtp(false);
//         } else {
//           localStorage.removeItem("otpState");
//           setTimeRemaining(0);
//           setCanResendOtp(true);
//         }
//       }
//     };

//     loadPersistedState();
//   }, [
//     setTimeRemaining,
//     setOtpSent,
//     setPhoneNumber,
//     setCanResendOtp,
//     setOtp,
//     otp,
//   ]);

//   // Send Data API

//   const sendData = async () => {
//     try {
//       setIsLoading(true);
//       const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

//       // Create payload with all the necessary fields
//       const payload = {
//         fullName,
//         stepTwo,
//         stepThree,
//         stepFour,
//         stepFive,
//         stepSix,
//         stepSeven,
//         branch,
//         phoneNumber: formattedPhoneNumber,
//         status: false,
//         otpVerified: isVerified,
//         createdAt: createdAt,
//         pageUrl: window.location.href,
//         isSendToZapier: false,
//       };

//       const response = await fetch(`${API_BASE_URL}/api/send-data`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         console.log("User data sent successfully:", data);
//       } else {
//         // setErrorMsg(data.error || "Failed to send data. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error sending data:", error);
//       // setErrorMsg("There was an error. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle timer logic
//   useEffect(() => {
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//     }

//     if (otpSent && timeRemaining > 0) {
//       // Store initial state
//       if (!startTimeRef.current) {
//         startTimeRef.current = Date.now();
//         const expiryTimestamp = startTimeRef.current + timeRemaining * 1000;
//         localStorage.setItem(
//           "otpState",
//           JSON.stringify({
//             expiryTimestamp,
//             otpSentState: otpSent,
//             phoneNumberState: phoneNumber,
//           })
//         );
//       }

//       // Set up interval for countdown
//       timerRef.current = setInterval(() => {
//         const newTimeRemaining = Math.max(0, timeRemaining - 1); // Decrease by 1 second

//         setTimeRemaining(newTimeRemaining); // Update state every second

//         if (newTimeRemaining === 0) {
//           if (timerRef.current) {
//             clearInterval(timerRef.current);
//           }
//           setCanResendOtp(true);
//           localStorage.removeItem("otpState");
//           startTimeRef.current = null;
//         }
//       }, 1000);
//     }

//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     };
//   }, [
//     otpSent,
//     timeRemaining,
//     phoneNumber,
//     setTimeRemaining,
//     setCanResendOtp,
//     otp,
//   ]);

//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
//   };

//   const formatPhoneNumber = (phoneNumber: string) => {
//     if (phoneNumber.startsWith("05")) {
//       return `+972${phoneNumber.substring(1)}`;
//     }
//     if (phoneNumber.startsWith("972")) {
//       return `+972${phoneNumber.substring(3)}`;
//     }
//     return phoneNumber;
//   };

//   const handleSendOTP = async () => {
//     if (!regex.test(phoneNumber)) {
//       setErrorMsg("יש להזין מספר טלפון תקין");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
//       const response = await fetch(`${API_BASE_URL}/api/send-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phoneNumber: formattedPhoneNumber }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         sendData();
//         startTimeRef.current = Date.now();
//         setOtpSent(true);
//         setErrorMsg("");
//         setOtp("");
//         setTimeRemaining(OTP_EXPIRY_TIME);
//         setCanResendOtp(false);
//         const expiryTimestamp = Date.now() + OTP_EXPIRY_TIME * 1000;
//         localStorage.setItem(
//           "otpState",
//           JSON.stringify({
//             expiryTimestamp,
//             otpSentState: true,
//             phoneNumberState: phoneNumber,
//           })
//         );
//       } else {
//         setErrorMsg(data.error || "שגיאה בשליחת קוד האימות. נסה שוב");
//       }
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       setErrorMsg("שגיאה בהתחברות לשרת. נסה שוב מאוחר יותר");
//     }
//     setIsLoading(false);
//   };

//   const handleVerifyOTP = async () => {
//     if (otp.length !== 4) {
//       setErrorMsg("נא להזין קוד אימות תקין");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
//       const response = await fetch(`${API_BASE_URL}/api/verify-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phoneNumber: formattedPhoneNumber, otp }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setIsVerified(true);
//         setErrorMsg("");
//         setTimeRemaining(0);
//         setCanResendOtp(false);
//         localStorage.removeItem("otpState");
//         startTimeRef.current = null;
//       } else {
//         if (data.error?.toLowerCase().includes("expired")) {
//           setErrorMsg("קוד האימות פג תוקף. אנא שלח קוד חדש");
//           setCanResendOtp(true);
//           setTimeRemaining(0);
//           localStorage.removeItem("otpState");
//           startTimeRef.current = null;
//         } else {
//           // Only set error message without resetting timer for incorrect OTP
//           setErrorMsg(data.error || "קוד אימות שגוי. נסה שוב");
//           // Don't reset timeRemaining or canResendOtp here
//         }
//       }
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       setErrorMsg("שגיאה בהתחברות לשרת. נסה שוב מאוחר יותר");
//       // Don't reset timeRemaining or canResendOtp here either
//     }
//     setIsLoading(false);
//   };
//   return (
//     <div className={stepContainerStyles}>
// <h3 className={subHeadingStyles}>
//   תודה על הזמן שהקדשת למילוי השאלון. נא להזין מספר טלפון נייד תקין ולמלא
//   את קוד האימות שישלח אליך:
// </h3>

//       <div className="space-y-4">
//         <div
//           className={inputFieldContainerStyles}
//           onClick={() => inputRef.current?.focus()}
//         >
//           <img src="icons/phone-icon.svg" alt="phone" />
//           <input
//             ref={inputRef}
//             type="number"
//             placeholder="טלפון:"
//             className={inputFieldStyles}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             value={phoneNumber}
//             disabled={otpSent && !canResendOtp}
//           />
//         </div>

//         {(!otpSent || canResendOtp) && !isVerified && (
//           <button
//             className="w-full px-4 py-2.5 bg-themeBlue rounded-lg text-white font-medium disabled:opacity-50"
//             onClick={handleSendOTP}
//             disabled={isLoading || !regex.test(phoneNumber)}
//           >
//             {isLoading
//               ? "שולח..."
//               : canResendOtp
//               ? "שלח קוד חדש"
//               : "שלח קוד אימות"}
//           </button>
//         )}

//         {otpSent && !isVerified && (
//           <>
//             <div className={inputFieldContainerStyles}>
//               <input
//                 type="number"
//                 placeholder="קוד אימות:"
//                 className={inputFieldStyles}
//                 onChange={(e) => setOtp(e.target.value)}
//                 value={otp}
//                 maxLength={6}
//               />
//             </div>
//             <div className="space-y-2">
//               {timeRemaining > 0 && (
//                 <div className="text-center font-semibold text-gray-600">
//                   קוד יפוג בעוד: {formatTime(timeRemaining)}
//                 </div>
//               )}
//               <button
//                 className="w-full px-4 py-2.5 bg-themeBlue rounded-lg text-white font-medium disabled:opacity-50"
//                 onClick={handleVerifyOTP}
//                 disabled={isLoading || otp.length !== 4}
//               >
//                 {isLoading ? "מאמת..." : "אמת קוד"}
//               </button>
//             </div>
//           </>
//         )}
//         {isVerified && (
//           <p className="text-center font-medium text-green-500">
//             האימות הצליח יש ללחוץ שלח ונחזור אליך בהקדם
//           </p>
//         )}
//         <div className="mb-2">
//           <p className={cn(errorStyles, "mb-0 text-center")}>
//             {errorMsg || " "}
//           </p>
//           <div className="xl:hidden">
//             <TermsAndPrivacyAgreement />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StepEight;

import { useAtom } from "jotai";
import { useRef } from "react";
import { errorMsgAtom, phoneNumberAtom } from "../../store";
import cn from "../../utils/cn";
import {
  errorStyles,
  inputFieldContainerStyles,
  inputFieldStyles,
  stepContainerStyles,
  subHeadingStyles,
} from "../../utils/styles";
import TermsAndPrivacyAgreement from "../TermsAndPrivacyAgreement";

const StepEight = () => {
  const [phoneNumber, setPhoneNumber] = useAtom(phoneNumberAtom);
  const [errorMsg] = useAtom(errorMsgAtom);
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className={stepContainerStyles}>
      <h3 className={subHeadingStyles}>
        {/* תודה על הזמן שהקדשת למילוי השאלון. נא להזין מספר טלפון נייד תקין ולמלא
        את קוד האימות שישלח אליך: */}
        כמעט סיימנו – נא להשאיר מספר נייד לחזרה דיסקרטית:
      </h3>

      <div
        className={inputFieldContainerStyles}
        onClick={() => inputRef.current?.focus()}
      >
        <img src="icons/phone-icon.svg" />
        <input
          ref={inputRef}
          type="number"
          placeholder="טלפון:"
          className={inputFieldStyles}
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
        />
      </div>
      <div className="mb-2">
        <p className={cn(errorStyles, "mb-0 text-center")}>
          {errorMsg ? errorMsg : " "}
        </p>
        <div className="xl:hidden">
          <TermsAndPrivacyAgreement />
        </div>
      </div>
    </div>
  );
};

export default StepEight;
