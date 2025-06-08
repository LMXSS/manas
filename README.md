# 💇‍♀️ Simone Lamas Studio - App de Gestão de Serviços

Aplicativo mobile desenvolvido para **organizar o fluxo de atendimento e o controle financeiro** de um salão de beleza local. A ferramenta permite cadastrar serviços realizados, atualizar seu status e acompanhar os atendimentos de forma simples e eficiente.

---

## 📲 Objetivo

Auxiliar o dia a dia da equipe do **Simone Lamas Studio Hair** digitalizando o controle de serviços com as etapas:

> **Criação de serviço ➜ Serviço finalizado ➜ Serviço pago**

---

## 🛠️ Tecnologias Utilizadas

- **React Native** com **Expo**
- **Expo Router** (navegação)
- **Zustand** (gerenciamento de estado)
- **AsyncStorage** (persistência local)
- **React Hook Form** + **Yup** (validação de formulários)
- **React Native Paper** (componentes visuais)
- **TypeScript**

---

## ✨ Funcionalidades

- 📋 Cadastro de serviços com nome do cliente, valor e observações
- 🔄 Atualização do status do serviço: `Criado`, `Finalizado`, `Pago`
- 📝 Edição de informações do serviço
- ❌ Remoção de serviços
- 🔍 Busca por nome do cliente
- 💾 Armazenamento local com **AsyncStorage** (offline first)

---

## 📂 Estrutura de Pastas

```bash
src/
 ├── @types/        # Tipagens compartilhadas
 ├── hooks/         # Hooks personalizados
 ├── store/         # Zustand store
 ├── utils/         # Funções auxiliares
 └── app/           # Páginas do Expo Router
