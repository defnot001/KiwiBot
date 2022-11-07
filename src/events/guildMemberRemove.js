import {
  AuditLogEvent,
  EmbedBuilder,
  userMention,
  time,
  inlineCode,
} from 'discord.js';
import logChannels from '../util/discord/loggers.js';
import moderationAction from '../util/discord/moderationAction.js';
import buildModerationEmbed from '../util/discord/moderationEmbed.js';

export const event = {
  name: 'guildMemberRemove',
  async execute(removedMember) {
    console.log(`${removedMember.user.tag} left ${removedMember.guild.name}.`);

    const { memberLog, modLog } = logChannels(removedMember.guild);

    // protect the embed from breaking because joinedAt might not be properly cached
    const joinedAt = removedMember.joinedAt
      ? `\nJoined at: ${time(removedMember.joinedAt, 'f')} (${time(
          removedMember.joinedAt,
          'R',
        )})`
      : '\u200b';

    const userLeaveEmbed = new EmbedBuilder({
      author: {
        name: removedMember.user.tag,
        icon_url: removedMember.user.displayAvatarURL(),
      },
      color: 3_092_790,
      description: `Username: ${userMention(
        removedMember.user.id,
      )}\nUser ID: ${inlineCode(
        removedMember.user.id,
      )}${joinedAt}\nLeft at: ${time(new Date(), 'f')} (${time(
        new Date(),
        'R',
      )})`,
      footer: {
        text: 'User left',
      },
      timestamp: Date.now(),
    });

    memberLog.send({ embeds: [userLeaveEmbed] });

    // check if the user was kicked
    const fetchedLogs = await removedMember.guild.fetchAuditLogs({
      limit: 1,
      type: AuditLogEvent.MemberKick,
    });

    const kickLog = fetchedLogs.entries.first();
    console.log(kickLog.action);
    if (!kickLog) return;

    const { executor, target } = kickLog;
    const reason = kickLog.reason || 'No reason provided';
    const executingMember = await removedMember.guild.members.fetch(
      executor.id,
    );

    if (target.id === removedMember.id && kickLog.action === 20) {
      console.log(
        `${removedMember.user.tag} was kicked from ${removedMember.guild.name}.`,
      );

      const kickEmbed = buildModerationEmbed(
        removedMember,
        moderationAction.kick,
        reason,
        executingMember,
      );

      modLog.send({ embeds: [kickEmbed] });
    }
  },
};
