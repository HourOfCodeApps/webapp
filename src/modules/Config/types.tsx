import { createContext } from 'react';

export type Config = {
  days: string[];
  mentorTimeslotsEnabled: boolean;
  timeslotCreationEnabled: boolean;
  mentorSignupEnabled: boolean;
  teacherSignupEnabled: boolean;
};

export const ConfigContext = createContext<Config>({
  days: [],
  mentorTimeslotsEnabled: false,
  mentorSignupEnabled: false,
  teacherSignupEnabled: false,
  timeslotCreationEnabled: false,
});
