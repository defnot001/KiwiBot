const util = require('minecraft-server-util');
const { EmbedBuilder } = require('discord.js');
const { guild, embedColor } = require('../config.json');

exports.isAdmin = (member) => member.roles.cache.has(guild.roleIds.admin);

exports.getServerStatus = (host, port) =>
  util.queryFull(host, port, { enableSRV: true });

exports.escapeMarkdown = (text) => {
  const unescaped = text.replace(/\\(\*|_|`|~|\\)/g, '$1');
  const escaped = unescaped.replace(/(\*|_|`|~|\\)/g, '\\$1');
  return escaped;
};

exports.buildDefaultEmbed = (user) =>
  new EmbedBuilder({
    color: parseInt(embedColor),
    footer: {
      text: `Requested by ${user.username}.`,
      iconURL: user.displayAvatarURL(),
    },
    timestamp: Date.now(),
  });

exports.queryMSPT = async (host, port, rconPassword) => {
  const options = { timeout: 1000 * 5 };
  const rcon = new util.RCON();

  await rcon.connect(host, port, options);
  await rcon.login(rconPassword, options);

  const data = await rcon.execute(
    `script run reduce(system_info('server_last_tick_times'), _a+_, 0)/100`
  );

  await rcon.close();

  const mspt = (Math.round(parseFloat(data.split(' ')[2]) * 100) / 100).toFixed(
    2
  );
  let tps;

  if (mspt <= 50) {
    tps = '20.0';
  } else {
    tps = 1000 / mspt;
  }

  return { mspt, tps };
};

exports.runRconCommand = async (host, rconPort, rconPassword, command) => {
  const options = { timeout: 1000 * 5 };
  const rcon = new util.RCON();

  await rcon.connect(host, rconPort, options);
  await rcon.login(rconPassword, options);

  const data = await rcon.execute(command);

  await rcon.close();
  return data;
};

// parses the servers response using the command 'script run get_mob_counts('monster')'
exports.parseMobcap = (str) =>
  str.replace(/^.{0,3}| \(.*\)|[[\]]/g, '').replace(/, /g, ' | ');

exports.queryMobcap = async (host, rconPort, rconPassword) => {
  const dimensions = ['overworld', 'the_nether', 'the_end'];
  const mobcap = {};

  for (const dim of dimensions) {
    const query = `execute in minecraft:${dim} run script run get_mob_counts('monster')`;
    const data = await this.runRconCommand(host, rconPort, rconPassword, query);
    mobcap[dim] = this.parseMobcap(data);
  }

  return mobcap;
};
