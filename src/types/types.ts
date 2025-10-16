export type FormState = {
  currentStep: number;
  fullName: string;
  phoneNumber: string;
  age: string;
  stepThreeValue: string;
  stepFourValue: string;
  stepFiveValue: string;
  stepSixValue: string;
  stepSevenValue: string;
  stepEightValue: string;
  isPrivacyRead: boolean;
  otpVerified: boolean;
  createdAt: string;
  otpAttempts: number;
  canResendOtp: boolean;
  timeRemaining: number;
  otpSent: boolean;
  errorMsg: string;
  btnLoading: boolean;
  isLoading: boolean;
};

export type OTPModalState = {
  showOtpModal: boolean;
  otp: string;
};

export type TimerState = {
  redirectTimer: number | null;
  startTimeRef: React.MutableRefObject<number | null>;
};
