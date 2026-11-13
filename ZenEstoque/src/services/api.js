
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USERS_KEY } from '../storage/storageKeys';

const api = {
  post: async (endpoint, bodyData) => {
    // CADASTRO DE USUÁRIO
    if (endpoint === '/register') {
      try {
        const { nome, email, telefone, empresa, senha } = bodyData;

        const normalizedEmail = email.trim().toLowerCase();

        const usersJson = await AsyncStorage.getItem(USERS_KEY);
        const users = usersJson ? JSON.parse(usersJson) : [];

        const userExists = users.some(
          user => user.email.toLowerCase() === normalizedEmail
        );

        if (userExists) {
          throw {
            response: {
              status: 409,
              data: { error: 'Este email já está cadastrado.' }
            }
          };
        }

        const newUser = {
          nome,
          email: normalizedEmail,
          telefone,
          empresa,
          senha
        };

        users.push(newUser);

        await AsyncStorage.setItem(
          USERS_KEY,
          JSON.stringify(users)
        );

        return {
          data: {
            message: 'Usuário cadastrado com sucesso!'
          }
        };
      } catch (error) {
        if (error.response) {
          throw error;
        }

        throw {
          response: {
            status: 500,
            data: { error: 'Erro ao cadastrar localmente.' }
          }
        };
      }
    }

    // LOGIN DE USUÁRIO
    if (endpoint === '/login') {
      try {
        const { email, password } = bodyData;

        const normalizedEmail = email.trim().toLowerCase();

        const usersJson = await AsyncStorage.getItem(USERS_KEY);
        const users = usersJson ? JSON.parse(usersJson) : [];

        const user = users.find(
          item =>
            item.email.toLowerCase() === normalizedEmail &&
            item.senha === password
        );

        if (!user) {
          throw {
            response: {
              status: 401,
              data: { error: 'Credenciais inválidas.' }
            }
          };
        }

        return {
          data: {
            message: 'Login bem-sucedido!',
            user: {
              nome: user.nome,
              email: user.email,
              telefone: user.telefone,
              empresa: user.empresa
            }
          }
        };
      } catch (error) {
        if (error.response) {
          throw error;
        }

        throw {
          response: {
            status: 500,
            data: { error: 'Erro ao realizar login.' }
          }
        };
      }
    }

    throw new Error(`Endpoint não encontrado: ${endpoint}`);
  }
};

export default api;
