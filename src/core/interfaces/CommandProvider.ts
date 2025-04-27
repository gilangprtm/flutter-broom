export interface Command {
  id: string;
  title: string;
  callback: (...args: any[]) => any;
}

export interface CommandProvider {
  getCommands(): Command[];
}
