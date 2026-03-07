import { bot } from './bot/bot.js'
import { registrarComandos } from './bot/registryCommands.js'

async function start() {
    await registrarComandos(bot)
    console.log('🤖 Bot rodando...')
}

start()
