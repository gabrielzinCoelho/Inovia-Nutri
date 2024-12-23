# Inovia Nutri

## Sobre o projeto

Repositório de desenvolvimento de uma aplicação de agendamento para uma clínica de nutrição, na qual o nutricionista possa gerenciar consultas com seus pacientes por meio de um calendário interativo.

A aplicação consiste em uma interface de calendário voltada para o gerenciamento de consultas em uma clínica de nutrição. Ela permite que os nutricionistas agendem, visualizem, editem e excluam consultas com pacientes, assegurando que não haja conflitos de horários entre consultas de um mesmo profissional.

## Tecnologias Utilizadas

- Frontend

  - React e Redux/ContextAPI
  - Vite
  - FullCalendar
  - MaterialUI

- Backend

  - NestJS
  - Swagger
  - Class Validator
  - Passport

- Banco de Dados
  - MongoDB
  - Mongoose

- Docker

## Configuração

Para a execução do projeto é preciso fornecer as variáveis ambientes que serão utilizadas.

Nos diretórios <code>web</code> e <code>backend</code> existe um arquivo <code>.env.example</code> que serve de modelo para a criação dos respectivos arquivos <code>.env</code>.

Portanto, antes de iniciar a execução, certifique-se de criar corretamente os seguintes arquivos:

- <code>/web/.env</code>
- <code>/backend/.env</code>

## Instalação (máquina local)

### Frontend

- Primeiro: navegue para o diretório web

```shell
$ cd web
```

- Segundo: instale as dependências do projeto

```shell
$ npm i
```

- Terceiro: inicialize o servidor de desenvolvimento

```shell
$ npm run dev
```

### Backend

- Primeiro: navegue para o diretório backend<br/>

```shell
$ cd backend
```

- Segundo: instale as dependências do projeto<br/>

```shell
$ npm i
```

- Terceiro: inicialize o container do banco de dados MongoDB <code>(backend/docker-compose.yml)</code><br/>

``` shell
$ sudo docker compose up -d
```

- Quarto: inicialize o servidor de desenvolvimento<br/>

```shell
$ npm run start
```

## Executar via Docker

- Na pasta raiz do projeto execute: <br/>

```shell
$ sudo docker compose up -d
```

A aplicação web poderá ser acessada de forma estática na url <code>localhost:8080</code>.

Para executar a aplicação com persistência dos dados, basta adicionar uma pasta <code>/backend/mongo-data</code> com as permissões necessárias e descomentar a seção <code>volumes</code> do service de banco de dados no arquivo <code>/docker-compose.yml</code>.

```yml
inovia-nutri-mongo:
  image: 'bitnami/mongodb:latest'
  container_name: inovia-nutri-mongo
  ports:
    - 27017:27017
  environment:
    - MONGODB_ROOT_USER=root
    - MONGODB_ROOT_PASSWORD=root
  volumes:
    - ./backend/mongo-data:/bitnami/mongodb
  networks:
    - app-network
```


## Povoamento do banco de dados

Na execução da aplicação via docker, o script de povoamento do banco de dados é executado de forma automática. Sendo assim, para fazer o login na aplicação, é possível utilizar as credenciais <code>johndoe@example.com<code> e <code>12345<code> (login e senha, respectivamente).

Para executar o script de forma manual, basta realizar os seguintes comandos a partir do diretório raiz:

```sh
$ cd backend

# apenas insere novos registros
$ npm run seed

# remove os registros existentes e insere novos
$ npm run seed:refresh
```

## Documentação da API

Todas as rotas da API utilizada na aplicação foram documentadas via Swagger e podem ser acessadas na rota <code>/docs</code> ou <code>/docs/json</code> via requisição <code>GET</code>.
