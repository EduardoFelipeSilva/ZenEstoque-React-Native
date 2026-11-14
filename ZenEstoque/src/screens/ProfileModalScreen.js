import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SessionManager } from '../services/session';

export default function ProfileModalScreen({ route, navigation }) {
  const userName = (route && route.params && route.params.userName) || 'usuário';

  const handleClose = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home', { userName });
    }
  };

  const handleEditProfile = () => {
    navigation.navigate('Profile', { userName });
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair da conta',
      'Deseja realmente encerrar sua sessão?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              if (SessionManager && SessionManager.clearSession) {
                await SessionManager.clearSession();
              } else if (SessionManager && SessionManager.logout) {
                await SessionManager.logout();
              }
            } catch (error) {
              console.log('Erro ao limpar sessão:', error);
            }

            navigation.reset({
              index: 0,
              routes: [{ name: 'Welcome' }],
            });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Botão Fechar */}
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={24} color="#DC2626" />
          </TouchableOpacity>

          {/* Cabeçalho */}
          <View style={styles.header}>
            <Text style={styles.title}>Perfil</Text>
            <Ionicons
              name="person-circle"
              size={48}
              color="#9333EA"
            />
          </View>

          {/* Editar perfil */}
          <TouchableOpacity style={styles.option} onPress={handleEditProfile}>
            <Ionicons
              name="person-outline"
              size={22}
              color="#9333EA"
            />

            <Text style={styles.optionText}>Editar perfil</Text>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#777777"
            />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Sair */}
          <TouchableOpacity style={styles.option} onPress={handleLogout}>
            <Ionicons
              name="log-out-outline"
              size={22}
              color="#DC2626"
            />

            <Text style={styles.logoutText}>Sair</Text>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#777777"
            />
          </TouchableOpacity>
        </View>
      </View>
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

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },

  modal: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 22,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },

  closeButton: {
    alignSelf: 'flex-end',
  },

  header: {
    alignItems: 'center',
    marginBottom: 22,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 12,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },

  optionText: {
    flex: 1,
    fontSize: 15,
    color: '#333333',
  },

  logoutText: {
    flex: 1,
    fontSize: 15,
    color: '#DC2626',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },
});
