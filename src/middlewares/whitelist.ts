// import { Context } from "grammy";

// const whitelist = [1958491438, 882091398, 837291475];

// export default (ctx: Context, next: () => Promise<void>) => {
//   const userId = ctx.from?.id;
//   if (userId && whitelist.includes(userId)) {
//     return next();
//   } else {
//     return ctx.reply("Вам доступ ограничен");
//   }
// };


export const whitelist = [1958491438, 882091398, 837291475];