import TelegramBot from 'node-telegram-bot-api';
import OpenAI from 'openai';

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userText = msg.text;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: userText }]
  });

  bot.sendMessage(chatId, completion.choices[0].message.content);
});
