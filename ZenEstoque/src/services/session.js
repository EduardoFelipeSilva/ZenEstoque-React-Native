import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGGED_USER_KEY } from '../storage/storageKeys';

export const SessionManager = {
  // Salvar o usuário conectado
  setLoggedUser: async (email) => {
    if (!email) return;
    const normalizedEmail = email.trim().toLowerCase();

    await AsyncStorage.setItem(
      LOGGED_USER_KEY,
      normalizedEmail
    );
  },

  // Consultar o usuário conectado
  getLoggedUser: async () => {
    return await AsyncStorage.getItem(LOGGED_USER_KEY);
  },

  // Verificar se existe sessão ativa
  isAuthenticated: async () => {
    const user = await AsyncStorage.getItem(LOGGED_USER_KEY);
    return Boolean(user);
  },

  // Encerrar a sessão
  clearSession: async () => {
    await AsyncStorage.removeItem(LOGGED_USER_KEY);
  },
};
