import { time } from 'discord.js';
import type { GuildMember } from 'discord.js';

export function capitalizeFirstLetter(str: string): string | undefined {
  if (str.length <= 1) return;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function colorFromDuration(duration: number): number {
  const MAX_TRUST_ACCOUNT_AGE = 1_000 * 60 * 60 * 24 * 7 * 4;
  const percent = Math.min(duration / (MAX_TRUST_ACCOUNT_AGE / 100), 100);
  let red;
  let green;
  let blue = 0;

  if (percent < 50) {
    red = 255;
    green = Math.round(5.1 * percent);
  } else {
    green = 255;
    red = Math.round(510 - 5.1 * percent);
  }

  const tintFactor = 0.3;

  red += (255 - red) * tintFactor;
  green += (255 - green) * tintFactor;
  blue += (255 - blue) * tintFactor;

  return Math.floor((red << 16) + (green << 8) + blue);
}

export function getJoinedAtComponent(member: GuildMember): string {
  return member.joinedAt
    ? `\nJoined at: ${time(member.joinedAt, 'f')} (${time(
        member.joinedAt,
        'R',
      )})`
    : '\u200b';
}
