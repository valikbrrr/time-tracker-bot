// // // src/conversations/selectMonth.ts
// // import { MyContext } from "../types";
// // import { createConversation } from "@grammyjs/conversations";

// // export default createConversation(async (conversation, ctx: MyContext) => {
// //   await ctx.reply("Какое кол-во часов вы работали в этом месяце?⏰");
// //   const hoursInMonth = await conversation.wait();
// //   await ctx.reply("Это всё, спасибо!");
// // });



// // import { MyContext } from "../types";
// // import { createConversation } from "@grammyjs/conversations";

// // const selectMonth = createConversation(async (conversation, ctx: MyContext) => {
// //   await ctx.reply("Какое кол-во часов вы работали в этом месяце?⏰");
// //   const hoursInMonth = await conversation.wait();
// //   await ctx.reply("Это всё, спасибо!");
// // });

// // export default selectMonth;


// // src/conversations/selectMonth.ts
// import { MyContext } from "../types";
// import { createConversation } from "@grammyjs/conversations";

// const selectMonth = createConversation(async function selectMonth(conversation, ctx: MyContext) {
//   await ctx.reply("Какое кол-во часов вы работали в этом месяце?⏰");
//   const hoursInMonth = await conversation.wait();
//   await ctx.reply("Это всё, спасибо!");
// });

// export default selectMonth;

import { MyConversation, MyContextConversation } from "../myContext";

export async function selectMonth(conversation: MyConversation, ctx: MyContextConversation) {
    await ctx.reply("Какое кол-во часов вы работали в этом месяце?⏰");

    let hoursInMonth: string | undefined;

    while (true) {
        const response = await conversation.wait();
        hoursInMonth = response.message?.text; // Извлекаем текст сообщения

        // Проверяем, что введенное значение является числом от 1 до 744
        if (hoursInMonth && /^(?:[1-9]|[1-9]\d|[1-5]\d{2}|6[0-9]{2}|7[0-4][0-4])$/.test(hoursInMonth)) {
            break; // Ввод корректен, выходим из цикла
        } else {
            await ctx.reply("Кол-во часов можно ввести в промежутке от 1 до 744.");
        }
    }

    await ctx.reply(`Вы ввели: ${hoursInMonth}. Это всё, спасибо!`);
}