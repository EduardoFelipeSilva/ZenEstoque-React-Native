import AsyncStorage from '@react-native-async-storage/async-storage';
import { USERS_KEY } from '../storage/storageKeys';

export const DEFAULT_TEST_USER = {
  nome: 'Administrador',
  email: 'admin@zenestoques.com',
  telefone: '11999999999',
  empresa: 'Zen Estoques',
  senha: '123456',
};

const getStoredUsers = async () => {
  const usersJson = await AsyncStorage.getItem(USERS_KEY);
  const users = usersJson ? JSON.parse(usersJson) : [];

  const hasDefaultUser = users.some(
    (u) => u.email && u.email.toLowerCase() === DEFAULT_TEST_USER.email
  );

  if (!hasDefaultUser) {
    const updatedUsers = [DEFAULT_TEST_USER, ...users];
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    return updatedUsers;
  }

  return users;
};

const api = {
  post: async (endpoint, bodyData) => {
    // CADASTRO DE USUÁRIO
    if (endpoint === '/register') {
      try {
        const { nome, email, telefone, empresa, senha } = bodyData;
        const normalizedEmail = email.trim().toLowerCase();
        const users = await getStoredUsers();

        const userExists = users.some(
          (user) => user.email && user.email.toLowerCase() === normalizedEmail
        );

        if (userExists) {
          throw {
            response: {
              status: 409,
              data: { error: 'Este email já está cadastrado.' },
            },
          };
        }

        const newUser = {
          nome,
          email: normalizedEmail,
          telefone,
          empresa,
          senha,
        };

        users.push(newUser);
        await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));

        return {
          data: {
            message: 'Usuário cadastrado com sucesso!',
          },
        };
      } catch (error) {
        if (error.response) {
          throw error;
        }

        throw {
          response: {
            status: 500,
            data: { error: 'Erro ao cadastrar localmente.' },
          },
        };
      }
    }

    // LOGIN DE USUÁRIO
    if (endpoint === '/login') {
      try {
        const { email, password } = bodyData;
        const normalizedEmail = email.trim().toLowerCase();
        const users = await getStoredUsers();

        const user = users.find(
          (item) =>
            item.email &&
            item.email.toLowerCase() === normalizedEmail &&
            item.senha === password
        );

        if (!user) {
          throw {
            response: {
              status: 401,
              data: { error: 'Credenciais inválidas.' },
            },
          };
        }

        return {
          data: {
            message: 'Login bem-sucedido!',
            user: {
              nome: user.nome,
              email: user.email,
              telefone: user.telefone,
              empresa: user.empresa,
            },
          },
        };
      } catch (error) {
        if (error.response) {
          throw error;
        }

        throw {
          response: {
            status: 500,
            data: { error: 'Erro ao realizar login.' },
          },
        };
      }
    }

    // RECUPERAÇÃO DE SENHA
    if (endpoint === '/forgot-password') {
      try {
        const normalizedEmail =
          bodyData && bodyData.email ? bodyData.email.trim().toLowerCase() : '';
        const users = await getStoredUsers();

        const userExists = users.some(
          (item) => item.email && item.email.toLowerCase() === normalizedEmail
        );

        if (!userExists) {
          throw {
            response: {
              status: 404,
              data: { error: 'Nenhuma conta encontrada com este e-mail.' },
            },
          };
        }

        return {
          data: {
            message: 'Instruções de recuperação enviadas com sucesso!',
          },
        };
      } catch (error) {
        if (error.response) {
          throw error;
        }

        throw {
          response: {
            status: 500,
            data: { error: 'Erro ao processar recuperação de senha.' },
          },
        };
      }
    }

    throw new Error(`Endpoint não encontrado: ${endpoint}`);
  },
};

export default api;
