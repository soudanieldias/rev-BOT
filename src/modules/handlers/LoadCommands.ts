import { Client, Collection, REST, Routes } from 'discord.js';
import glob from 'glob';
import App from '../../App';
import path from 'path';
import ICommand from '../interfaces/ICommand';

export default async (client:Client, commands:Collection<String, ICommand>) => {
  try {
    console.log('[Commands] Carregando Módulo de Comandos');
    const commandFiles = glob.sync(`../../commands/**/*${path.extname(__filename)}/**}`);
    const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN!);

    const restCommands = [];

    for await (const file of commandFiles) {
      const command = require(`../../${file}`);
      const { name, description } = command.data;

      if (!name) throw new Error(`[Erro]: Nome do Comando não encontrado! Arquivo: ${command}`);
      if (!description ) return console.warn(`[Warn]: Description não encontrada! Arquivo: ${file}`);

      const cmd = client.application?.commands.cache.find((c) => (c.name === command.data.name));

      if (cmd) return console.error(`[Erro] Já existe um comando carregado com o mesmo nome: ${name}`);

      delete require.cache[require.resolve(`../../${file}`)];

      commands.set(command.data.name, command);
      restCommands.push(command.data);
    }

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!),
      {
        body: restCommands,
        // body: App.commands, // Old commands LOADER
      }
    );
    console.log('[Commands] Módulo de Comandos Carregado com Sucesso'); 

  } catch (error) {
    console.log(`[Commands] [Erro] Ocorreu um Erro ao Carregar o Comandos: \n${error}`);
  }
}
