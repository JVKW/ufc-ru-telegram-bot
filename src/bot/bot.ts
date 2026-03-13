import { Bot } from "grammy"
import { BOT_TOKEN } from "../config.js"

if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN não definido no .env")
}

export const bot = new Bot(BOT_TOKEN)