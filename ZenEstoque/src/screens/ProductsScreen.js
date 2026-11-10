
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const products = [
  { id: 1, name: 'Tomate Italiano', category: 'Frutas e legumes', price: 'R$ 8,50', cost: 'R$ 5,00', expiry: '12/11/2026' },
  { id: 2, name: 'Banana Prata', category: 'Frutas', price: 'R$ 6,00', cost: 'R$ 3,50', expiry: '11/11/2026' },
  { id: 3, name: 'Maçã Fuji', category: 'Frutas', price: 'R$ 9,90', cost: 'R$ 6,00', expiry: '15/11/2026' },
  { id: 4, name: 'Mamão Formosa', category: 'Frutas', price: 'R$ 7,50', cost: 'R$ 4,00', expiry: '13/11/2026' },
  { id: 5, name: 'Morango', category: 'Frutas', price: 'R$ 12,00', cost: 'R$ 8,00', expiry: '10/11/2026' },
  { id: 6, name: 'Uva Verde', category: 'Frutas', price: 'R$ 14,00', cost: 'R$ 9,00', expiry: '14/11/2026' },
  { id: 7, name: 'Alface Crespa', category: 'Verduras', price: 'R$ 4,50', cost: 'R$ 2,00', expiry: '11/11/2026' },
  { id: 8, name: 'Batata Inglesa', category: 'Legumes', price: 'R$ 6,50', cost: 'R$ 3,50', expiry: '20/11/2026' },
  { id: 9, name: 'Cenoura', category: 'Legumes', price: 'R$ 5,00', cost: 'R$ 2,50', expiry: '18/11/2026' },
  { id: 10, name: 'Brócolis', category: 'Verduras', price: 'R$ 8,00', cost: 'R$ 4,50', expiry: '12/11/2026' },
  { id: 11, name: 'Frango Resfriado', category: 'Carnes', price: 'R$ 18,00', cost: 'R$ 13,00', expiry: '12/11/2026' },
  { id: 12, name: 'Carne Bovina', category: 'Carnes', price: 'R$ 38,00', cost: 'R$ 29,00', expiry: '13/11/2026' },
  { id: 13, name: 'Leite Integral', category: 'Laticínios', price: 'R$ 5,50', cost: 'R$ 3,50', expiry: '25/11/2026' },
  { id: 14, name: 'Queijo Minas', category: 'Laticínios', price: 'R$ 22,00', cost: 'R$ 16,00', expiry: '16/11/2026' },
  { id: 15, name: 'Iogurte Natural', category: 'Laticínios', price: 'R$ 6,00', cost: 'R$ 3,80', expiry: '17/11/2026' },
  { id: 16, name: 'Presunto Fatiado', category: 'Frios', price: 'R$ 12,00', cost: 'R$ 8,00', expiry: '14/11/2026' },
  { id: 17, name: 'Peixe Fresco', category: 'Peixes', price: 'R$ 32,00', cost: 'R$ 24,00', expiry: '11/11/2026' },
];

export default function ProductsScreen() {
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

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
                item === 'Produtos' && styles.activeChip,
              ]}
            >
              <Text style={styles.topChipText}>{item}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.profileChip}>
          <Ionicons name="person-circle" size={25} color="#A855F7" />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Produtos Cadastrados</Text>
        <Text style={styles.subtitle}>
          Consulte os produtos cadastrados no estoque.
        </Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar produto..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.summary}>
          <Ionicons name="cube-outline" size={22} color="#9333EA" />
          <View>
            <Text style={styles.summaryNumber}>{filteredProducts.length}</Text>
            <Text style={styles.summaryLabel}>Produtos encontrados</Text>
          </View>
        </View>

        {filteredProducts.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <View style={styles.productHeader}>
              <View style={styles.productIcon}>
                <Ionicons name="leaf-outline" size={22} color="#9333EA" />
              </View>

              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.category}>{product.category}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.details}>
              <View>
                <Text style={styles.detailLabel}>Preço</Text>
                <Text style={styles.detailValue}>{product.price}</Text>
              </View>

              <View>
                <Text style={styles.detailLabel}>Custo</Text>
                <Text style={styles.detailValue}>{product.cost}</Text>
              </View>

              <View>
                <Text style={styles.detailLabel}>Validade</Text>
                <Text style={styles.detailValue}>{product.expiry}</Text>
              </View>
            </View>

            <View style={styles.actions}>
              <View style={styles.editAction}>
                <Ionicons name="create-outline" size={17} color="#9333EA" />
                <Text style={styles.editText}>Editar</Text>
              </View>

              <View style={styles.removeAction}>
                <Ionicons name="trash-outline" size={17} color="#DC2626" />
                <Text style={styles.removeText}>Remover</Text>
              </View>
            </View>
          </View>
        ))}

        {filteredProducts.length === 0 && (
          <Text style={styles.emptyText}>
            Nenhum produto encontrado.
          </Text>
        )}
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
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 10,
    paddingRight: 12,
  },
  topMenuScroll: {
    paddingHorizontal: 12,
    gap: 6,
    alignItems: 'center',
  },
  topChip: {
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#A855F7',
  },
  activeChip: {
    backgroundColor: '#9333EA',
  },
  topChipText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  profileChip: {
    padding: 3,
    marginLeft: 3,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 40,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 20,
  },
  searchContainer: {
    height: 46,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 18,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
    color: '#333',
    outlineStyle: 'none',
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    gap: 12,
  },
  summaryNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B21A8',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B21A8',
  },
  productCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
    marginBottom: 13,
    backgroundColor: '#FFFFFF',
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productIcon: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfo: {
    marginLeft: 12,
    flex: 1,
  },
  productName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
  },
  category: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 3,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 13,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },
  detailLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 18,
    marginTop: 15,
  },
  editAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  editText: {
    color: '#9333EA',
    fontSize: 12,
    fontWeight: '600',
  },
  removeAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  removeText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 30,
  },
});
