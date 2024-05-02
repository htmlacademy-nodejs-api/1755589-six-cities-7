import { Command } from './commands/command.interface.js';
import { CommandParser } from './commands/commandParser.js';

type CommandCollection = Record<string, Command>;

export class Cli {
  constructor(
        private readonly defaultCommand: string = '--help'
  ){}

  private commands: CommandCollection = {};

  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      if(Object.hasOwn(this.commands, command.getName())) {
        throw new Error(`Failed to register ${command.getName()}`);
      }
      this.commands[command.getName()] = command;
    });
  }

  public getCommand(commandName: string): Command {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public getDefaultCommand(): Command | never {
    if(!this.commands[this.defaultCommand]) {
      throw new Error(`The default command ${this.defaultCommand} is already exist`);
    }
    return this.commands[this.defaultCommand];
  }

  public proccessCommand(args: string[]): void {
    const parsedCommand = CommandParser.parse(args);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArgs = parsedCommand[commandName] ?? [];
    command.execute(...commandArgs);
  }
}
