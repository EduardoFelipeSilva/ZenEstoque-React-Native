
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  USERS_KEY,
  LOGGED_USER_KEY
} from '../storage/storageKeys';

export const debugDatabase = {
  // Listar usuários cadastrados
  listarTodos: async () => {
    try {
      const usersJson = await AsyncStorage.getItem(USERS_KEY);
      const users = usersJson ? JSON.parse(usersJson) : [];

      // Não exibir senhas no console
      const safeUsers = users.map(({ senha, ...user }) => user);

      console.log(
        '📦 [DATABASE] Usuários cadastrados:',
        JSON.stringify(safeUsers, null, 2)
      );

      return safeUsers;
    } catch (error) {
      console.log('❌ [DATABASE] Erro ao listar usuários:', error);
      return [];
    }
  },

  // Consultar usuário logado
  verUsuarioLogado: async () => {
    try {
      const loggedEmail = await AsyncStorage.getItem(LOGGED_USER_KEY);

      console.log(
        '👤 [DATABASE] Email logado atualmente:',
        loggedEmail
      );

      return loggedEmail;
    } catch (error) {
      console.log('❌ [DATABASE] Erro ao verificar usuário logado:', error);
      return null;
    }
  },

  // Limpar dados de desenvolvimento
  limparBanco: async () => {
    try {
      await AsyncStorage.multiRemove([
        USERS_KEY,
        LOGGED_USER_KEY
      ]);

      console.log('🗑️ [DATABASE] Base de dados limpa com sucesso!');
    } catch (error) {
      console.log('❌ [DATABASE] Erro ao limpar base de dados:', error);
    }
  }
};
