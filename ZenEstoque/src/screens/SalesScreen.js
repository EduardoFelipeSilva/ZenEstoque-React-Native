
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SalesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topMenuContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topMenuScroll}
        >
          {['Home', 'Dashboard', 'Produtos', 'Vendas', 'Editar', 'Ajuda'].map((item) => (
            <View
              key={item}
              style={[
                styles.topChip,
                item === 'Vendas' && styles.activeChip,
              ]}
            >
              <Text style={styles.topChipText}>{item}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.profileChip}>
          <Ionicons name="person-circle" size={30} color="#A855F7" />
        </View>
      </View>

      <View style={styles.purpleLine} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Vendas</Text>
        <Text style={styles.greeting}>Olá usuário</Text>

        <TouchableOpacity style={styles.consultButton}>
          <Ionicons name="search-outline" size={23} color="#222" />
          <Text style={styles.consultText}>Consultar</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Ionicons name="stats-chart" size={31} color="#222" />
          </View>

          <Text style={styles.cardTitle}>Total de Venda</Text>
          <Text style={styles.cardValue}>5.423</Text>
          <Text style={styles.positive}>↑16% esse mês</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.profitIcon}>🏷️</Text>
          <Text style={styles.cardTitle}>Lucro Mensal</Text>
          <Text style={styles.cardValue}>1.893</Text>
          <Text style={styles.negative}>↓14% esse mês</Text>
        </View>
      </ScrollView>
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
    paddingTop: 10,
    paddingBottom: 8,
    paddingRight: 10,
  },
  topMenuScroll: {
    paddingHorizontal: 12,
    gap: 7,
    alignItems: 'center',
  },
  topChip: {
    backgroundColor: '#A855F7',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#9333EA',
  },
  activeChip: {
    backgroundColor: '#9333EA',
  },
  topChipText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  profileChip: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#A855F7',
    borderRadius: 30,
    marginLeft: 3,
  },
  purpleLine: {
    height: 2,
    backgroundColor: '#A855F7',
    marginHorizontal: 12,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222222',
  },
  greeting: {
    fontSize: 17,
    color: '#777777',
    fontWeight: '600',
    marginTop: 7,
    marginLeft: 12,
  },
  consultButton: {
    width: 165,
    height: 40,
    borderWidth: 1,
    borderColor: '#D1D1D1',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 20,
  },
  consultText: {
    color: '#9333EA',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#C99AF5',
    borderWidth: 2,
    borderColor: '#9470B5',
    borderRadius: 12,
    height: 152,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    marginBottom: 15,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#00AEEF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
  },
  profitIcon: {
    fontSize: 37,
    marginBottom: 3,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardValue: {
    color: '#EAD9FF',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 4,
  },
  positive: {
    color: '#42D78A',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  negative: {
    color: '#F04444',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
