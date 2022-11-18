import type { ClientEvents } from 'discord.js';

export class Event<Key extends keyof ClientEvents> {
  constructor(
    public event: Key,
    public execute: (...args: ClientEvents[Key]) => any,
  ) {}
}
