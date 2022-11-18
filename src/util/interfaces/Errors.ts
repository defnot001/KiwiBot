import type { Client, Guild } from 'discord.js';

export interface IErrorOptions {
  client: Client;
  guild: Guild;
  type: 'error' | 'warn';
  errorMessage: string;
}
