
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EditProductScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [custo, setCusto] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleSave = () => {
    Alert.alert(
      'Tela de edição',
      'O formulário está pronto. A integração para salvar o produto será feita posteriormente.'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topMenuContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topMenuScroll}
        >
          {['Home', 'Dashboard', 'Produtos', 'Vendas', 'Editar', 'Ajuda'].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.topChip,
                item === 'Editar' && styles.activeChip,
              ]}
              onPress={() => {
                if (item === 'Home') navigation.navigate('Home');
              }}
            >
              <Text
                style={[
                  styles.topChipText,
                  item === 'Editar' && styles.activeChipText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.profileChip}>
          <Ionicons name="person-circle" size={25} color="#A855F7" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Editar Produto</Text>

        <Text style={styles.subtitle}>
          Insira as informações abaixo para atualizar os dados do produto.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder="Exemplo: Dados, Eletrônicos e etc."
            placeholderTextColor="#999"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Preço:</Text>
          <TextInput
            style={styles.input}
            placeholder="Exemplo: R$ 14,50"
            placeholderTextColor="#999"
            keyboardType="decimal-pad"
            value={preco}
            onChangeText={setPreco}
          />

          <Text style={styles.label}>Custo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Exemplo: R$ 12,00"
            placeholderTextColor="#999"
            keyboardType="decimal-pad"
            value={custo}
            onChangeText={setCusto}
          />

          <Text style={styles.label}>Categoria:</Text>
          <TextInput
            style={styles.input}
            placeholder="Exemplo: Bebidas, lanches, limpeza, etc."
            placeholderTextColor="#999"
            value={categoria}
            onChangeText={setCategoria}
          />
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
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

  activeChipText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  profileChip: {
    padding: 3,
    marginLeft: 3,
  },

  content: {
    paddingHorizontal: 24,
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
    marginBottom: 22,
    lineHeight: 19,
  },

  form: {
    width: '100%',
  },

  label: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '600',
    marginBottom: 7,
    marginTop: 15,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#A855F7',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 13,
    color: '#333333',
  },

  saveButton: {
    backgroundColor: '#A855F7',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
    borderBottomWidth: 3,
    borderBottomColor: '#9333EA',
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
