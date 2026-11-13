
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileModalScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
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
          <TouchableOpacity style={styles.option}>
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
          <TouchableOpacity style={styles.option}>
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
