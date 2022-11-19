import { userMention, inlineCode, time, AuditLogEvent } from 'discord.js';
import { Event } from '../structures/Event';
import { getJoinedAtComponent } from '../util/functions/helpers';
import { JoinLeaveEmbedBuilder } from '../structures/Embeds/JoinLeaveEmbedBuilder';
import { getLogChannels } from '../util/functions/loggers';
import { errorLog } from '../util/functions/loggers';
import { ModerationEmbedBuilder } from '../structures/Embeds/ModerationEmbedBuilder';
import { ModerationAction } from '../util/types/moderationAction';

export default new Event('guildMemberRemove', async (member) => {
  try {
    // handle member leaving the guild (this should always run, even if the member was kicked or banned):

    console.log(`${member.user.tag} left ${member.guild.name}`);

    const joinedAt = getJoinedAtComponent(member);
    const { memberLog } = getLogChannels(member.guild);

    const userLeaveEmbed = new JoinLeaveEmbedBuilder(member, 'left', {
      description: `Username: ${userMention(
        member.user.id,
      )}\nUser ID: ${inlineCode(member.user.id)}${joinedAt}\nLeft at: ${time(
        new Date(),
        'f',
      )} (${time(new Date(), 'R')})`,
    });

    memberLog.send({ embeds: [userLeaveEmbed] });

    // handle member being kicked from the guild:

    const fetchedLogs = await member.guild.fetchAuditLogs({
      limit: 1,
      type: AuditLogEvent.MemberKick,
    });

    const kickLog = fetchedLogs.entries.first();

    if (!kickLog) {
      throw new Error('Cannot find kickLog.');
    }

    const { executor, target, action, reason } = kickLog;

    if (!executor || !target || action !== AuditLogEvent.MemberKick) {
      throw new Error('Cannot find executor or target from the Audit Log.');
    }

    const executingMember = await member.guild.members.fetch(executor.id);
    const { modLog } = getLogChannels(member.guild);

    if (target.id === member.user.id) {
      console.log(`${member.user.tag} was kicked from ${member.guild.name}.`);

      const kickEmbed = new ModerationEmbedBuilder({
        target: member.user,
        executor: executingMember,
        action: ModerationAction.kick,
        reason: reason,
      });

      modLog.send({ embeds: [kickEmbed] });
    } else {
      throw new Error(
        'The IDs of the target in the AuditLog and the target from the Event did not match.',
      );
    }
  } catch (err) {
    console.error(err);
    errorLog({
      client: member.client,
      guild: member.guild,
      type: 'error',
      errorMessage: `${inlineCode(
        'GuildMemberRemove',
      )} Event triggered but the embed could not be sent.`,
    });
  }
});
