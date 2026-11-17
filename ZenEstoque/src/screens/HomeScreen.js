import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ route, navigation }) {
  const userName = (route && route.params && route.params.userName) || 'usuário';

  const topMenuItems = [
    { label: 'Home', screen: 'Home' },
    { label: 'Dashboard', screen: 'Dashboard' },
    { label: 'Produtos', screen: 'Dashboard' },
    { label: 'Vendas', screen: 'Sales' },
    { label: 'Editar', screen: 'EditProduct' },
    { label: 'Ajuda', screen: 'Help' },
  ];

  const handleNavigate = (screen, extraParams = {}) => {
    if (!screen || screen === 'Home') return;
    navigation.navigate(screen, { userName, ...extraParams });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Menu Superior */}
      <View style={styles.topMenuContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topMenuScroll}
        >
          {topMenuItems.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.topChip,
                item.label === 'Home' && styles.activeChip,
              ]}
              onPress={() => handleNavigate(item.screen)}
            >
              <Text style={styles.topChipText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.profileChip}
          onPress={() => navigation.navigate('Profile', { userName })}
        >
          <Ionicons name="person-circle" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Conteúdo Central */}
      <ScrollView contentContainerStyle={styles.mainContent}>
        <View style={styles.logoWrapper}>
          <View style={styles.logoShadow} />
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>Z</Text>
          </View>
        </View>

        <Text style={styles.welcomeText}>Olá, {userName}!</Text>

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => handleNavigate('EditProduct', { mode: 'create', product: null })}
          >
            <Text style={styles.mainButtonText}>Cadastro</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => handleNavigate('Products', { mode: 'view' })}
          >
            <Text style={styles.mainButtonText}>Consultar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => handleNavigate('Products', { mode: 'delete' })}
          >
            <Text style={styles.mainButtonText}>Remover</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => handleNavigate('Products', { mode: 'edit' })}
          >
            <Text style={styles.mainButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Detalhe decorativo inferior */}
      <View style={styles.footerDecorator} />
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
  topMenuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#A855F7',
    marginHorizontal: 16,
    paddingVertical: 10,
    paddingRight: 10,
    backgroundColor: '#FFFFFF',
  },
  topMenuScroll: {
    paddingHorizontal: 12,
    gap: 7,
    alignItems: 'center',
  },
  topChip: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: '#A855F7',
    borderBottomWidth: 3,
    borderBottomColor: '#9333EA',
  },
  activeChip: {
    backgroundColor: '#7E22CE',
  },
  topChipText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  profileChip: {
    padding: 5,
    marginLeft: 4,
    borderRadius: 25,
    backgroundColor: '#A855F7',
    borderWidth: 1.5,
    borderColor: '#7E22CE',
  },
  mainContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 45,
    paddingBottom: 80,
  },
  logoWrapper: {
    position: 'relative',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoShadow: {
    position: 'absolute',
    width: 72,
    height: 72,
    backgroundColor: '#D8B4FE',
    borderRadius: 16,
    top: 5,
    left: 5,
  },
  logoBox: {
    width: 72,
    height: 72,
    backgroundColor: '#A855F7',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B21A8',
    marginBottom: 25,
  },
  actionButtonsContainer: {
    width: '100%',
    gap: 16,
  },
  mainButton: {
    width: '100%',
    backgroundColor: '#A855F7',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#9333EA',
  },
  mainButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerDecorator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 140,
    height: 140,
    backgroundColor: '#A855F7',
    borderTopLeftRadius: 100,
    opacity: 0.85,
    zIndex: -1,
  },
});
