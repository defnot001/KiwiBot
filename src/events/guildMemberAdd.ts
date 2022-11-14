import type { APIEmbed, GuildMember, TextChannel } from 'discord.js';
import { EmbedBuilder, userMention, inlineCode, time } from 'discord.js';
import { Event } from '../structures/Event';
import { colorFromDuration } from '../util/functions/helpers';
import guildConfig from '../config/guildConfig';

export default new Event('guildMemberAdd', async (member: GuildMember) => {
  console.log(`${member.user.tag} joined ${member.guild.name}.`);

  const memberLogChannel = member.guild.channels.cache.get(
    guildConfig.channels.memberLog,
  );

  if (!memberLogChannel || !memberLogChannel.isTextBased()) {
    return console.error('Cannot find the channel to post the join-embed in.');
  }

  const joinedAtComponent: string = member.joinedAt
    ? `\nJoined at: ${time(member.joinedAt, 'f')} (${time(
        member.joinedAt,
        'R',
      )})`
    : '\u200b';

  const accountAge: number =
    new Date().valueOf() - member.user.createdAt.valueOf();

  const embedColor: number = colorFromDuration(accountAge) || 3_092_790;

  const joinEmbed = new EmbedBuilder({
    author: {
      name: member.user.tag,
      icon_url: member.user.displayAvatarURL(),
    },
    color: embedColor,
    description: `Username: ${userMention(member.user.id)}\n
    User ID: ${inlineCode(member.user.id)}${joinedAtComponent}
    \n
    Created at: ${time(member.user.createdAt, 'f')} (${time(
      member.user.createdAt,
      'R',
    )})`,
    footer: {
      text: 'User joined',
    },
    timestamp: Date.now(),
  }) as APIEmbed;

  memberLogChannel.send({ embeds: [joinEmbed] });
});
