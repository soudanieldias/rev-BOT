import { Client, PresenceUpdateStatus } from 'discord.js';

export default class SetPresence {
  public online(client:Client) {
    client.once('ready', () => {
      client.user?.setPresence({ status: PresenceUpdateStatus.Online });
    });
  };

  public idle(client:Client) {
    client.once('ready', () => {
      client.user?.setPresence({ status: PresenceUpdateStatus.Idle });
    });
  };

  public dnd(client:Client) {
    client.once('ready', () => {
      client.user?.setPresence({ status: PresenceUpdateStatus.DoNotDisturb });
    });
  };
}
