import { Client, Collection, SlashCommandBuilder, } from 'discord.js';
import Modules from './modules/index';
import ICommand from './modules/interfaces/ICommand';
import config from './config.json';
const {
  LoadCommands,
} = Modules;

export default class App {
  public client: Client = new Client({ partials: [], intents: []  });

  private TOKEN = config.TOKEN;

  public Commands = new Collection<String, ICommand>();

  constructor() {
    this.client.login(this.TOKEN);
  }
  
  public start() {
    // LoadCommands(this.client, this.Commands);
  }
}
