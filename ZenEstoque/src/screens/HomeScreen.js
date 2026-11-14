
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ route, navigation }) {
  const userName = route.params?.userName || 'Perfil';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topMenuContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topMenuScroll}
        >
          {[
              { label: 'Home', screen: 'Home' },
              { label: 'Dashboard', screen: null },
              { label: 'Produtos', screen: 'Products' },
              { label: 'Vendas', screen: 'Sales' },
              { label: 'Editar', screen: 'EditProduct' },
              { label: 'Ajuda', screen: 'Help' },
            ].map((item) => (
              <TouchableOpacity
                key={item.label}
                style={[
                  styles.topChip,
                  item.label === 'Home' && styles.activeChip,
                ]}
                disabled={!item.screen}
                onPress={() => {
                  if (item.screen && item.screen !== 'Home') {
                    navigation.navigate(item.screen);
                  }
                }}
              >
                <Text style={styles.topChipText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.profileChip}
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name="person-circle" size={25} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.mainContent}>
        <View style={styles.logoWrapper}>
          <View style={styles.logoShadow} />
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>Z</Text>
          </View>
        </View>

        <Text style={styles.welcomeText}>Olá, {userName}!</Text>

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.mainButton}>
            <Text style={styles.mainButtonText}>Cadastro</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.mainButton}>
            <Text style={styles.mainButtonText}>Consultar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.mainButton}>
            <Text style={styles.mainButtonText}>Remover</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.mainButton}>
            <Text style={styles.mainButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footerDecorator} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topMenuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 10,
    paddingRight: 10,
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
    backgroundColor: '#9333EA',
  },
  topChipText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  profileChip: {
    padding: 5,
    marginLeft: 3,
    borderRadius: 25,
    backgroundColor: '#A855F7',
  },
  mainContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 55,
    paddingBottom: 60,
  },
  logoWrapper: {
    position: 'relative',
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoShadow: {
    position: 'absolute',
    width: 70,
    height: 70,
    backgroundColor: '#D8B4FE',
    borderRadius: 16,
    top: 4,
    left: 4,
  },
  logoBox: {
    width: 70,
    height: 70,
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
    opacity: 0.8,
    zIndex: -1,
  },
});
