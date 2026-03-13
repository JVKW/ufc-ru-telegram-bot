import { Command } from "../../core/command.js"

const startCommand: Command = {
    name: "start",
    description: "Mostra a mensagem de boas-vindas",
    execute({ bot, msg }) {
        bot.sendMessage(
            msg.chat.id,
            '🥗 Bem-vindo ao Bot do Cardápio da UFC Russas!\n\nUse /cardapio para ver o de hoje.\nUse /cartao <matrícula> <número do cartão RU> para ver seu saldo atual'
        )
    }
}

export default startCommand