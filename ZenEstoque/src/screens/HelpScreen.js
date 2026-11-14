import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function HelpScreen({ route, navigation }) {
  const userName = (route && route.params && route.params.userName) || 'usuário';

  const navigateTo = (screen) => {
    navigation.navigate(screen, { userName });
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile', { userName });
  };

  const handleContactPress = () => {
    Alert.alert(
      'Contato',
      'Entre em contato conosco através do email: suporte@zenestoques.com'
    );
  };

  const handleProblemPress = () => {
    Alert.alert(
      'Reportar Problema',
      'Descreva o seu problema para a nossa equipa técnica.'
    );
  };

  const handleRatingPress = () => {
    Alert.alert(
      'Avaliação',
      'Obrigado por querer avaliar o Zen Estoques!'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Menu superior em duas linhas, conforme o Figma */}
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
              onPress={() => navigateTo('Products')}
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
              style={styles.menuButton}
              activeOpacity={1}
            >
              <Text style={styles.menuText}>Ajuda</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.profileButton}
              onPress={handleProfilePress}
              activeOpacity={0.8}
            >
              <Text style={styles.butterfly}>🦋</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Conteúdo da tela */}
      <ScrollView
        contentContainerStyle={styles.mainContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>Ajuda</Text>

        {/* Card Contato */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.85}
          onPress={handleContactPress}
        >
          <View style={styles.phoneCircle}>
            <Ionicons name="call" size={32} color="#FFFFFF" />
          </View>

          <Text style={styles.cardTitle}>Contato</Text>

          <Text style={styles.cardSubtitle}>
            Precisa de alguma ajuda?{' \n'}
            Entre em contato conosco!
          </Text>
        </TouchableOpacity>

        {/* Card Problema */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.85}
          onPress={handleProblemPress}
        >
          <Text style={styles.illustration}>📝</Text>

          <Text style={styles.cardTitle}>Problema</Text>

          <Text style={styles.cardSubtitle}>
            Está com algum Problema?{' \n'}
            Entre em contato conosco!
          </Text>
        </TouchableOpacity>

        {/* Card Avaliação */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.85}
          onPress={handleRatingPress}
        >
          <Text style={styles.illustration}>⭐</Text>

          <Text style={styles.cardTitle}>Avaliação</Text>

          <Text style={styles.cardSubtitle}>
            Avalie o nosso App na Play{' \n'}
            store/Apple Store
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#9747FF',
    marginHorizontal: 16,
  },

  menu: {
    gap: 5,
  },

  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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

  mainContent: {
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 20,
    alignItems: 'center',
  },

  screenTitle: {
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 12,
    marginLeft: 4,
  },

  card: {
    width: '85%',
    height: 136,
    backgroundColor: '#C99AF5',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#9870B9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    paddingHorizontal: 10,
  },

  phoneCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2196D2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },

  illustration: {
    fontSize: 43,
    height: 52,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginBottom: 2,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },

  cardSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#F5E9FF',
    textAlign: 'center',
    lineHeight: 16,
  },
});
