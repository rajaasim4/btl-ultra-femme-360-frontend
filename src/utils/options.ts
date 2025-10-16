export const rootsInGermanyAustriaOptions = ["כן", "לא", "לא בטוח"] as const;
export type RootsInGermanyAustriaOptions =
  (typeof rootsInGermanyAustriaOptions)[number];

export const documentOfFamilyMemberOptions = [
  "כן",
  "לא",
  "לא ידוע לי",
] as const;
export type DocumentOfFamilyMemberOptions =
  (typeof documentOfFamilyMemberOptions)[number];

//
export const StepTwoOptions = [
  "יובש",
  "צריבה",
  "כאב ביחסים",
  "תחושת רפיון/התרחבות",
  "אחר",
] as const;
export type StepTwoOptions = (typeof StepTwoOptions)[number];

export const StepThreeOptions = [
  "פחות משנה",
  "1–3 שנים",
  "מעל 3 שנים",
] as const;
export type StepThreeOptions = (typeof StepThreeOptions)[number];

export const StepFourOptions = ["כן", "לא"] as const;
export type StepFourOptions = (typeof StepFourOptions)[number];

export const StepFiveOptions = ["כן", "לא"] as const;
export type StepFiveOptions = (typeof StepFiveOptions)[number];

export const StepSixOptions = ["כן", "לא"] as const;
export type StepSixOptions = (typeof StepSixOptions)[number];

export const StepSevenOptions = [
  "ראשון לציון",
  "פתח תקווה",
  "קריית ביאליק-הקריון",
] as const;
export type StepSevenOptions = (typeof StepSevenOptions)[number];

export const StepNineOptions = [
  "ראשון לציון ",
  "קרית ביאליק ",
  "עפולה",
  "חדרה",
  "פתח תקווה",
  "כפר סבא",
  "נתניה",
  "ירושלים",
] as const;
export type StepNineOptions = (typeof StepNineOptions)[number];
