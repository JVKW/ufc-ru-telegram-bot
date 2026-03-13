import { Command } from "../../core/command.js"

const startCommand: Command = {
  name: "start",

  async execute({ ctx }) {
    const name = ctx.from?.first_name || "amigo"

    await ctx.reply(
      `👋 Olá ${name}!\n\nBem-vindo ao bot da UFC`
    )
  }
}

export default startCommand