import { Context } from "grammy"

export interface CommandArg {
  name: string
  required?: boolean
}

export interface CommandContext {
  ctx: Context
  args: string[]
}

export interface Command {
  name: string
  description?: string
  args?: CommandArg[]

  execute(context: CommandContext): Promise<void> | void
}