# Contribuindo para Admin Panel Web App

Obrigado por considerar contribuir para nosso projeto! 🎉

## 📋 Código de Conduta

Este projeto segue nosso [Código de Conduta](CODE_OF_CONDUCT.md). Ao participar, você deve seguir estas diretrizes.

## 🚀 Como Contribuir

### Reportando Bugs

Se você encontrar um bug:

1. **Verifique** se o bug já não foi reportado nas [Issues](https://github.com/leonardodavinci2049/admin-panel-web-app/issues)
2. **Crie uma nova issue** com:
   - Título claro e descritivo
   - Descrição detalhada do problema
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots (se aplicável)
   - Informações do ambiente (OS, browser, versão do Node.js)

### Sugerindo Melhorias

Para sugerir uma nova funcionalidade:

1. **Abra uma issue** com o template de Feature Request
2. **Descreva** a funcionalidade detalhadamente
3. **Explique** por que seria útil para o projeto
4. **Inclua** mockups ou exemplos se possível

### Pull Requests

#### Configurando o Ambiente de Desenvolvimento

1. **Fork** o repositório
2. **Clone** seu fork localmente:

   ```bash
   git clone https://github.com/SEU_USUARIO/admin-panel-web-app.git
   cd admin-panel-web-app
   ```

3. **Instale** as dependências:

   ```bash
   npm install
   ```

4. **Configure** as variáveis de ambiente:

   ```bash
   cp .env.example .env.local
   ```

5. **Configure** o banco de dados:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

#### Processo de Development

1. **Crie uma branch** para sua feature:

   ```bash
   git checkout -b feature/nome-da-feature
   ```

2. **Desenvolva** sua funcionalidade seguindo nossos padrões:
   - Use TypeScript com tipagem estrita
   - Siga as convenções de nomenclatura do projeto
   - Adicione comentários JSDoc quando necessário
   - Mantenha consistência com o código existente

3. **Teste** suas alterações:

   ```bash
   npm run dev
   npm run lint
   ```

4. **Commit** suas mudanças seguindo o padrão Conventional Commits:

   ```bash
   git commit -m "feat: adiciona nova funcionalidade de filtros avançados"
   ```

5. **Push** para sua branch:

   ```bash
   git push origin feature/nome-da-feature
   ```

6. **Crie um Pull Request** detalhado

#### Padrões de Código

- **Nomenclatura**:
  - Components: `PascalCase`
  - Functions: `camelCase`
  - Files: `kebab-case`
  - Constants: `UPPER_SNAKE_CASE`

- **Estrutura de Arquivos**:
  - Componentes em `src/components/`
  - Páginas em `src/app/`
  - Utilitários em `src/utils/`
  - Tipos em `src/types/`

- **TypeScript**:
  - Sempre use tipagem explícita
  - Evite `any`, prefira `unknown`
  - Use interfaces para objetos complexos

- **React/Next.js**:
  - Prefira Server Components quando possível
  - Use Client Components apenas quando necessário
  - Implemente loading states e error boundaries

#### Tipos de Commits (Conventional Commits)

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação (não afeta funcionalidade)
- `refactor`: Refatoração de código
- `test`: Adiciona ou modifica testes
- `chore`: Tarefas de manutenção

Exemplos:

```bash
feat: adiciona sistema de notificações push
fix: corrige erro de validação no formulário de usuário
docs: atualiza documentação da API de produtos
refactor: melhora performance da query de pedidos
```

## 🧪 Testes

- Execute os testes antes de submeter PRs
- Adicione testes para novas funcionalidades
- Mantenha cobertura de testes adequada

## 📚 Documentação

- Atualize a documentação quando necessário
- Adicione exemplos de uso para novas APIs
- Mantenha comentários de código atualizados

## 🔍 Review Process

1. **Automated Checks**: CI/CD executará automaticamente
2. **Code Review**: Mantedores revisarão seu código
3. **Feedback**: Responda aos comentários construtivamente
4. **Merge**: Após aprovação, o PR será mergado

## 📞 Obtendo Ajuda

- **Discord**: [Link do servidor Discord]
- **Issues**: Para bugs e feature requests
- **Email**: [seu-email@example.com]

## 🎯 Prioridades Atuais

Confira nossa [roadmap](https://github.com/leonardodavinci2049/admin-panel-web-app/projects) para ver o que estamos priorizando.

## 📝 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença MIT do projeto.

---

**Obrigado por contribuir! 🙏**
