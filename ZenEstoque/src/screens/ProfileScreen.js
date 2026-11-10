
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
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SessionManager } from '../services/session';

const USERS_KEY = '@zen_estoques_users';

export default function ProfileScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [empresa, setEmpresa] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const loggedEmail = SessionManager.getLoggedUser();
      const usersJson = await AsyncStorage.getItem(USERS_KEY);
      const users = usersJson ? JSON.parse(usersJson) : [];

      const currentUser = users.find(u => u.email === loggedEmail);

      if (currentUser) {
        setNome(currentUser.nome || '');
        setEmail(currentUser.email || '');
        setTelefone(currentUser.telefone || '');
        setEmpresa(currentUser.empresa || '');
      }
    } catch (error) {
      console.log('Erro ao carregar dados do perfil', error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const usersJson = await AsyncStorage.getItem(USERS_KEY);
      let users = usersJson ? JSON.parse(usersJson) : [];

      users = users.map(u => {
        if (u.email === email) {
          return { ...u, nome, telefone, empresa };
        }

        return u;
      });

      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));

      Alert.alert('Sucesso', 'Informações atualizadas com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível guardar as alterações.');
    }
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

          <TouchableOpacity style={styles.securityBox} activeOpacity={0.8}>
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

        <TouchableOpacity style={styles.deleteAccountContainer}>
          <Ionicons name="trash-outline" size={17} color="#DC2626" />
          <Text style={styles.deleteAccountText}>Excluir minha conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
});
