import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { Ionicons, FontAwesome } from '@expo/vector-icons';
import api from '../services/api';
import { SessionManager } from '../services/session';
import { debugDatabase } from '../services/debugUsers';

export default function LoginScreen({ navigation }) {
  debugDatabase.listarTodos();
  debugDatabase.verUsuarioLogado();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = () => {
    let isValid = true;

    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('O email é obrigatório.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Insira um email válido.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('A senha é obrigatória.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Senha incorreta.');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      setPasswordError('');

      const response = await api.post('/login', {
        email,
        password,
      });

      console.log('Login bem-sucedido!', response.data);

      SessionManager.setLoggedUser(email);
      navigation.replace('Home');

    } catch (error) {
      setPasswordError('Credenciais inválidas.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
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
            <Text style={styles.title}>Entrar</Text>
            <Text style={styles.subtitle}>
              Acesse sua conta do ZenEstoques
            </Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Email</Text>

            <TextInput
              style={[styles.input, emailError ? styles.inputError : null]}
              placeholder="Digite seu email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}

            <Text style={[styles.label, styles.passwordLabel]}>
              Senha
            </Text>

            <View
              style={[
                styles.passwordContainer,
                passwordError ? styles.inputError : null,
              ]}
            >
              <TextInput
                style={styles.passwordInput}
                placeholder="Digite sua senha"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={21}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.passwordFooter}>
              <Text style={styles.errorText}>{passwordError}</Text>

              <TouchableOpacity>
                <Text style={styles.forgotPassword}>
                  Esqueceu a senha?
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleLogin}
            >
              <Text style={styles.primaryButtonText}>Entrar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Ou</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="apple" size={20} color="#111827" />
            <Text style={styles.socialButtonText}>
              Login com Apple
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={20} color="#DB4437" />
            <Text style={styles.socialButtonText}>
              Login com Google
            </Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>
              Não tem uma conta? 
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.signupLink}> Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
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
    marginBottom: 28,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#9333EA',
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },

  formContainer: {
    width: '100%',
  },

  label: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '600',
    marginBottom: 8,
  },

  passwordLabel: {
    marginTop: 18,
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

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D8B4FE',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
    backgroundColor: '#FFFFFF',
  },

  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },

  inputError: {
    borderColor: '#EF4444',
  },

  passwordFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 22,
    minHeight: 20,
  },

  errorText: {
    color: '#EF4444',
    fontSize: 12,
  },

  forgotPassword: {
    color: '#9333EA',
    fontSize: 13,
    fontWeight: '600',
  },

  primaryButton: {
    backgroundColor: '#A855F7',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 26,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },

  dividerText: {
    marginHorizontal: 16,
    color: '#6B7280',
    fontSize: 13,
  },

  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: '#D8B4FE',
    borderRadius: 12,
    marginBottom: 14,
    backgroundColor: '#FFFFFF',
  },

  socialButtonText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },

  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },

  signupText: {
    color: '#6B7280',
    fontSize: 14,
  },

  signupLink: {
    color: '#9333EA',
    fontSize: 14,
    fontWeight: 'bold',
  },
});