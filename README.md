# 🛍️ ShopReact - Loja Virtual 



## ✅ Funcionalidades Implementadas

### 1. **Autenticação (Login)**
- ✅ Página de login com validação de e-mail e senha
- ✅ Armazenamento de usuário no localStorage
- ✅ Exibição de saudação no header após login
- ✅ Botão de logout

**Teste:** Use qualquer e-mail e senha com mais de 6 caracteres
- Exemplo: `teste@shop.com` / `senha123`

### 2. **Listagem de Produtos**
- ✅ Integração com Fake Store API (https://fakestoreapi.com)
- ✅ Carregamento de produtos em tempo real
- ✅ Exibição com imagem, título, categoria e avaliações
- ✅ Preços formatados em Real (R$)

### 3. **Filtro por Categoria**
- ✅ Botão "Todos" para exibir todos os produtos
- ✅ Filtros dinâmicos por categoria:
  - electronics
  - jewelery
  - men's clothing
  - women's clothing

### 4. **Busca de Produtos**
- ✅ Campo de busca em tempo real
- ✅ Filtro por título do produto

### 5. **Detalhes do Produto**
- ✅ Página com informações completas
- ✅ Imagem ampliada
- ✅ Descrição completa
- ✅ Avaliações e ratings
- ✅ Controle de quantidade
- ✅ Botão para adicionar ao carrinho

### 6. **Carrinho de Compras**
- ✅ Persistência no localStorage
- ✅ Adicionar/remover produtos
- ✅ Atualizar quantidade
- ✅ Cálculo automático de totais
- ✅ Badge com quantidade no header
- ✅ Resumo com subtotal, frete e desconto

### 7. **Checkout e Pagamento**
- ✅ Formulário com todos os dados de entrega
- ✅ Informações de pagamento (cartão)
- ✅ Validação de campos obrigatórios
- ✅ Resumo do pedido antes de finalizar
- ✅ Simulação de processamento

### 8. **Confirmação de Pedido**
- ✅ Página de confirmação com:
  - Número do pedido
  - Status do pedido
  - Data de entrega estimada
  - Próximos passos

### 9. **Design Responsivo**
- ✅ Layout adaptável para mobile, tablet e desktop
- ✅ Navegação intuitiva
- ✅ Componentes visuais elegantes
- ✅ Animações suaves

## 📁 Estrutura do Projeto

```
src/
├── contexts/
│   ├── AuthContext.jsx      # Gerenciamento de autenticação
│   └── CartContext.jsx      # Gerenciamento do carrinho
├── pages/
│   ├── Login.jsx            # Página de login
│   ├── Home.jsx             # Listagem de produtos
│   ├── ProductDetail.jsx    # Detalhes do produto
│   ├── Cart.jsx             # Carrinho de compras
│   ├── Checkout.jsx         # Formulário de checkout
│   └── OrderConfirmation.jsx # Confirmação de pedido
├── components/
│   ├── Header.jsx           # Cabeçalho com navegação
│   └── ProductCard.jsx      # Card de produto
├── services/
│   └── productService.js    # Chamadas à API
├── styles/
│   ├── global.css           # Estilos globais
│   ├── Header.css           # Estilos do header
│   ├── Home.css             # Estilos da home
│   ├── ProductCard.css      # Estilos do card
│   ├── ProductDetail.css    # Estilos detalhes
│   ├── Cart.css             # Estilos do carrinho
│   ├── Checkout.css         # Estilos checkout
│   ├── Login.css            # Estilos login
│   └── OrderConfirmation.css # Estilos confirmação
├── App.jsx                  # Componente principal com rotas
└── main.jsx                 # Entrada da aplicação
```

## 🚀 Como Executar

### Iniciar o servidor de desenvolvimento:
```bash
npm run dev
```

O projeto rodará em `http://localhost:5174/`

### Build para produção:
```bash
npm run build
```

## 📦 Dependências Utilizadas

- **React 19.2.6** - Biblioteca principal
- **React Router DOM** - Roteamento entre páginas
- **Axios** - Requisições HTTP
- **Vite** - Build tool e dev server
- **Fake Store API** - API de teste com produtos reais

## 🔄 Fluxo da Aplicação

1. **Usuário acessa a home** → Vê lista de produtos
2. **Navega entre categorias** → Filtra produtos por tipo
3. **Clica em um produto** → Vê detalhes e avaliações
4. **Adiciona ao carrinho** → Produto é salvo no localStorage
5. **Vai para o carrinho** → Vê resumo com frete e desconto
6. **Faz login** (se não estiver) → Autenticação obrigatória para checkout
7. **Vai para checkout** → Preenche endereço e dados do cartão
8. **Confirma pedido** → Recebe número do pedido e status

## 💡 Recursos Avançados

- **Context API** para gerenciamento de estado global
- **localStorage** para persistência de dados
- **React Router** para navegação SPA
- **API Integration** com tratamento de erros
- **Validação de formulários** no frontend
- **Designs responsivos** com CSS Grid e Flexbox
- **Animações e transições** suaves

## 🎨 Temas e Cores

O projeto utiliza um paleta de cores profissional:
- **Primária:** #007bff (Azul)
- **Sucesso:** #28a745 (Verde)
- **Perigo:** #dc3545 (Vermelho)
- **Fundo:** #f8f9fa (Cinza claro)

## ⚙️ Configuração de Ambiente

O projeto está configurado com:
- **Vite** para otimização rápida
- **React Fast Refresh** para HMR (Hot Module Replacement)
- **ESLint** para qualidade de código
- **Node 16+** recomendado

## 🧪 Dados de Teste

Para testar o login:
- **E-mail:** teste@shop.com
- **Senha:** senha123

Qualquer e-mail e senha com +6 caracteres funcionam!

## 📝 Notas Importantes

1. **API Pública:** O projeto usa a Fake Store API, que é pública e de teste
2. **localStorage:** Os dados do carrinho e usuário são armazenados localmente
3. **Sem backend real:** O checkout é simulado (não processa pagamentos reais)
4. **Responsivo:** Funciona perfeitamente em mobile, tablet e desktop

**Desenvolvido com ❤️ em React + Vite**
