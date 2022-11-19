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
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isInitialized: false,
  signOut() {},
});
