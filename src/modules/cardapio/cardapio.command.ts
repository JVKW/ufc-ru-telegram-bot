import { Command } from "../../core/command.js"
import { obterCardapioFormatado } from "./cardapio.service.js"

const cardapioCommand: Command = {
  name: "cardapio",
  description: "Mostra o cardápio do RU",

  async execute({ ctx }) {
    try {
      const message = await obterCardapioFormatado()

      await ctx.reply(message, {
        parse_mode: "Markdown"
      })

    } catch (error) {

      console.error(error)
      await ctx.reply("❌ Erro ao buscar cardápio.")

    }
  }
}

export default cardapioCommand