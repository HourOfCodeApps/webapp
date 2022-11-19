import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AdminData, MentorData, ProfileData, TeacherData, User } from '../types';


const loadUserSection = async (section: string, uid: string) => {
  const doc = await firebase.firestore().collection(section).doc(uid).get();

  return doc.exists ? doc.data() : null;
};

const loadUserInfo = async (): Promise<User | null> => {
  const fbUser = await firebase.auth().currentUser;

  if (!fbUser) {
    return null;
  }

  const { uid } = fbUser;

  const profile = await loadUserSection('users', uid) as ProfileData;

  if (!profile) {
    return null;
  }

  const admin = await loadUserSection('admins', uid) as AdminData;
  const mentor = await loadUserSection('mentors', uid) as MentorData;
  const teacher = await loadUserSection('teachers', uid) as TeacherData;

  const user: User = {
    ...profile,
    uid,
    emailVerified: fbUser.emailVerified,
    profile, // TODO: remove
  };

  if (admin) {
    user.admin = admin;
  }

  if (mentor) {
    user.mentor = mentor;
  }

  if (teacher) {
    user.teacher = teacher;
  }

  return user;
};

export default loadUserInfo;
export { loadUserSection };
