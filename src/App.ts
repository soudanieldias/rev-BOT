import { Client } from 'discord.js';

export default class App {
  public client = new Client({ partials: [], intents: []  });
  constructor() {}

  public start() {}
}
