export const superAdmin = "su";
export const analyst = "analyst";
export const general = "general";
export const executive = "executive";

export const analystPermissions = [superAdmin, analyst];

export const checkAnalystPermissions = (roles) => analystPermissions.some(i => roles?.includes(i));
export const checkSURole = (roles) => roles?.includes(superAdmin);