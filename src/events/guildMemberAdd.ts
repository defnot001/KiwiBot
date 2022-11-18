import { userMention, inlineCode, time } from 'discord.js';
import { Event } from '../structures/Event';
import { getLogChannels } from '../util/functions/loggers';
import { JoinLeaveEmbedBuilder } from '../structures/Embeds/JoinLeaveEmbedBuilder';
import {
  colorFromDuration,
  getJoinedAtComponent,
} from '../util/functions/helpers';

export default new Event('guildMemberAdd', async (member) => {
  console.log(`${member.user.tag} joined ${member.guild.name}.`);

  const { memberLog } = getLogChannels(member.guild);

  const joinedAt = getJoinedAtComponent(member);

  const accountAge: number =
    new Date().valueOf() - member.user.createdAt.valueOf();

  const embedColor: number = colorFromDuration(accountAge) || 3_092_790;

  const joinEmbed = new JoinLeaveEmbedBuilder(member, 'joined', {
    color: embedColor,
    description: `Username: ${userMention(member.user.id)}\n
    User ID: ${inlineCode(member.user.id)}${joinedAt}
    \n
    Created at: ${time(member.user.createdAt, 'f')} (${time(
      member.user.createdAt,
      'R',
    )})`,
  });

  memberLog.send({ embeds: [joinEmbed] });
});
