import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SuccessScreen({ route, navigation }) {
  const userName = (route && route.params && route.params.userName) || 'usuário';

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home', { userName });
    }
  };

  const handleContinue = () => {
    navigation.navigate('Home', { userName });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={22} color="#333333" />
        </TouchableOpacity>
      </View>

      <View style={styles.logoContainer}>
        <View style={styles.logo} />
      </View>

      <Text style={styles.pageTitle}>Informações pessoais</Text>

      <View style={styles.successContainer}>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={28} color="#9333FF" />
        </View>

        <Text style={styles.successTitle}>Sucesso!</Text>

        <Text style={styles.message}>
          Parabéns! Suas informações foram alteradas
          {'\n'}
          com sucesso. Vamos retornar ao aplicativo.
        </Text>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueText}>Continuar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 10 : 0,
    paddingBottom: Platform.OS === 'android' ? 16 : 0,
  },

  header: {
    height: 48,
    justifyContent: 'center',
  },

  backButton: {
    width: 29,
    height: 29,
    borderRadius: 20,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 8,
  },

  logo: {
    width: 52,
    height: 46,
    backgroundColor: '#9333FF',
    transform: [{ skewX: '-8deg' }],
  },

  pageTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222222',
  },

  successContainer: {
    alignItems: 'center',
    marginTop: 88,
  },

  checkCircle: {
    width: 66,
    height: 66,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: '#9333FF',
    backgroundColor: '#F8F3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },

  successTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 17,
  },

  message: {
    fontSize: 11,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 5,
  },

  continueButton: {
    height: 38,
    backgroundColor: '#9333FF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 27,
  },

  continueText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
