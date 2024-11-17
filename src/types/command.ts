export type CommandHandler = () => Promise<void>

export type CommandName = string
export type CommandDescription = string

export type Command = {
  name: CommandName
  description: CommandDescription
  handler: CommandHandler
}
