import { Cli } from './cli/cli.application.js';
import { HelpCommand } from './cli/commands/help.command.js';
import { ImportCommand } from './cli/commands/import.command.js';
import { VersionCommand } from './cli/commands/version.command.js';

(function() {
  const cliApplication = new Cli();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand()
  ]);
  cliApplication.proccessCommand(process.argv);
})();
