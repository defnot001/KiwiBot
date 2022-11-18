import { userMention, inlineCode, time } from 'discord.js';
import { Event } from '../structures/Event';
import { errorLog, getLogChannels } from '../util/functions/loggers';
import { JoinLeaveEmbedBuilder } from '../structures/Embeds/JoinLeaveEmbedBuilder';
import {
  colorFromDuration,
  getJoinedAtComponent,
} from '../util/functions/helpers';

export default new Event('guildMemberAdd', async (member) => {
  try {
    console.log(`${member.user.tag} joined ${member.guild.name}.`);

    const { memberLog } = getLogChannels(member.guild);

    const joinedAt = getJoinedAtComponent(member);

    const accountAge: number =
      new Date().valueOf() - member.user.createdAt.valueOf();

    const embedColor: number = colorFromDuration(accountAge) || 3_092_790;

    const joinEmbed = new JoinLeaveEmbedBuilder(member, 'joined', {
      description: `Username: ${userMention(
        member.user.id,
      )}\nUser ID: ${inlineCode(member.user.id)}${joinedAt}\nCreated at: ${time(
        member.user.createdAt,
        'f',
      )} (${time(member.user.createdAt, 'R')})`,
    });

    joinEmbed.setColor(embedColor);

    memberLog.send({ embeds: [joinEmbed] });
  } catch (err) {
    console.error(err);
    errorLog({
      client: member.client,
      guild: member.guild,
      type: 'error',
      errorMessage: `'GuildMemberAdd' Event triggered but the embed could not be sent.`,
    });
  }
});
