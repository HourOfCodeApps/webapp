export default (user) => {
  if (!user) {
    return false;
  }

  if (
    !user.email
    || !user.phone
    || !user.firstName
    || !user.lastName
    || !user.roles
    || (user.roles.teacher && !user.schoolId)
  ) {
    return false;
  }

  return true;
};
