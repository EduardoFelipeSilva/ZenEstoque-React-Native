
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

export default function HomeScreen({ route, navigation }) {
  const userName = route?.params?.userName || 'usuário';

  const handleNavigate = (screen, extraParams = {}) => {
    if (!screen || screen === 'Home') return;

    navigation.navigate(screen, {
      userName,
      ...extraParams,
    });
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Menu superior */}
      <View style={styles.header}>
        <View style={styles.menu}>

          {/* Primeira linha */}
          <View style={styles.menuRow}>

            <TouchableOpacity
              style={[styles.menuButton, styles.activeButton]}
              activeOpacity={1}
            >
              <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => handleNavigate('Dashboard')}
            >
              <Text style={styles.menuText}>Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuButton}
              onPress={() =>
                handleNavigate('Products', { mode: 'view' })
              }
            >
              <Text style={styles.menuText}>Produtos</Text>
            </TouchableOpacity>

          </View>

          {/* Segunda linha */}
          <View style={styles.menuRow}>

            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => handleNavigate('Sales')}
            >
              <Text style={styles.menuText}>Vendas</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuButton}
              onPress={() =>
                handleNavigate('Products', { mode: 'edit' })
              }
            >
              <Text style={styles.menuText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => handleNavigate('Help')}
            >
              <Text style={styles.menuText}>Ajuda</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => handleNavigate('Profile')}
            >
              <Text style={styles.butterfly}>🦋</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>

      {/* Conteúdo central */}
      <ScrollView
        contentContainerStyle={styles.mainContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Logo */}
        <View style={styles.logoWrapper}>
          <View style={styles.logoShadow} />

          <View style={styles.logoBox}>
            <Text style={styles.logoText}>Z</Text>
          </View>
        </View>

        {/* Saudação */}
        <Text style={styles.welcomeText}>
          Olá, {userName}!
        </Text>

        {/* Botões principais */}
        <View style={styles.actionButtonsContainer}>

          {/* Cadastro */}
          <TouchableOpacity
            style={styles.mainButton}
            onPress={() =>
              handleNavigate('EditProduct', {
                mode: 'create',
                product: null,
              })
            }
          >
            <Text style={styles.mainButtonText}>
              Cadastro
            </Text>
          </TouchableOpacity>

          {/* Consultar */}
          <TouchableOpacity
            style={styles.mainButton}
            onPress={() =>
              handleNavigate('Products', {
                mode: 'view',
              })
            }
          >
            <Text style={styles.mainButtonText}>
              Consultar
            </Text>
          </TouchableOpacity>

          {/* Remover */}
          <TouchableOpacity
            style={styles.mainButton}
            onPress={() =>
              handleNavigate('Products', {
                mode: 'delete',
              })
            }
          >
            <Text style={styles.mainButtonText}>
              Remover
            </Text>
          </TouchableOpacity>

          {/* Editar */}
          <TouchableOpacity
            style={styles.mainButton}
            onPress={() =>
              handleNavigate('Products', {
                mode: 'edit',
              })
            }
          >
            <Text style={styles.mainButtonText}>
              Editar
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* Detalhe decorativo inferior */}
      <View
        style={styles.footerDecorator}
        pointerEvents="none"
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',

    paddingTop:
      Platform.OS === 'android'
        ? (StatusBar.currentHeight || 24) + 10
        : 0,

    paddingBottom:
      Platform.OS === 'android' ? 16 : 0,
  },

  // Menu superior
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
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1,
  },

  activeButton: {
    backgroundColor: '#9747FF',
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

  // Conteúdo principal
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
