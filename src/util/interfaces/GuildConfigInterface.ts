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
    member: string;
    admin: string;
  };
  emojis: {
    kiwi: string;
    owoKiwi: string;
    froghypers: string;
  };
}

export default GuildConfigInterface;
