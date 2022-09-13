const { AuditLogEvent, inlineCode } = require('discord.js');
const { guild } = require('../../config.json');

module.exports = {
  name: 'guildMemberRemove',
  async execute(member) {
    const fetchedLogs = await member.guild.fetchAuditLogs({
      limit: 1,
      type: AuditLogEvent.MemberKick,
    });

    const botLogChannel = member.guild.channels.cache.get(
      guild.channelIds.botLogs
    );
    const kickLog = fetchedLogs.entries.first();

    if (!kickLog) {
      botLogChannel.send(
        `${inlineCode(member.user.tag)} (<@${
          member.user.id
        }>) left the guild, audit log fetch was inconclusive.`
      );
      return;
    }

    const { executor, target } = kickLog;

    if (target.id === member.id) {
      botLogChannel.send(
        `${inlineCode(member.user.tag)} (<@${
          member.user.id
        }>) left the guild. They were kicked by the mighty ${inlineCode(
          executor.tag
        )} (<@${executor.id}>)!`
      );
    } else {
      botLogChannel.send(
        `${inlineCode(member.user.tag)} (<@${
          member.user.id
        }>) left the guild, most likely of their own will.`
      );
    }
  },
};
