import type { Client, ClientUser, Guild } from 'discord.js';

interface ErrorOptionsInterface {
  client: Client;
  guild: Guild;
  type: 'error' | 'warn';
  errorMessage: string;
}

export default ErrorOptionsInterface;
