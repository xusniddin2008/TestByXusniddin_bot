const { Telegraf, Matkup, Markup } = require("telegraf");
require("dotenv").config();
const text = require("./const");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) =>
  ctx.reply(
    `Salom ${
      ctx.message.from.first_name
        ? ctx.message.from.first_name
        : "foydalanuvchi"
    }!`
  )
);
bot.help((ctx) => ctx.reply(text.commands));

bot.command("course", async (ctx) => {
  try {
    await ctx.replyWithHTML(
      "<b>Kurslar</b>",
      Markup.inlineKeyboard([
        [
          Markup.button.callback("Redaktorlar", "btn_1"),
          Markup.button.callback("Obzorlar", "btn_2"),
          Markup.button.callback("JS", "btn_3"),
        ],
      ])
    );
  } catch (e) {
    console.error(e);
  }
});

function addActionBot(name, src, text) {
  bot.action(name, async (ctx) => {
    try {
      await ctx.answerCbQuery();
      if (src !== false) {
        await ctx.replyWithPhoto({
          source: src,
        });
      }
      await ctx.replyWithHTML(text, {
        disable_web_page_preview: true,
      });
    } catch (e) {
      console.error(e);
    }
  });
}
addActionBot("btn_1", "./img/1.jpg", text.text1);
addActionBot("btn_2", "./img/2.jpg", text.text2);
addActionBot("btn_3", false, text.text3);

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

// npm init -y
// npm i telegraf
// npm i dotenv
// npm i -D nodemon
// node index.js
// npm run dev
