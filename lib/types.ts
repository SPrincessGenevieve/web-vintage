export interface StepOneRegisterType {
  email: string;
  fullname: string;
  mobileNumber: string;
  birthDate: string;
}

export interface StepTwoRegisterType {
  streetAddress: string;
  city: string;
  county: string;
  postalCode: string;
  country: string;
}

export interface StepThreeRegisterType {
  idType: string;
  image: File | null;
  feedback: string;
}

export interface StepTwoInviteType {
  firstname: string;
  lastname: string;
  birthDate: string | undefined;
  code: string;
  phoneNumber: string;
  email: string;
}

export interface StepThreeInviteType {
  depositAmount: number;
  holdinPeriod: string;
  isFirstTime: string;
  region: string;
}
