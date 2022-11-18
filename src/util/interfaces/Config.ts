export interface IBotConfig {
  token: string;
  clientID: string;
  guildID: string;
}

export interface IGuildConfig {
  channels: {
    invite: string;
    resources: string;
    serverInfo: string;
    todo: string;
    memberLog: string;
    modLog: string;
    botLog: string;
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

export interface IENV {
  token: string | undefined;
  clientID: string | undefined;
  guildID: string | undefined;
}
