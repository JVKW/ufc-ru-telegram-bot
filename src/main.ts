import { bot } from './bot/bot.js'
import { registrarComandos } from './bot/registerCommands.js'

async function start() {

  await registrarComandos(bot)

  console.log("🤖 Bot rodando...")

  bot.start()

}

start()