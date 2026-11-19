import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';

export default function ProblemScreen({ route, navigation }) {
  const userName = (route && route.params && route.params.userName) || 'usuário';
  const [mensagem, setMensagem] = useState('');

  const navigateTo = (screen, extraParams = {}) => {
    navigation.navigate(screen, { userName, ...extraParams });
  };

  const handleEnviarMensagem = () => {
    if (!mensagem.trim()) {
      Alert.alert('Atenção', 'Por favor, escreva seu relato antes de enviar.');
      return;
    }

    Alert.alert(
      'Mensagem Enviada',
      'Obrigado! Seu relato de problema foi enviado com sucesso.',
      [
        {
          text: 'OK',
          onPress: () => {
            setMensagem('');
            navigation.goBack(); // Retorna para a tela de ajuda
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Menu superior padronizado */}
      <View style={styles.header}>
        <View style={styles.menu}>
          <View style={styles.menuRow}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => navigateTo('Home')}
            >
              <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => navigateTo('Dashboard')}
            >
              <Text style={styles.menuText}>Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => navigateTo('Products')}
            >
              <Text style={styles.menuText}>Produtos</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.menuRow}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => navigateTo('Sales')}
            >
              <Text style={styles.menuText}>Vendas</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => navigateTo('EditProduct')}
            >
              <Text style={styles.menuText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuButton, styles.activeButton]}
              activeOpacity={1}
            >
              <Text style={styles.menuText}>Ajuda</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => navigateTo('Profile')}
            >
              <Text style={styles.butterfly}>🦋</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Conteúdo */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleArea}>
          <Text style={styles.title}>Relatar Problema</Text>
          <Text style={styles.subtitle}>
            Encontrou algum erro ou dificuldade? Deixe sua mensagem abaixo para nossa equipe.
          </Text>
        </View>

        {/* Caixa de Texto / Formulário */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Descreva o problema:</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Digite aqui os detalhes do que aconteceu..."
            placeholderTextColor="#A3A3A3"
            multiline={true}
            numberOfLines={6}
            textAlignVertical="top"
            value={mensagem}
            onChangeText={setMensagem}
          />
        </View>

        {/* Botão Enviar */}
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleEnviarMensagem}
          activeOpacity={0.8}
        >
          <Text style={styles.sendButtonText}>Enviar Mensagem</Text>
        </TouchableOpacity>

        {/* Botão Cancelar */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigateTo('Help')}
          activeOpacity={0.8}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Decoração inferior */}
      <View style={styles.bottomDecoration} pointerEvents="none" />
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

  header: {
    marginHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#9747FF',
  },

  menu: {
    gap: 5,
  },

  menuRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
  },

  menuButton: {
    backgroundColor: '#9747FF',
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 9,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 1,
  },

  activeButton: {
    backgroundColor: '#A855F7',
  },

  menuText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },

  profileButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E5E5E5',
    borderWidth: 1,
    borderColor: '#9747FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  butterfly: {
    fontSize: 25,
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 50,
  },

  titleArea: {
    position: 'relative',
    marginBottom: 20,
    paddingTop: 2,
    minHeight: 78,
    overflow: 'hidden',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 6,
    zIndex: 1,
  },

  subtitle: {
    fontSize: 11,
    color: '#888888',
    lineHeight: 15,
    zIndex: 1,
  },

  formContainer: {
    width: '100%',
    marginBottom: 20,
  },

  label: {
    fontSize: 11,
    color: '#222222',
    fontWeight: '600',
    marginBottom: 6,
  },

  textArea: {
    height: 140,
    width: '100%',
    borderWidth: 1.3,
    borderColor: '#9747FF',
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingTop: 12,
    fontSize: 12,
    color: '#333333',
    backgroundColor: '#FFFFFF',
  },

  sendButton: {
    height: 44,
    backgroundColor: '#9747FF',
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#B77AFF',
  },

  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },

  cancelButton: {
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#9747FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },

  cancelButtonText: {
    color: '#9747FF',
    fontSize: 13,
    fontWeight: '600',
  },

  bottomDecoration: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
    borderBottomWidth: 220,
    borderLeftWidth: 340,
    borderBottomColor: '#C084FC',
    borderLeftColor: 'transparent',
  },
});
