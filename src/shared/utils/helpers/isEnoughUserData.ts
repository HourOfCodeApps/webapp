const isEnoughUserData = (user): boolean => {
  if (!user) {
    return false;
  }

  const { profile, admin, mentor, teacher } = user;

  // no profile at all
  if (
    !profile ||
    !profile.email ||
    !profile.phone ||
    !profile.firstName ||
    !profile.lastName
  ) {
    return false;
  }

  // no role
  if (!admin && !mentor && !teacher) {
    return false;
  }

  // if not valid mentor

  // if not valid teacher
  if (teacher && !teacher.schoolId) {
    return false;
  }

  return true;
};

export default isEnoughUserData;
