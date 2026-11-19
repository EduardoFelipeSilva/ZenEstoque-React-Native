import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SALES_DATA = [
  { period: 'Este Mês', totalSales: '5.423', salesTrend: '↑16% esse mês', monthlyProfit: '1.893', profitTrend: '↓14% esse mês' },
  { period: 'Mês Anterior', totalSales: '4.675', salesTrend: '↑8% mês passado', monthlyProfit: '2.201', profitTrend: '↑5% mês passado' },
  { period: 'Trimestre', totalSales: '14.890', salesTrend: '↑21% no trimestre', monthlyProfit: '5.740', profitTrend: '↑11% no trimestre' },
];

export default function SalesScreen({ route, navigation }) {
  const userName = (route && route.params && route.params.userName) || 'usuário';
  const [periodIndex, setPeriodIndex] = useState(0);

  const currentData = SALES_DATA[periodIndex];

  const menuRows = [
    [
      { label: 'Home', screen: 'Home' },
      { label: 'Dashboard', screen: 'Dashboard' },
      { label: 'Produtos', screen: 'Products' },
    ],
    [
      { label: 'Vendas', screen: 'Sales' },
      { label: 'Editar', screen: 'EditProduct' },
      { label: 'Ajuda', screen: 'Help' },
    ],
  ];

  const handleNavigate = (screen) => {
    if (!screen || screen === 'Sales') return;
    navigation.navigate(screen, { userName });
  };

  const handleConsult = () => {
    Alert.alert(
      'Consultar Vendas',
      `Período atual: ${currentData.period}\nEscolha uma opção:`,
      [
        {
          text: 'Alternar Período',
          onPress: () => setPeriodIndex((prev) => (prev + 1) % SALES_DATA.length),
        },
        {
          text: 'Ver Produtos',
          onPress: () => navigation.navigate('Products', { userName, mode: 'view' }),
        },
        { text: 'Fechar', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Menu superior */}
      <View style={styles.topMenuContainer}>
        <View style={styles.menuRows}>
          {menuRows.map((row, index) => (
            <View key={index} style={styles.menuRow}>
              {row.map((item) => (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.topChip,
                    item.label === 'Vendas' && styles.activeChip,
                  ]}
                  activeOpacity={item.label === 'Vendas' ? 1 : 0.7}
                  onPress={() => handleNavigate(item.screen)}
                >
                  <Text style={styles.topChipText}>{item.label}</Text>
                </TouchableOpacity>
              ))}

              {index === 1 && (
                <TouchableOpacity
                  style={styles.profileChip}
                  onPress={() => navigation.navigate('Profile', { userName })}
                >
                  <Text style={styles.profileIcon}>🦋</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.purpleLine} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Vendas</Text>
        <Text style={styles.greeting}>Olá {userName}</Text>

        {/* Consultar */}
        <TouchableOpacity style={styles.consultButton} onPress={handleConsult}>
          <Ionicons name="search-outline" size={22} color="#222222" />
          <Text style={styles.consultText}>Consultar</Text>
        </TouchableOpacity>

        {/* Card de vendas */}
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Ionicons name="stats-chart" size={29} color="#222222" />
          </View>

          <Text style={styles.cardTitle}>Total de Venda</Text>
          <Text style={styles.cardValue}>{currentData.totalSales}</Text>
          <Text style={styles.positive}>{currentData.salesTrend}</Text>
        </View>

        {/* Card de lucro */}
        <View style={styles.card}>
          <Text style={styles.profitIcon}>🏷️</Text>

          <Text style={styles.cardTitle}>Lucro Mensal</Text>
          <Text style={styles.cardValue}>{currentData.monthlyProfit}</Text>
          <Text style={styles.negative}>{currentData.profitTrend}</Text>
        </View>
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

  topMenuContainer: {
    paddingTop: 9,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },

  menuRows: {
    gap: 7,
  },

  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  topChip: {
    backgroundColor: '#A855F7',
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 9,
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
    width: 39,
    height: 37,
    borderWidth: 1,
    borderColor: '#A855F7',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  },

  profileIcon: {
    fontSize: 23,
  },

  purpleLine: {
    height: 2,
    backgroundColor: '#A855F7',
    marginHorizontal: 16,
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
