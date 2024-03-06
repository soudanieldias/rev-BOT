import { Client, Interaction } from "discord.js";

export default interface ICommand {
  data: {
    name: string;
    description: string;
    aliases?: string[];
  }
  name?: string;
  description?: string;
  aliases?: string[];
  permissions?: string[];
  cooldown?: number;
  execute(client:Client, interaction:Interaction): Interaction;
}
