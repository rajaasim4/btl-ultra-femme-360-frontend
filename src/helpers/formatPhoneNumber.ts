export const formatPhoneNumber = (phoneNumber: string) => {
  if (phoneNumber.startsWith("05")) {
    return `+972${phoneNumber.substring(1)}`;
  }
  if (phoneNumber.startsWith("972")) {
    return `+972${phoneNumber.substring(3)}`;
  }
  return phoneNumber;
};
