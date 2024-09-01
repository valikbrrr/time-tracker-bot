import { whitelistModel } from "../db/whitelist"

export const usersList = async () => {
    const findObj = await whitelistModel.find({})
    const us = findObj[0].users
    let usersId = us.map(el => el.id)
    console.log(usersId);
    return usersId
}