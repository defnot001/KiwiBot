interface IGuildConfig {
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
  embedColor: {
    defaut: number;
    none: number;
    green: number;
    yellow: number;
    error: number;
  };
}

export default IGuildConfig;
