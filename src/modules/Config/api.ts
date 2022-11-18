import firebase from 'firebase/app';
import 'firebase/remote-config';
import { Config } from './types';

export const fetchConfig = async (): Promise<Config> => {
  const remoteConfig = firebase.remoteConfig();

  await remoteConfig.fetchAndActivate();

  return {
    days: JSON.parse(remoteConfig.getString('days')),
    mentorTimeslotsEnabled: remoteConfig.getBoolean('mentorTimeslotsEnabled'),
    timeslotCreationEnabled: remoteConfig.getBoolean('timeslotCreationEnabled'),
    mentorSignupEnabled: remoteConfig.getBoolean('mentorSignupEnabled'),
    teacherSignupEnabled: remoteConfig.getBoolean('teacherSignupEnabled'),
  };
}
