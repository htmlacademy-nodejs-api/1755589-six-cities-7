import { readFileSync } from 'node:fs';
import { Command } from './command.interface.js';
import { resolve } from 'node:path';

type ProjectVersion = {
  version: string;
};

function isProjectVersion(value: unknown): value is ProjectVersion {
  return(
    typeof value === 'object' &&
    !Array.isArray(value) &&
    value !== null &&
    Object.hasOwn(value, 'version')
  );
}

export class VersionCommand implements Command {
  constructor(
        private readonly filePath: string = 'package.json'
  ){}

  private readVerion(): string {
    const jsonContent = readFileSync(resolve(this.filePath), 'utf8');
    const versionProperty: unknown = JSON.parse(jsonContent);

    if(!isProjectVersion(versionProperty)) {
      throw new Error('Failed to read the verion');
    }
    return versionProperty.version;
  }

  public getName(): string {
    return '--version';
  }

  public async execute(..._params: string[]): Promise<void> {
    try{
      const verion = this.readVerion();
      console.info(verion);
    }catch(error: unknown) {
      console.error(`Faild to read data from ${this.filePath}`);

      if(error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
