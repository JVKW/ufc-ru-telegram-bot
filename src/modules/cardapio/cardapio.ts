import TelegramBot from "node-telegram-bot-api"
import { obterCardapioFormatado } from "./cardapio.command.js"

export default function (bot: TelegramBot) {

    bot.onText(/\/cardapio/, async (msg) => {
        const chatId = msg.chat.id

        try {
            const message = await obterCardapioFormatado()

            bot.sendMessage(chatId, message, {
                parse_mode: 'Markdown'
            })

        } catch (error) {
            console.error(error)

            bot.sendMessage(chatId, '❌ Erro ao buscar cardápio.')
        }
    })

}