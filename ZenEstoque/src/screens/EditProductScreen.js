import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';

export default function EditProductScreen({ route, navigation }) {
  const params = (route && route.params) || {};
  const userName = params.userName || 'usuário';
  const productToEdit = params.product || null;
  const isCreateMode = params.mode === 'create';

  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [custo, setCusto] = useState('');
  const [categoria, setCategoria] = useState('');

  // Preenche os campos automaticamente se um produto foi enviado para edição
  useEffect(() => {
    if (productToEdit) {
      setNome(productToEdit.nome || '');
      setPreco(
        productToEdit.valor !== undefined
          ? String(productToEdit.valor).replace('.', ',')
          : ''
      );
      setCusto(
        productToEdit.custo !== undefined
          ? String(productToEdit.custo).replace('.', ',')
          : ''
      );
      setCategoria(productToEdit.tipo || productToEdit.categoria || '');
    } else {
      setNome('');
      setPreco('');
      setCusto('');
      setCategoria('');
    }
  }, [productToEdit]);

  const navigateTo = (screen) => {
    navigation.navigate(screen, { userName });
  };

  const handleSave = () => {
    if (!nome.trim() || !preco.trim() || !custo.trim() || !categoria.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos antes de salvar.');
      return;
    }

    const parsedValor = parseFloat(preco.replace('R$', '').replace(',', '.').trim());
    const parsedCusto = parseFloat(custo.replace('R$', '').replace(',', '.').trim());

    if (isNaN(parsedValor) || isNaN(parsedCusto)) {
      Alert.alert('Valor inválido', 'Informe números válidos para Preço e Custo.');
      return;
    }

    const savedProduct = {
      id: (productToEdit && productToEdit.id) || String(Date.now()),
      nome: nome.trim(),
      tipo: categoria.trim(),
      custo: parsedCusto,
      valor: parsedValor,
    };

    Alert.alert(
      'Sucesso',
      isCreateMode
        ? 'Produto cadastrado com sucesso!'
        : 'Alterações salvas com sucesso!',
      [
        {
          text: 'OK',
          onPress: () =>
            navigation.navigate('Products', {
              userName,
              savedProduct,
              isNew: !productToEdit,
            }),
        },
      ]
    );
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
              onPress={() => navigateTo('Dashboard')}
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
              style={[styles.menuButton, styles.activeButton]}
              activeOpacity={1}
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
        <View style={styles.titleArea}>
          <Text style={styles.title}>
            {isCreateMode ? 'Cadastrar Produto' : 'Editar Produto'}
          </Text>

          <Text style={styles.subtitle}>
            {isCreateMode
              ? 'Insira as informações abaixo sobre o produto\na ser cadastrado.'
              : 'Insira as informações abaixo sobre o produto\na ser modificado.'}
          </Text>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          <Text style={styles.label}>Nome:</Text>

          <TextInput
            style={styles.input}
            placeholder="Danone, Bis, Chocolate e etc."
            placeholderTextColor="#A3A3A3"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Preço:</Text>

          <TextInput
            style={styles.input}
            placeholder="Exemplo: R$4,50"
            placeholderTextColor="#A3A3A3"
            keyboardType="decimal-pad"
            value={preco}
            onChangeText={setPreco}
          />

          <Text style={styles.label}>Custo:</Text>

          <TextInput
            style={styles.input}
            placeholder="Exemplo: R$2,00"
            placeholderTextColor="#A3A3A3"
            keyboardType="decimal-pad"
            value={custo}
            onChangeText={setCusto}
          />

          <Text style={styles.label}>Categoria:</Text>

          <TextInput
            style={styles.input}
            placeholder="Exemplo: bebida, lanche, limpeza, etc."
            placeholderTextColor="#A3A3A3"
            value={categoria}
            onChangeText={setCategoria}
          />
        </View>

        {/* Botão */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>
            {isCreateMode ? 'Cadastrar Produto' : 'Salvar Alterações'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Decoração inferior direita inclinada */}
      <View style={styles.bottomDecoration} pointerEvents="none" />
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
    paddingTop: 14,
    paddingBottom: 35,
  },

  titleArea: {
    position: 'relative',
    marginBottom: 20,
    paddingTop: 2,
    minHeight: 78,
    overflow: 'hidden',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 6,
    zIndex: 1,
  },

  subtitle: {
    fontSize: 10,
    color: '#888888',
    lineHeight: 14,
    zIndex: 1,
  },

  form: {
    width: '100%',
  },

  label: {
    fontSize: 10,
    color: '#222222',
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 5,
  },

  input: {
    height: 40,
    width: '100%',
    borderWidth: 1.3,
    borderColor: '#9747FF',
    borderRadius: 10,
    paddingHorizontal: 13,
    fontSize: 11,
    color: '#333333',
    backgroundColor: '#FFFFFF',
  },

  saveButton: {
    height: 44,
    backgroundColor: '#9747FF',
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderBottomWidth: 4,
    borderBottomColor: '#B77AFF',
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },

  bottomDecoration: {
    position: 'absolute',
    bottom: -45,
    right: -45,
    width: 190,
    height: 150,
    backgroundColor: '#C084FC',
    borderTopLeftRadius: 24,
    transform: [{ rotate: '-22deg' }],
  },
});
