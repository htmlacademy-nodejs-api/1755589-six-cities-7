import { TSVFileReader } from '../../data/tsvFileReader.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public execute(...params: string[]): void {
    const [ fileName ] = params;
    const fileReader = new TSVFileReader(fileName.trim());

    try {
      fileReader.read();
      console.log(fileReader.setArray());
    } catch (error) {
      if((error instanceof Error)) {
        throw error;
      }
    }
  }
}
