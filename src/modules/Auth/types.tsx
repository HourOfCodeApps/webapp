import { createContext } from 'react';

export type ProfileData = {
  firstName?: string; // TODO: check optional
  lastName?: string; // TODO: check optional
  email?: string; // TODO: check optional
  phone?: string; // TODO: check optional
  policyAgreed: boolean;
};

export type AdminData = {};

export type MentorData = {
  wasMentorBefore: boolean;
};

export type TeacherData = {
  isApproved: boolean;
  schoolId: string;
};

export type User = ProfileData & {
  uid: string;
  emailVerified: boolean;
  admin?: AdminData;
  mentor?: MentorData;
  teacher?: TeacherData;
  /**
   * @deprecated
   */
  profile: ProfileData;
};

export type AuthContextType = {
  user: User | null;
  isInitialized: boolean;
  // activeStep: string;
  // registerStep: (stepId: string) => (ref: Element | null) => void;
  // registerStepsContainer: (ref: Element | null) => void;
  // setStep: (stepId: string) => void;
  // steps: Step[];
  // switchToNextStep: () => void;
  // switchToPreviousStep: () => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isInitialized: false,
  // activeStep: '',
  // registerStep: () => () => {},
  // registerStepsContainer() {},
  // setStep() {},
  // steps: [],
  signOut() {},
  // switchToPreviousStep() {},
});
