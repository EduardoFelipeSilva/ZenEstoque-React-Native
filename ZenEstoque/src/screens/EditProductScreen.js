
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

import AsyncStorage from '@react-native-async-storage/async-storage';
import { PRODUCTS_KEY } from '../storage/storageKeys';

export default function EditProductScreen({ route, navigation }) {
  const params = route?.params || {};
  const userName = params.userName || 'usuário';
  const productToEdit = params.product || null;
  const isCreateMode = !productToEdit;

  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [custo, setCusto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [validade, setValidade] = useState('');
  const [saving, setSaving] = useState(false);

  // Preenche os campos quando estiver editando
  useEffect(() => {
    if (productToEdit) {
      setNome(productToEdit.nome || productToEdit.name || '');

      setPreco(
        String(
          productToEdit.valor ?? productToEdit.price ?? ''
        ).replace('.', ',')
      );

      setCusto(
        String(
          productToEdit.custo ?? productToEdit.cost ?? ''
        ).replace('.', ',')
      );

      setCategoria(
        productToEdit.tipo ||
        productToEdit.categoria ||
        productToEdit.category ||
        ''
      );

      const expiry =
        productToEdit.validade ||
        productToEdit.expiry ||
        '';

      setValidade(
        expiry === 'Não informada' ? '' : expiry
      );

    } else {
      setNome('');
      setPreco('');
      setCusto('');
      setCategoria('');
      setValidade('');
    }
  }, [productToEdit]);

  // Exibe mensagens no celular e no navegador
  const showMessage = (title, message, callback) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${message}`);

      if (callback) {
        callback();
      }
    } else {
      Alert.alert(title, message, [
        {
          text: 'OK',
          onPress: callback,
        },
      ]);
    }
  };

  // Navegação
  const navigateTo = (screen) => {
    navigation.navigate(screen, { userName });
  };

  // Converte valores monetários para números
  const parseValue = (value) => {
    let text = String(value)
      .replace('R$', '')
      .replace(/\s/g, '');

    if (text.includes(',')) {
      text = text
        .replace(/\./g, '')
        .replace(',', '.');
    }

    return Number(text);
  };

  // Salva ou atualiza o produto no AsyncStorage
  const handleSave = async () => {
    if (saving) return;

    // Validação dos campos obrigatórios
    if (
      !nome.trim() ||
      !preco.trim() ||
      !custo.trim() ||
      !categoria.trim()
    ) {
      showMessage(
        'Atenção',
        'Preencha todos os campos obrigatórios antes de salvar.'
      );

      return;
    }

    const parsedValor = parseValue(preco);
    const parsedCusto = parseValue(custo);

    // Validação dos valores
    if (
      !Number.isFinite(parsedValor) ||
      !Number.isFinite(parsedCusto) ||
      parsedValor < 0 ||
      parsedCusto < 0
    ) {
      showMessage(
        'Valor inválido',
        'Informe números válidos para Preço e Custo.'
      );

      return;
    }

    setSaving(true);

    try {
      // Busca os produtos já cadastrados
      const stored = await AsyncStorage.getItem(PRODUCTS_KEY);

      const products = stored
        ? JSON.parse(stored)
        : [];

      if (!Array.isArray(products)) {
        throw new Error('Formato de armazenamento inválido.');
      }

      // Cria o objeto do produto
      const savedProduct = {
        id: productToEdit?.id ?? String(Date.now()),
        nome: nome.trim(),
        tipo: categoria.trim(),
        custo: parsedCusto,
        valor: parsedValor,
        validade: validade.trim(),
        expiry: validade.trim(),
      };

      let updatedProducts;

      if (productToEdit) {
        // Atualiza um produto existente
        const exists = products.some(
          (item) =>
            String(item.id) === String(savedProduct.id)
        );

        if (!exists) {
          throw new Error('Produto não encontrado.');
        }

        updatedProducts = products.map((item) =>
          String(item.id) === String(savedProduct.id)
            ? { ...item, ...savedProduct }
            : item
        );

      } else {
        // Adiciona um novo produto
        updatedProducts = [
          savedProduct,
          ...products,
        ];
      }

      // Salva definitivamente no armazenamento
      await AsyncStorage.setItem(
        PRODUCTS_KEY,
        JSON.stringify(updatedProducts)
      );

      console.log('Produto salvo:', savedProduct);
      console.log('Produtos cadastrados:', updatedProducts);

      // Exibe a confirmação e retorna para a lista
      showMessage(
        'Sucesso',
        isCreateMode
          ? 'Produto cadastrado com sucesso!'
          : 'Alterações salvas com sucesso!',
        () => {
          setNome('');
          setPreco('');
          setCusto('');
          setCategoria('');
          setValidade('');

          navigation.setParams({
            product: null,
            mode: 'create',
          });

          navigation.navigate('Products', {
            userName,
            savedProduct: null,
            mode: 'view',
          });
        }
      );

    } catch (error) {
      console.log('Erro ao salvar produto:', error);

      showMessage(
        'Erro',
        'Não foi possível salvar o produto: ' + error.message
      );

    } finally {
      setSaving(false);
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
              style={[
                styles.menuButton,
                styles.activeButton,
              ]}
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
        keyboardShouldPersistTaps="handled"
      >

        <View style={styles.titleArea}>

          <Text style={styles.title}>
            {isCreateMode
              ? 'Cadastrar Produto'
              : 'Editar Produto'}
          </Text>

          <Text style={styles.subtitle}>
            {isCreateMode
              ? 'Insira as informações abaixo sobre o produto\na ser cadastrado.'
              : 'Insira as informações abaixo sobre o produto\na ser modificado.'}
          </Text>

        </View>

        {/* Formulário */}
        <View style={styles.form}>

          {/* Nome */}
          <Text style={styles.label}>Nome:</Text>

          <TextInput
            style={styles.input}
            placeholder="Danone, Bis, Chocolate e etc."
            placeholderTextColor="#A3A3A3"
            value={nome}
            onChangeText={setNome}
          />

          {/* Preço */}
          <Text style={styles.label}>Preço:</Text>

          <TextInput
            style={styles.input}
            placeholder="Exemplo: R$4,50"
            placeholderTextColor="#A3A3A3"
            keyboardType="decimal-pad"
            value={preco}
            onChangeText={setPreco}
          />

          {/* Custo */}
          <Text style={styles.label}>Custo:</Text>

          <TextInput
            style={styles.input}
            placeholder="Exemplo: R$2,00"
            placeholderTextColor="#A3A3A3"
            keyboardType="decimal-pad"
            value={custo}
            onChangeText={setCusto}
          />

          {/* Categoria */}
          <Text style={styles.label}>Categoria:</Text>

          <TextInput
            style={styles.input}
            placeholder="Exemplo: bebida, lanche, limpeza, etc."
            placeholderTextColor="#A3A3A3"
            value={categoria}
            onChangeText={setCategoria}
          />

          {/* Validade */}
          <Text style={styles.label}>
            Validade (opcional):
          </Text>

          <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#A3A3A3"
            value={validade}
            onChangeText={setValidade}
            maxLength={10}
          />

        </View>

        {/* Botão salvar */}
        <TouchableOpacity
          style={[
            styles.saveButton,
            saving && styles.disabledButton,
          ]}
          onPress={handleSave}
          activeOpacity={0.8}
          disabled={saving}
        >

          <Text style={styles.saveButtonText}>
            {saving
              ? 'Salvando...'
              : isCreateMode
                ? 'Cadastrar Produto'
                : 'Salvar Alterações'}
          </Text>

        </TouchableOpacity>

      </ScrollView>

      {/* Decoração inferior direita */}
      <View
        style={styles.bottomDecoration}
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

    ...(Platform.OS === 'web'
      ? { outlineStyle: 'none' }
      : {}),
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

  disabledButton: {
    opacity: 0.6,
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
