import { AuditLogEvent } from 'discord.js';
import logChannels from '../util/discord/loggers.js';
import moderationAction from '../util/discord/moderationAction.js';
import buildModerationEmbed from '../util/discord/moderationEmbed.js';

export const event = {
  name: 'guildBanAdd',
  async execute(banObject) {
    const fetchedLogs = await banObject.guild.fetchAuditLogs({
      limit: 1,
      type: AuditLogEvent.MemberBanAdd,
    });

    const banLog = fetchedLogs.entries.first();
    if (!banLog) return console.log({ banLog: banLog });

    const { executor, target } = banLog;
    const reason = banLog.reason || 'No reason provided';

    console.log({
      executor: executor,
      target: target,
      reason: reason,
    });

    const executingMember = await banObject.guild.members.fetch(executor.id);
    const bannedMember = await banObject.guild.members.fetch(target.id);

    const { modLog } = logChannels(banObject.guild);
    console.log({
      targetId: target.id,
      banObjectUserID: banObject.user.id,
    });

    if (target.id === banObject.user.id) {
      console.log(
        `${bannedMember.user.tag} was banned from ${banObject.guild.name}.`,
      );
      const banEmbed = buildModerationEmbed(
        bannedMember,
        moderationAction.ban,
        reason,
        executingMember,
      );

      // modLog.send({ embeds: [banEmbed] });
    }
  },
};
