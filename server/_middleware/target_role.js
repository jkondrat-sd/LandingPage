const superAdmin = async (req, res, next) => {
  res.role_target = 1;
  return next();
};
const admin = async (req, res, next) => {
  res.role_target = 2;
  return next();
};
const groupAdmin = async (req, res, next) => {
  res.role_target = 3;
  return next();
};
const groupUser = async (req, res, next) => {
  res.role_target = 4;
  return next();
};
const user = async (req, res, next) => {
  res.role_target = 5;
  return next();
};

{
  superAdmin, admin, groupAdmin, groupUser, user;
}
