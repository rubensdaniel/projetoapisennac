import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis do .env

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const host = process.env.DB_HOST;
      const port = Number(process.env.DB_PORT);
      const username = process.env.DB_USER;
      const password = process.env.DB_PASS;
      const database = process.env.DB_NAME;

      console.log('📡 Conectando ao MySQL com as configurações:');
      console.log({
        host,
        port,
        username,
        database,
      });

      const dataSource = new DataSource({
        type: 'mysql',
        host,
        port,
        username,
        password,
        database,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        connectTimeout: 60000,
        extra: { connectionLimit: 10 },
        logging: true,
        ssl: false,
      });

      try {
        console.log('🟡 Tentando conectar ao banco de dados...');
        await dataSource.initialize();
        console.log('✅ Conexão com banco de dados estabelecida!');
        return dataSource;
      } catch (error) {
        console.error('❌ Erro ao conectar ao banco de dados:', error);
        throw error;
      }
    },
  },
];
