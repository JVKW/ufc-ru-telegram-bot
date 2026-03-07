import TelegramBot from "node-telegram-bot-api";

export interface CommandArg {
    name: String
    // description?: string
    required?: boolean
}

export interface CommandContext {
    bot: TelegramBot
    msg: TelegramBot.Message
    args: string[]
    chatId: string
}

export interface Command {
    name: string
    description?: string

    args?: CommandArg[]
    execute(ctx: CommandContext): Promise<void> | void
}