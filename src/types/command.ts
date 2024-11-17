export type CommandHandler = () => Promise<void>
export type Command = Record<string, CommandHandler>
