# TrackTripGain

[English](README.md) | [Português](README.pt.md)

Aplicativo para registrar viagens de transporte e acompanhar os ganhos e os gastos com combustível. O projeto foi criado com Expo e React Native e usa o Supabase para autenticação e persistência dos registros.

## Funcionalidades

- **Criar conta e entrar:** cadastro com nome, e-mail e senha, validação dos campos e autenticação através do Supabase.
- **Registro de viagens:** informar cliente, data, distância total em quilômetros, carga em toneladas e valor por quilômetro.
- **Cálculo do valor líquido:** o aplicativo calcula o valor bruto (`quilômetros × toneladas × valor por quilômetro`) e subtrai o gasto com combustível quando o combustível é próprio.
- **Consulta de viagens:** permite visualizar os registros com cliente, data, lucro líquido, valor bruto, combustível, valor por quilômetro, distância e peso.
- **Pesquisa e filtros:** permite pesquisar registros pelo nome do cliente e/ou filtrar por um determinado período.
- **Exclusão de viagens:** permite excluir um registro, mantendo-o pressionado para abrir a confirmação de exclusão.
- **Consultar perfil:** ver nome, e-mail, quantidade de viagens e ganho total da conta.

## Tecnologias

- [Expo SDK 54](https://docs.expo.dev/)
- React 19 e React Native 0.81
- TypeScript
- Expo Router para navegação
- Supabase Auth e Supabase Database
- NativeWind e Tailwind CSS para estilos

## Requisitos

- Node.js e npm
- Uma conta e um projeto no [Supabase](https://supabase.com/)
- Expo Go para executar em dispositivo físico, ou um emulador Android/iOS configurado

## Configuração

1. Clone o repositório e acesse a pasta do projeto:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd TrackTripGain
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Na raiz do projeto, crie um arquivo `.env` com as credenciais do seu projeto Supabase:

   ```dotenv
   EXPO_PUBLIC_SUPABASE_URL=https://SEU_PROJETO.supabase.co
   EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=SUA_CHAVE_PUBLICAVEL
   ```

   O aplicativo lê essas variáveis em `config/supabase.ts`. O arquivo `.env` está listado no `.gitignore`; não publique credenciais privadas no GitHub. Use somente a chave publicável apropriada para aplicativos cliente e configure as políticas de acesso do Supabase para proteger os dados dos usuários.

4. Configure o Supabase Auth para permitir cadastro e login por e-mail e senha. O aplicativo usa a tabela `trips` para guardar e consultar os registros. As operações do código usam os campos `id`, `user_id`, `user_name`, `customer`, `tripDate`, `totalKm`, `totalTon`, `valuePerKm`, `gain`, `fuel` e `valueFuel`. A tabela e as permissões correspondentes precisam estar configuradas no projeto Supabase.

## Executar o aplicativo

Inicie o servidor de desenvolvimento:

```bash
npm run start
```

Também é possível iniciar diretamente para uma plataforma:

```bash
npm run android
npm run ios
npm run web
```

O comando de iOS requer macOS e as ferramentas de desenvolvimento da Apple para execução nativa. Para dispositivos físicos, use o Expo Go e siga as instruções exibidas pelo Expo.

## Estrutura do projeto

```text
app/
  (painel)/       Telas de registro, histórico e perfil
  index.tsx       Entrada do aplicativo
  login.tsx       Acesso à conta
  signup.tsx      Criação de conta
components/       Campos, botões, cartões e controles reutilizáveis
config/           Cliente Supabase
contexts/         Estado de autenticação e sessão
hooks/            Operações de autenticação e viagens
types/            Dados auxiliares
```

## Estado atual

O componente de gráfico, os dados de exemplo para gráficos e o hook que busca nomes de clientes existem no código, mas não estão conectados às telas atuais. Assim, não há gráficos nem preenchimento automático de clientes disponível na interface neste momento.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run start` | Inicia o Expo |
| `npm run android` | Inicia o Expo direcionado ao Android |
| `npm run ios` | Inicia o Expo direcionado ao iOS |
| `npm run web` | Inicia a versão web |
