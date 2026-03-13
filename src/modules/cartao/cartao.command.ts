import { Command } from "../../core/command.js"
import { obterDadosCartao } from "./cartao.service.js"

const cartaoCommand: Command = {
  name: "cartao",
  description: "Consulta informações do cartão RU",

  async execute({ ctx, args }) {

    const matricula = args[0]
    const numeroCartao = args[1]

    if (!matricula || !numeroCartao) {
      await ctx.reply(
        "❌ Uso correto:\n/cartao `<matrícula>` `<número do cartão RU>`",
        { parse_mode: "Markdown" }
      )
      return
    }

    try {
      const dados = await obterDadosCartao(matricula, numeroCartao)

      if (!dados) {
        await ctx.reply(
          "❌ Cartão ou matrícula não encontrados.\n\nVerifique os dados e tente novamente."
        )
        return
      }

      const message = [
        "📇 *Informações do Cartão*",
        "",
        `👤 *Nome*: ${dados.nome}`,
        `🎓 *Matrícula*: ${dados.matricula}`,
        `💰 *Valor por crédito*: ${dados.valorCredito}`,
        `💳 *Saldo*: ${dados.saldo} ${Number(dados.saldo) === 1 ? "crédito" : "créditos"}`
      ].join("\n")

      await ctx.reply(message, {
        parse_mode: "Markdown"
      })

    } catch (error) {
      console.error(error)
      await ctx.reply("❌ Erro ao consultar cartão.")

    }
  }
}

export default cartaoCommand