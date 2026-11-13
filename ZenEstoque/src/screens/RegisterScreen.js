
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
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!nome.trim()) {
      newErrors.nome = 'O nome completo é obrigatório.';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'O email é obrigatório.';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Insira um formato de email válido.';
      isValid = false;
    }

    const telefoneLimpo = telefone.replace(/\D/g, '');

    if (!telefone.trim()) {
      newErrors.telefone = 'O telefone é obrigatório.';
      isValid = false;
    } else if (
      telefoneLimpo.length < 10 ||
      telefoneLimpo.length > 11
    ) {
      newErrors.telefone = 'O telefone deve ter 10 ou 11 dígitos.';
      isValid = false;
    }

    if (!empresa.trim()) {
      newErrors.empresa = 'O nome da empresa é obrigatório.';
      isValid = false;
    }

    if (!senha) {
      newErrors.senha = 'A senha é obrigatória.';
      isValid = false;
    } else if (senha.length < 6) {
      newErrors.senha = 'A senha deve ter pelo menos 6 caracteres.';
      isValid = false;
    }

    if (!confirmarSenha) {
      newErrors.confirmarSenha = 'Confirme sua senha.';
      isValid = false;
    } else if (senha !== confirmarSenha) {
      newErrors.confirmarSenha = 'As senhas não coincidem. Tente novamente.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const dados = {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        telefone: telefone.replace(/\D/g, ''),
        empresa: empresa.trim(),
        senha,
      };

      console.log('Enviando cadastro:', {
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
        empresa: dados.empresa,
      });

      const response = await api.post('/register', dados);

      console.log('Resposta recebida:', response.data);

      Alert.alert('Sucesso', 'Conta criada com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error) {
      console.log('Mensagem do erro:', error.message);
      console.log('Status do erro:', error.response?.status);
      console.log('Dados do erro:', error.response?.data);

      Alert.alert(
        'Erro',
        error.response?.data?.error ||
          error.response?.data?.message ||
          'Não foi possível comunicar com a API'
      );
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
          contentContainerStyle={styles.scrollContainer}
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
            <Text style={styles.title}>Criar Conta</Text>
            <Text style={styles.subtitle}>
              Preencha os dados abaixo para criar sua conta no ZenEstoques.
            </Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
              style={[styles.input, errors.nome && styles.inputError]}
              placeholder="Insira seu nome completo"
              placeholderTextColor="#9CA3AF"
              value={nome}
              onChangeText={(text) => {
                setNome(text);
                setErrors({ ...errors, nome: null });
              }}
            />
            {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Exemplo: usuario@gmail.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrors({ ...errors, email: null });
              }}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <Text style={styles.label}>Telefone</Text>
            <TextInput
              style={[styles.input, errors.telefone && styles.inputError]}
              placeholder="Exemplo: 11943250987"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              value={telefone}
              onChangeText={(text) => {
                setTelefone(text);
                setErrors({ ...errors, telefone: null });
              }}
            />
            {errors.telefone && (
              <Text style={styles.errorText}>{errors.telefone}</Text>
            )}

            <Text style={styles.label}>Nome da Empresa</Text>
            <TextInput
              style={[styles.input, errors.empresa && styles.inputError]}
              placeholder="Exemplo: Minha Empresa"
              placeholderTextColor="#9CA3AF"
              value={empresa}
              onChangeText={(text) => {
                setEmpresa(text);
                setErrors({ ...errors, empresa: null });
              }}
            />
            {errors.empresa && (
              <Text style={styles.errorText}>{errors.empresa}</Text>
            )}

            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={[styles.input, errors.senha && styles.inputError]}
              placeholder="Crie uma senha com 6 caracteres ou mais"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={senha}
              onChangeText={(text) => {
                setSenha(text);
                setErrors({ ...errors, senha: null });
              }}
            />
            {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}

            <Text style={styles.label}>Confirmar Senha</Text>
            <TextInput
              style={[
                styles.input,
                errors.confirmarSenha && styles.inputError,
              ]}
              placeholder="Digite sua senha novamente"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={confirmarSenha}
              onChangeText={(text) => {
                setConfirmarSenha(text);
                setErrors({ ...errors, confirmarSenha: null });
              }}
            />
            {errors.confirmarSenha && (
              <Text style={styles.errorText}>{errors.confirmarSenha}</Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleRegister}
          >
            <Text style={styles.primaryButtonText}>Confirmar Cadastro</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Já tem uma conta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}> Entrar</Text>
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

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#9333EA',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
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
    marginTop: 15,
    marginBottom: 8,
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

  inputError: {
    borderColor: '#EF4444',
  },

  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 5,
  },

  primaryButton: {
    backgroundColor: '#A855F7',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    elevation: 2,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  loginText: {
    color: '#6B7280',
    fontSize: 14,
  },

  loginLink: {
    color: '#9333EA',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
