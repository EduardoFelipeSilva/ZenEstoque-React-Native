# 📦 Zen Estoques

Aplicativo mobile de controle de estoque, produtos e acompanhamento de vendas desenvolvido em **React Native** com **Expo**. O projeto conta com interface responsiva para Android e iOS, navegação em pilha e persistência local de dados para funcionamento offline.

---

## ✨ Funcionalidades

- **Autenticação e Sessão:** Tela de boas-vindas, cadastro de novos usuários com validação de formulário, login e controle de sessão ativa via `AsyncStorage`.
- **Painel Inicial (Home):** Menu superior de navegação rápida e atalhos principais para **Cadastro**, **Consulta**, **Remoção** e **Edição** de produtos.
- **Gestão de Produtos:**
  - Listagem organizada em tabela com paginação.
  - Busca em tempo real por nome ou categoria.
  - Cadastro de novos itens e edição de nome, categoria, preço de venda e custo.
  - Exclusão de itens com confirmação de segurança e salvamento automático no dispositivo.
- **Relatório de Vendas:** Visualização de total de vendas, lucro mensal e indicadores de desempenho por período (*Este Mês*, *Mês Anterior* e *Trimestre*).
- **Perfil e Segurança:** Consulta e edição de dados cadastrais (nome, telefone e empresa), alteração de senha, encerramento de sessão (*logout*) e exclusão de conta.
- **Central de Ajuda:** Canais de contato com o suporte, reporte de problemas e avaliação do aplicativo.

---

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/) / Expo Snack
- [React Navigation](https://reactnavigation.org/) (`@react-navigation/native` e `@react-navigation/native-stack`)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) (`@react-native-async-storage/async-storage`)
- [Expo Vector Icons](https://docs.expo.dev/guides/icons/) (`@expo/vector-icons`)

---

## 📁 Estrutura do Projeto

```text
zen-estoques/
├── App.js                             # Configuração das rotas e navegação principal
└── src/
    ├── screens/
    │   ├── WelcomeScreen.js           # Tela inicial de boas-vindas
    │   ├── LoginScreen.js             # Autenticação de usuário
    │   ├── RegisterScreen.js          # Cadastro de nova conta
    │   ├── HomeScreen.js              # Menu principal e atalhos rápidos
    │   ├── ProductsScreen.js          # Consulta, busca, paginação e remoção de produtos
    │   ├── EditProductScreen.js       # Cadastro e edição de produtos
    │   ├── SalesScreen.js             # Indicadores de vendas e lucro mensal
    │   ├── HelpScreen.js              # Suporte, contato e avaliação
    │   ├── ProfileModalScreen.js      # Menu rápido de perfil e logout
    │   ├── ProfileScreen.js           # Edição de dados pessoais e alteração de senha
    │   └── SuccessScreen.js           # Confirmação de atualização cadastral
    ├── services/
    │   ├── api.js                     # Simulação de endpoints REST com AsyncStorage
    │   ├── session.js                 # Gerenciamento da sessão do usuário logado
    │   └── debugDatabase.js           # Utilitários de inspeção e limpeza do banco local
    ├── storage/
    │   └── storageKeys.js             # Chaves padronizadas do AsyncStorage
    └── utils/
        └── mensagem.js                # Alertas compatíveis com Android, iOS e Web
