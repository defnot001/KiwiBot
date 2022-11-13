interface GuildConfigInterface {
  channels: {
    invite: string;
    resources: string;
    serverInfo: string;
    todo: string;
    memberLog: string;
    modLog: string;
  };
  roles: {
    members: string;
    admins: string;
  };
  emojis: {
    kiwi: string;
    owoKiwi: string;
    froghypers: string;
  };
}

export default GuildConfigInterface;
