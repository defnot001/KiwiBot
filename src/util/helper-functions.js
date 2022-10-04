const { EmbedBuilder } = require('discord.js');
const { guild, embedColor } = require('../../config.json');

exports.isAdmin = (member) => member.roles.cache.has(guild.roleIds.admin);

exports.buildDefaultEmbed = (user) =>
  new EmbedBuilder({
    color: parseInt(embedColor, 16),
    footer: {
      text: `Requested by ${user.username}.`,
      iconURL: user.displayAvatarURL(),
    },
    timestamp: Date.now(),
  });

exports.fetchAnimal = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
