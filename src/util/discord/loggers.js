import guildconfig from '../../config/guildConfig.js';

const logChannels = (guild) => {
  const memberLog = guild.channels.cache.get(guildconfig.memberLogChannelId);
  const modLog = guild.channels.cache.get(guildconfig.modLogChannelId);

  return {
    memberLog,
    modLog,
  };
};

export default logChannels;
