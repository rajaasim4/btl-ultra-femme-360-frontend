import { atom } from "jotai";
import moment from "moment";
import {
  DocumentOfFamilyMemberOptions,
  StepFiveOptions,
  StepFourOptions,
  // StepNineOptions,
  StepSevenOptions,
  StepSixOptions,
  StepThreeOptions,
  StepTwoOptions,
} from "./utils/options";
import { atomWithStorage } from "jotai/utils";

export const loadingAtom = atom(false);

export const currentStepAtom = atomWithStorage("currentStep", 1);

export const modalDisplayAtom = atom<"TermsOfUse" | "accessibility" | "none">(
  "none"
);

export const fullNameAtom = atomWithStorage("fullName", "");

export const documentOfFamilyMemberOptionsAtom = atomWithStorage<
  DocumentOfFamilyMemberOptions | ""
>("familyMemberDocument", "");

export const problemSufferingAtom = atomWithStorage<StepTwoOptions | "">(
  "problem_suffering",
  ""
);
export const dealingTimeAtom = atomWithStorage<StepThreeOptions | "">(
  "dealingTime",
  ""
);
export const pregnantAtom = atomWithStorage<StepFourOptions | "">(
  "pregnant",
  ""
);
export const surgeryAtom = atomWithStorage<StepFiveOptions | "">("surgery", "");
export const metalImplantsAtom = atomWithStorage<StepSixOptions | "">(
  "metalImplants",
  ""
);
export const branchAtom = atomWithStorage<StepSevenOptions | "">("branch", "");

// export const branchtAtom = atomWithStorage<StepNineOptions | "">("branch", "");
export const cityAtom = atomWithStorage("city", "");

export const phoneNumberAtom = atomWithStorage("phoneNumber", "");
export const otpAtom = atomWithStorage("otp", "");
export const verifyOTPAtom = atomWithStorage("otpverified", false);
export const sentOTPAtom = atomWithStorage("sentotp", false);
export const timeRemainingAtom = atom<number>(0);
export const canResendOtpAtom = atom<boolean>(false);
export const createdAtAtom = atom(
  moment(new Date()).format("Do MMM YYYY, h:mm a")
);

export const formIdAtom = atom("");

export const continueBtnLoadingAtom = atom(false);

export const errorMsgAtom = atom("");
export const cityMsgAtom = atom("");

export const isPrivayReadAtom = atom(false);

export const timerStartTimeAtom = atom<number | null>(null);
export const timerIntervalIdAtom = atom<NodeJS.Timeout | null>(null);

export const otpAttemptsAtom = atom<number>(0);
