import { whitelistModel } from "../db/whitelist";

export const adminsList = async (user: number) => {
  const findObj = await whitelistModel.find({});
  const adm = findObj[0].admins;
  let adminsId = adm.map((el) => el.id);

  if (adminsId.includes(user)) {
    return true;
  } else {
    return false;
  }
};
