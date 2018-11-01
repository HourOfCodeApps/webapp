import firebase from 'firebase/app';
import 'firebase/firestore';

const loadUserSection = async (section, uid) => {
  const doc = await firebase.firestore().collection(section).doc(uid).get();

  return doc.exists ? doc.data() : null;
};

const loadUserProfile = async (uid) => {
  const profile = await loadUserSection('users', uid);

  if (!profile) {
    return null;
  }

  return {
    uid,
    ...profile,
  };
};

const loadUserInfo = async (uid) => {
  const profile = await loadUserSection('users', uid);

  if (!profile) {
    return null;
  }

  const admin = await loadUserSection('admins', uid);
  const mentor = await loadUserSection('mentors', uid);
  const teacher = await loadUserSection('teachers', uid);

  const user = { uid, profile };

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
export {
  loadUserProfile,
  loadUserSection,
};
