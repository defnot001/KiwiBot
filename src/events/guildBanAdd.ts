import { AuditLogEvent, inlineCode } from 'discord.js';
import { ModerationEmbedBuilder } from '../structures/Embeds/ModerationEmbedBuilder';
import { Event } from '../structures/Event';
import { errorLog, getLogChannels } from '../util/functions/loggers';
import { ModerationAction } from '../util/types/moderationAction';

export default new Event('guildBanAdd', async (guildBan) => {
  try {
    const ban = guildBan.partial ? await guildBan.fetch() : guildBan;

    console.log(`${ban.user.tag} was banned from ${ban.guild}.`);

    const fetchedLogs = await ban.guild.fetchAuditLogs({
      limit: 1,
      type: AuditLogEvent.MemberBanAdd,
    });

    const banLog = fetchedLogs.entries.first();

    if (!banLog) {
      throw new Error('Cannot find BanLog.');
    }

    const { executor, target, action, reason } = banLog;

    if (!executor || !target || action !== AuditLogEvent.MemberBanAdd) {
      throw new Error('Cannot find executor or target from the Audit Log.');
    }

    const executingMember = await ban.guild.members.fetch(executor.id);
    const { modLog } = getLogChannels(ban.guild);

    if (target.id === ban.user.id) {
      const banEmbed = new ModerationEmbedBuilder({
        target: ban.user,
        executor: executingMember,
        action: ModerationAction.ban,
        reason: reason,
      });

      modLog.send({ embeds: [banEmbed] });
    } else {
      throw new Error(
        'The IDs of the target in the AuditLog and the target from the Event did not match.',
      );
    }
  } catch (err) {
    console.error(err);
    errorLog({
      client: guildBan.client,
      guild: guildBan.guild,
      type: 'error',
      errorMessage: `${inlineCode(
        'GuildBanAdd',
      )} Event triggered but the embed could not be sent.`,
    });
  }
});
