import TelegramBot from "node-telegram-bot-api";
import { obterDadosCartao } from "../services/cartaoService.js";

export default function(bot: TelegramBot) {
    bot.onText(/\/cartao(?:\s+(\d+))?(?:\s+(\d+))?/, async (msg, match) => {
        const chatId = msg.chat.id

        const numeroCartao = match?.[2]
        const matricula = match?.[1]

        if (!numeroCartao || !matricula) {
            return bot.sendMessage(chatId, "❌ Uso correto:\n/cartao `<matrícula>` `<número do cartão RU>`", { parse_mode: "Markdown" })
        }

        try {
            const dados = await obterDadosCartao(matricula, numeroCartao)

            if (!dados) {
                return bot.sendMessage(
                    chatId,
                    "❌ Cartão ou matrícula não encontrados.\n\nVerifique os dados e tente novamente."
                )
            }

            const message = [
                "📇 *Informações do Cartão*",
                "",
                `👤 *Nome*: ${dados.nome}`,
                `🎓 *Matrícula*: ${dados.matricula}`,
                `💰 *Valor por crédito*: ${dados.valorCredito}`,
                `💳 *Saldo*: ${dados.saldo} ${Number(dados.saldo) === 1 ? 'crédito' : 'créditos'}`
            ].join("\n")

            bot.sendMessage(chatId, message, { parse_mode: "Markdown" })

        } catch (error) {
            console.error(error)
            bot.sendMessage(chatId, "❌ Erro ao consultar cartão.")
        }
    })
}