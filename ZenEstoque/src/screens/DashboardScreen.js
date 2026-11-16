import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen({ route, navigation }) {
  const params = (route && route.params) || {};
  const userName = params.userName || 'usuário';

  // Exemplo de dados calculados / integrados
  const vendasMes = "R$ 12.450";
  const lucroMes = "R$ 3.100";
  const roiMes = "24,8%";

  const produtosMaisVendidos = [
    { id: 1, nome: "Banana prata", quantidade: 150, progresso: "80%" },
    { id: 2, nome: "Tomate Italiano", quantidade: 90, progresso: "50%" },
    { id: 3, nome: "Alface Crespa", quantidade: 45, progresso: "30%" },
  ];

  const alertasVencimento = [
    { id: '1', texto: "Alface Crespa (Lote 203) - Vence em 5 dias" },
    { id: '2', texto: "Tomate Italiano (Lote 012) - Vence em 2 dias" },
  ];

  const navigateTo = (screen, extraParams = {}) => {
    navigation.navigate(screen, { userName, ...extraParams });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Menu superior idêntico ao ProductsScreen */}
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
              style={[styles.menuButton, styles.activeButton]}
              activeOpacity={1}
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
              onPress={() => navigateTo('Help')}
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

      {/* Conteúdo da Dashboard */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Logotipo "Z" centralizado */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>Z</Text>
          </View>
        </View>

        {/* Card 1: Resumo Financeiro (Mês) */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resumo Financeiro (Mês)</Text>
          <View style={styles.rowInfo}>
            <View>
              <Text style={styles.labelSub}>Vendas</Text>
              <Text style={styles.valuePurple}>{vendasMes}</Text>
            </View>
            <View>
              <Text style={styles.labelSub}>Lucro</Text>
              <Text style={styles.valueGreen}>{lucroMes}</Text>
            </View>
            <View>
              <Text style={styles.labelSub}>ROI</Text>
              <Text style={styles.valueOrange}>{roiMes}</Text>
            </View>
          </View>
        </View>

        {/* Card 2: Produtos Mais Vendidos */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Produtos Mais Vendidos</Text>
          {produtosMaisVendidos.map((item) => (
            <View key={item.id} style={styles.productRow}>
              <Text style={styles.productText}>
                {item.nome} - {item.quantidade} un.
              </Text>
              <View style={styles.progressBarBackground}>
                <View
                  style={[styles.progressBarFill, { width: item.progresso }]}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Card 3: Alertas de Vencimento */}
        <View style={styles.alertCard}>
          <Text style={styles.alertTitle}>Alertas de Vencimento</Text>
          {alertasVencimento.map((alerta) => (
            <Text key={alerta.id} style={styles.alertText}>
              -{alerta.texto}
            </Text>
          ))}
        </View>
      </ScrollView>

      {/* Decoração inferior idêntica */}
      <View style={styles.bottomDecoration} />
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
    paddingTop: 20,
    paddingBottom: 60,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  logoBox: {
    width: 65,
    height: 65,
    backgroundColor: '#9747FF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 12,
  },

  rowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  labelSub: {
    fontSize: 12,
    color: '#666666',
  },

  valuePurple: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9747FF',
    marginTop: 2,
  },

  valueGreen: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#16A34A',
    marginTop: 2,
  },

  valueOrange: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D97706',
    marginTop: 2,
  },

  productRow: {
    marginBottom: 10,
  },

  productText: {
    fontSize: 12,
    color: '#333333',
    marginBottom: 4,
    fontWeight: '500',
  },

  progressBarBackground: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    width: '100%',
    overflow: 'hidden',
  },

  progressBarFill: {
    height: '100%',
    backgroundColor: '#9747FF',
  },

  alertCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },

  alertTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 8,
  },

  alertText: {
    fontSize: 12,
    color: '#991B1B',
    marginBottom: 4,
    fontWeight: '500',
  },

  bottomDecoration: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
    borderBottomWidth: 105,
    borderLeftWidth: 190,
    borderBottomColor: '#A855F7',
    borderLeftColor: 'transparent',
    zIndex: -1,
  },
});
