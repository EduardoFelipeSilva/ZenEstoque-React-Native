import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Modal,
  Platform,
  StatusBar,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SessionManager } from '../services/session';
import { USERS_KEY } from '../storage/storageKeys';

export default function ProfileScreen({ route, navigation }) {
  const initialUserName = (route && route.params && route.params.userName) || '';

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [empresa, setEmpresa] = useState('');

  // Estados para o modal de Alterar Senha
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const loggedEmail = await SessionManager.getLoggedUser();
        const usersJson = await AsyncStorage.getItem(USERS_KEY);
        const users = usersJson ? JSON.parse(usersJson) : [];

        const currentUser = users.find((u) => u.email === loggedEmail);

        if (currentUser) {
          setNome(currentUser.nome || '');
          setEmail(currentUser.email || '');
          setTelefone(currentUser.telefone || '');
          setEmpresa(currentUser.empresa || '');
        } else if (initialUserName && initialUserName !== 'usuário') {
          setNome(initialUserName);
        }
      } catch (error) {
        console.log('Erro ao carregar dados do perfil', error);
      }
    };

    loadUserData();
  }, [initialUserName]);

  const handleSaveChanges = async () => {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'O campo Nome Completo não pode ficar vazio.');
      return;
    }

    try {
      const usersJson = await AsyncStorage.getItem(USERS_KEY);
      let users = usersJson ? JSON.parse(usersJson) : [];

      users = users.map((u) => {
        if (u.email === email) {
          return {
            ...u,
            nome: nome.trim(),
            telefone: telefone.trim(),
            empresa: empresa.trim(),
          };
        }

        return u;
      });

      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));

      navigation.navigate('Success', { userName: nome.trim() });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível guardar as alterações.');
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      Alert.alert('Atenção', 'Preencha todos os campos de senha.');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Atenção', 'A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert('Atenção', 'A confirmação da nova senha não confere.');
      return;
    }

    try {
      const usersJson = await AsyncStorage.getItem(USERS_KEY);
      let users = usersJson ? JSON.parse(usersJson) : [];
      const userIndex = users.findIndex((u) => u.email === email);

      if (userIndex === -1) {
        Alert.alert('Erro', 'Usuário não encontrado.');
        return;
      }

      if (users[userIndex].senha && users[userIndex].senha !== currentPassword) {
        Alert.alert('Erro', 'A senha atual está incorreta.');
        return;
      }

      users[userIndex] = { ...users[userIndex], senha: newPassword };
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));

      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setPasswordModalVisible(false);

      Alert.alert('Sucesso', 'Senha alterada com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível alterar a senha.');
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Excluir minha conta',
      'Tem certeza que deseja excluir sua conta? Essa ação não poderá ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const usersJson = await AsyncStorage.getItem(USERS_KEY);
              const users = usersJson ? JSON.parse(usersJson) : [];
              const updatedUsers = users.filter((u) => u.email !== email);

              await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

              if (SessionManager && SessionManager.clearSession) {
                await SessionManager.clearSession();
              } else if (SessionManager && SessionManager.logout) {
                await SessionManager.logout();
              }

              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir a conta.');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#9333EA" />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>Z</Text>
          </View>
        </View>

        <View style={styles.header}>
          <Text style={styles.screenTitle}>Informações Pessoais</Text>
          <Text style={styles.subtitle}>
            Consulte e atualize seus dados cadastrais.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            placeholderTextColor="#9CA3AF"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            placeholder="email@email.com"
            placeholderTextColor="#9CA3AF"
            value={email}
            editable={false}
          />

          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            placeholder="(11) 91234-5678"
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
          />

          <Text style={styles.label}>Empresa</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome da Empresa"
            placeholderTextColor="#9CA3AF"
            value={empresa}
            onChangeText={setEmpresa}
          />

          <TouchableOpacity
            style={styles.securityBox}
            activeOpacity={0.8}
            onPress={() => setPasswordModalVisible(true)}
          >
            <View style={styles.securityIcon}>
              <Ionicons name="lock-closed-outline" size={21} color="#9333EA" />
            </View>

            <View style={styles.securityTextContainer}>
              <Text style={styles.securityTitle}>Segurança</Text>
              <Text style={styles.securitySubtitle}>Alterar Senha</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleSaveChanges}
        >
          <Text style={styles.primaryButtonText}>Salvar alterações</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.secondaryButtonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteAccountContainer}
          onPress={handleDeleteAccount}
        >
          <Ionicons name="trash-outline" size={17} color="#DC2626" />
          <Text style={styles.deleteAccountText}>Excluir minha conta</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal para Alterar Senha */}
      <Modal
        visible={passwordModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPasswordModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.screenTitle}>Alterar Senha</Text>

            <Text style={styles.label}>Senha Atual</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha atual"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />

            <Text style={styles.label}>Nova Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Mínimo 6 caracteres"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />

            <Text style={styles.label}>Confirmar Nova Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Repita a nova senha"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
            />

            <TouchableOpacity
              style={[styles.primaryButton, { marginTop: 20 }]}
              onPress={handleChangePassword}
            >
              <Text style={styles.primaryButtonText}>Confirmar Senha</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setPasswordModalVisible(false)}
            >
              <Text style={styles.secondaryButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 10 : 0,
    paddingBottom: Platform.OS === 'android' ? 16 : 0,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 35,
    paddingTop: 20,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },

  logo: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#A855F7',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: 'bold',
  },

  header: {
    alignItems: 'center',
    marginBottom: 24,
  },

  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9333EA',
  },

  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 7,
    textAlign: 'center',
  },

  formContainer: {
    width: '100%',
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D8B4FE',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },

  disabledInput: {
    backgroundColor: '#F3F4F6',
    borderColor: '#D1D5DB',
    color: '#6B7280',
  },

  securityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D8B4FE',
    borderRadius: 12,
    padding: 14,
    marginTop: 22,
    backgroundColor: '#FFFFFF',
  },

  securityIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  securityTextContainer: {
    flex: 1,
    marginLeft: 12,
  },

  securityTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
  },

  securitySubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 3,
  },

  primaryButton: {
    backgroundColor: '#A855F7',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 2,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  secondaryButton: {
    backgroundColor: '#FFFFFF',
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#A855F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  secondaryButtonText: {
    color: '#9333EA',
    fontSize: 16,
    fontWeight: 'bold',
  },

  deleteAccountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    gap: 7,
  },

  deleteAccountText: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '600',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
});
