import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PRODUCTS_KEY } from '../storage/storageKeys';

const initialProducts = [
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

const formatCurrency = (value) => {
  if (typeof value === 'string' && value.includes('R$')) return value;
  const num = Number(value);
  if (isNaN(num)) return 'R$ 0,00';
  return `R$ ${num.toFixed(2).replace('.', ',')}`;
};

const parseCurrencyNumber = (value) => {
  if (typeof value === 'number') return value;
  if (!value) return '';
  return parseFloat(String(value).replace('R$', '').replace(',', '.').trim());
};

export default function ProductsScreen({ route, navigation }) {
  const params = (route && route.params) || {};
  const userName = params.userName || 'usuário';
  const mode = params.mode || 'view';
  const savedProduct = params.savedProduct;

  const [productsList, setProductsList] = useState(initialProducts);
  const [isStorageLoaded, setIsStorageLoaded] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Carrega os produtos salvos no AsyncStorage ao abrir a tela
  useEffect(() => {
    const loadStoredProducts = async () => {
      try {
        const stored = await AsyncStorage.getItem(PRODUCTS_KEY);
        if (stored) {
          setProductsList(JSON.parse(stored));
        } else {
          await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
        }
      } catch (error) {
        console.log('Erro ao carregar produtos salvos:', error);
      } finally {
        setIsStorageLoaded(true);
      }
    };

    loadStoredProducts();
  }, []);

  // Salva automaticamente no AsyncStorage sempre que a lista for alterada
  useEffect(() => {
    if (!isStorageLoaded) return;

    AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(productsList)).catch((error) =>
      console.log('Erro ao salvar produtos:', error)
    );
  }, [productsList, isStorageLoaded]);

  // Recebe produto cadastrado ou editado vindo da EditProductScreen
  useEffect(() => {
    if (savedProduct) {
      const rawCost = savedProduct.custo !== undefined ? savedProduct.custo : savedProduct.cost;
      const rawPrice = savedProduct.valor !== undefined ? savedProduct.valor : savedProduct.price;

      const formattedItem = {
        id: savedProduct.id,
        name: savedProduct.nome || savedProduct.name,
        category: savedProduct.tipo || savedProduct.category,
        cost: formatCurrency(rawCost),
        price: formatCurrency(rawPrice),
        expiry: savedProduct.expiry || '30/11/2026',
      };

      setProductsList((prev) => {
        const exists = prev.some((item) => String(item.id) === String(formattedItem.id));
        if (exists) {
          return prev.map((item) =>
            String(item.id) === String(formattedItem.id) ? formattedItem : item
          );
        }
        return [formattedItem, ...prev];
      });

      navigation.setParams({ savedProduct: null });
    }
  }, [savedProduct, navigation]);

  const filteredProducts = productsList.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

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

  const handleEditProduct = (product) => {
    navigation.navigate('EditProduct', {
      userName,
      mode: 'edit',
      product: {
        id: product.id,
        nome: product.name,
        tipo: product.category,
        custo: parseCurrencyNumber(product.cost),
        valor: parseCurrencyNumber(product.price),
        expiry: product.expiry,
      },
    });
  };

  const handleDeleteProduct = (product) => {
    Alert.alert(
      'Remover Produto',
      `Deseja remover "${product.name}" do sistema?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            setProductsList((prev) => prev.filter((item) => item.id !== product.id));
          },
        },
      ]
    );
  };

  const navigateTo = (screen, extraParams = {}) => {
    navigation.navigate(screen, { userName, ...extraParams });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Menu superior */}
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
              style={[styles.menuButton, styles.activeButton]}
              activeOpacity={1}
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

      {/* Conteúdo */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Linha Olá usuário + Botão Novo (Figma) */}
        <View style={styles.topUserBar}>
          <Text style={styles.greetingText}>Olá {userName}</Text>

          <TouchableOpacity
            style={styles.newButton}
            onPress={() => navigateTo('EditProduct', { mode: 'create', product: null })}
          >
            <Text style={styles.newButtonText}>Novo</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>
          {mode === 'delete' ? 'Selecione um produto para remover' : 'Produtos no sistema'}
        </Text>

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
                    <TouchableOpacity onPress={() => handleEditProduct(product)}>
                      <Ionicons
                        name="create-outline"
                        size={19}
                        color="#222222"
                      />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleDeleteProduct(product)}>
                      <Ionicons
                        name="trash-outline"
                        size={18}
                        color={mode === 'delete' ? '#DC2626' : '#666666'}
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
              {currentPage > 1 && (
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={goToPreviousPage}
                >
                  <Ionicons
                    name="chevron-back"
                    size={19}
                    color="#222222"
                  />
                </TouchableOpacity>
              )}

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
    paddingHorizontal: 16,
    paddingTop: 13,
    paddingBottom: 40,
  },

  topUserBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 12,
  },

  greetingText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222222',
  },

  newButton: {
    backgroundColor: '#9747FF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 9,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 1,
  },

  newButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
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
    width: 65,
    alignItems: 'center',
  },

  actionCell: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
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
