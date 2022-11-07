import { AuditLogEvent } from 'discord.js';
import logChannels from '../util/discord/loggers.js';
import moderationAction from '../util/discord/moderationAction.js';
import buildModerationEmbed from '../util/discord/moderationEmbed.js';

export const event = {
  name: 'guildBanRemove',
  async execute(unbannedMember) {
    const fetchedLogs = await unbannedMember.guild.fetchAuditLogs({
      limit: 1,
      type: AuditLogEvent.MemberBanRemove,
    });

    console.log('event triggers');

    const unbanLog = fetchedLogs.entries.first();
    if (!unbanLog) return;

    console.log('unbanLog exists');

    const { executor, target } = unbanLog;
    const executingMember = await unbannedMember.guild.members.fetch(
      executor.id,
    );

    console.log(`targetID: ${target.id}\nunbannedMember: ${unbannedMember}`);

    if (target.id === unbannedMember.id) {
      const { modLog } = logChannels(unbannedMember.guild);
      console.log(
        `${unbannedMember.user.tag} was unbannedMember from ${unbannedMember.guild.name}.`,
      );

      const unbanEmbed = buildModerationEmbed(
        unbannedMember,
        moderationAction.unban,
        '\u200b',
        executingMember,
      );

      console.log(unbanEmbed);

      // modLog.send({ embeds: [unbanEmbed] });
    }
  },
};
