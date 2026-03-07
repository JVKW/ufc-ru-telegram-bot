import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv'

dotenv.config()

const token = process.env.BOT_TOKEN

if (!token) {
  throw new Error('BOT_TOKEN não definido no .env')
}

export const bot = new TelegramBot(token, {
  polling: true
})