
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
  { id: 1, name: 'Tomate Italiano', category: 'Legumes', price: 'R$ 8,50', cost: 'R$ 5,00', expiry: '12/11/2026' },
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

const ITEMS_PER_PAGE = 6;

export default function ProductsScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const visibleProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Menu superior */}
      <View style={styles.header}>
        <View style={styles.menu}>
          <View style={styles.menuRow}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuButton}>
              <Text style={styles.menuText}>Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuButton, styles.activeButton]}
            >
              <Text style={styles.menuText}>Produtos</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate('Sales')}
          >
            <Text style={styles.menuText}>Venda</Text>
          </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => navigation.navigate('EditProduct')}
            >
              <Text style={styles.menuText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => navigation.navigate('Help')}
            >
              <Text style={styles.menuText}>Ajuda</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.profileButton}>
              <Text style={styles.butterfly}>🦋</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Conteúdo */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Produtos no sistema</Text>

        {/* Pesquisa */}
        <View style={styles.searchArea}>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#222222" />

            <TextInput
              style={styles.searchInput}
              placeholder="Consultar"
              placeholderTextColor="#9747FF"
              value={search}
              onChangeText={handleSearch}
            />
          </View>
        </View>

        {/* Tabela */}
        <View style={styles.tableContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              {/* Cabeçalho */}
              <View style={styles.tableHeader}>
                <Text style={[styles.headerText, styles.nameColumn]}>
                  Nome
                </Text>

                <Text style={[styles.headerText, styles.categoryColumn]}>
                  Tipo
                </Text>

                <Text style={[styles.headerText, styles.valueColumn]}>
                  Custo
                </Text>

                <Text style={[styles.headerText, styles.valueColumn]}>
                  Valor
                </Text>

                <Text style={[styles.headerText, styles.expiryColumn]}>
                  Validade
                </Text>

                <Text style={[styles.headerText, styles.actionColumn]}>
                  Opções
                </Text>
              </View>

              {/* Linhas */}
              {visibleProducts.map((product) => (
                <View key={product.id} style={styles.tableRow}>
                  <Text style={[styles.cellText, styles.nameColumn]} numberOfLines={1}>
                    {product.name}
                  </Text>

                  <Text style={[styles.cellText, styles.categoryColumn]} numberOfLines={1}>
                    {product.category}
                  </Text>

                  <Text style={[styles.cellText, styles.valueColumn]}>
                    {product.cost}
                  </Text>

                  <Text style={[styles.cellText, styles.valueColumn]}>
                    {product.price}
                  </Text>

                  <Text style={[styles.cellText, styles.expiryColumn]}>
                    {product.expiry}
                  </Text>

                  <View style={[styles.actionColumn, styles.actionCell]}>
                    <TouchableOpacity>
                      <Ionicons
                        name="create-outline"
                        size={20}
                        color="#222222"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          {filteredProducts.length === 0 && (
            <Text style={styles.emptyText}>
              Nenhum produto encontrado.
            </Text>
          )}

          {/* Paginação */}
          <View style={styles.pagination}>
            <Text style={styles.paginationText}>
              Mostrando página {currentPage} de {totalPages}
            </Text>

            <View style={styles.paginationControls}>
              <Text style={styles.pageNumber}>{currentPage}</Text>

              <TouchableOpacity
                style={styles.nextButton}
                onPress={goToNextPage}
                disabled={currentPage === totalPages}
              >
                <Ionicons
                  name="chevron-forward"
                  size={19}
                  color={currentPage === totalPages ? '#AAAAAA' : '#222222'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Decoração inferior do Figma */}
      <View style={styles.bottomDecoration} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    marginHorizontal: 14,
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

  content: {
    paddingHorizontal: 10,
    paddingTop: 13,
    paddingBottom: 40,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222222',
    textAlign: 'center',
    marginBottom: 15,
  },

  searchArea: {
    alignItems: 'center',
    marginBottom: 18,
  },

  searchContainer: {
    width: '65%',
    height: 38,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
    color: '#333333',
    outlineStyle: 'none',
  },

  tableContainer: {
    borderWidth: 1.5,
    borderColor: '#9747FF',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },

  tableHeader: {
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A855F7',
    paddingHorizontal: 5,
  },

  headerText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },

  tableRow: {
    height: 34,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderBottomWidth: 1.5,
    borderBottomColor: '#9747FF',
  },

  cellText: {
    color: '#222222',
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },

  nameColumn: {
    width: 115,
    textAlign: 'left',
  },

  categoryColumn: {
    width: 85,
  },

  valueColumn: {
    width: 75,
  },

  expiryColumn: {
    width: 100,
  },

  actionColumn: {
    width: 55,
    alignItems: 'center',
  },

  actionCell: {
    justifyContent: 'center',
  },

  emptyText: {
    textAlign: 'center',
    color: '#777777',
    padding: 20,
    fontSize: 12,
  },

  pagination: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },

  paginationText: {
    fontSize: 10,
    color: '#9747FF',
  },

  paginationControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  pageNumber: {
    backgroundColor: '#E5E5E5',
    color: '#9747FF',
    fontSize: 13,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 3,
  },

  nextButton: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
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
