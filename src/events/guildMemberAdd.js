import {
  AuditLogEvent,
  EmbedBuilder,
  userMention,
  time,
  inlineCode,
} from 'discord.js';
import colorFromDuration from '../util/discord/colorFromDuration.js';
import guildconfig from '../config/guildConfig.js';

export const event = {
  name: 'guildMemberAdd',
  async execute(member) {
    console.log(`${member.user.tag} joined ${member.guild.name}.`);

    const memberLogChannel = member.guild.channels.cache.get(
      guildconfig.memberLogChannelId,
    );

    // * protect the embed from breaking because joinedAt might not be properly cached
    const joinedAt = member.joinedAt
      ? `\nJoined at: ${time(member.joinedAt, 'f')} (${time(
          member.joinedAt,
          'R',
        )})`
      : '\u200b';

    const embedColor =
      colorFromDuration(new Date() - member.user.createdAt) || 3_092_790;

    const userJoinEmbed = new EmbedBuilder({
      author: {
        name: member.user.tag,
        icon_url: member.user.displayAvatarURL(),
      },
      color: embedColor,
      description: `Username: ${userMention(
        member.user.id,
      )}\nUser ID: ${inlineCode(member.user.id)}${joinedAt}\nCreated at: ${time(
        member.user.createdAt,
        'f',
      )} (${time(member.user.createdAt, 'R')})`,
      footer: {
        text: 'User joined',
      },
      timestamp: Date.now(),
    });

    memberLogChannel.send({ embeds: [userJoinEmbed] });
  },
};
