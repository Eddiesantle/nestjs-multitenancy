# Aplicações multi tenancy com Nest.js

## Microsserviços de parceiros de ingressos com Nest.js

Este projeto implementa um sistema de vendas de ingressos utilizando uma arquitetura de microsserviços com NestJS. A aplicação segue as melhores práticas de desenvolvimento para gerenciar e organizar vendas, gerar ingressos e lidar com a disputa de ingressos entre clientes.

## Funcionalidades Principais

- Gerenciamento de Ingressos: Cadastro, atualização e gerenciamento de ingressos para eventos.
- Autenticação e Autorização: Suporte a múltiplos usuários e roles (parceiros e clientes).
- Multi-Tenancy: Suporte a múltiplos tenants, cada um com sua própria configuração e dados.
- Notificações: Notificações aos usuários interessados quando os ingressos são liberados.

## Estrutura do Projeto

O projeto está estruturado seguindo o padrão MVC (Model-View-Controller) e utiliza injeção de dependência para gerenciamento de serviços. A arquitetura de microsserviços permite a escalabilidade e manutenibilidade do sistema.

## Tecnologias utilizadas

- TypeScript/Javascript
- Nest.js
- Prisma ORM
- Rest
- Autentificação
- Docker
- MySQL

## Instalação

1. Clone o repositório:

```bash
git https://github.com/Eddiesantle/nestjs-multitenancy.git
cd nestjs-multitenancy
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o Prisma:

```bash
npx prisma init
```

4. Suba o container do banco de dados MySQL:

```bash
docker-compose up -d
```

5. Execute as migrações do Prisma:

```bash
npx prisma migrate dev
```

## Processos e Configuração do Projeto

1. Autenticação:
   Gere os módulos, controladores e serviços para autenticação:

```bash
nest g module auth
nest g controller auth/users
nest g service auth/users
```

2. Configuração do Prisma:
   Gere os módulos e serviços do Prisma para gerenciar a conexão com o banco de dados:

```
npx prisma
npx prisma init
```

Instale o cliente Prisma:

```
npm install @prisma/client
```

3. Executar banco mysql com docker:

```
docker compose up
```

Acessar container do banco de dados

```
docker compose exec db bash
```

Acessar mysql

```
mysql -uroot -proot
```

4. Integrar Prisma com NestJS:

Execute as migrações do Prisma:

```
npx prisma migrate dev
```

Gere os módulos e serviços do Prisma para gerenciar a conexão com o banco de dados:

```
nest g module prisma
nest g service prisma
```

prisma.service.ts vai gerenciar acesso ao banco de dados

```
npm install @prisma/client
```

Notifica quem esta interessado quando os modulos forem iniciados
(OnModuleInit)

//Error: Nest can't resolve dependencies of the UsersService (?). Please make sure that the argument PrismaService at index [0] is available in the AuthModule context.

1. Solução:Importar modulo Prisma no modulo Auth

```javascript
//src/auth/auth.module.ts
@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AuthModule {}
```

Problema: cada modulo obrigatoriamente faz conexão com banco, queremos fazer apenas uma conexão por chamada HTTP recebida

2. Solução: Habilitar prisma de forma Global

```javascript
//src/prisma/prisma.module.ts
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

4. Criação de DTOs e Modelos:

Criar pasta para MODELAR os dados: src/auth/users/dtos/create-user-dto.ts

Oque é DTO - Date trasfer object:
Objeto de transferência de dados

```javascript
// src/users/dtos/create-user-dto.ts
export class CreateUserDto {
    name: String
    email: String
    password: String
}
```

Defina as roles padrão para o usuário:

```javascript
// src/auth/users/user-roles.ts

export enum UserRoles{
    PARTNER = 'PARTNER'//Quem cadastra os ingressos
    , USER = 'USER'// Quem compra os ingressos
}

```

Criar usuario

```http
POST http://localhost:3000/users
Content-Type: application/json

{
    "name": "John Doe",
    "email": "test@test.com",
    "password": "123456"
}
```

Implementar hash na senha

```
npm install bcrypt

npm i --save-dev @types/bcrypt
```

```javascript
  generateHash(password: string){
    return bcrypt.hashSync(password,10)
  }
```

Criar usuario, porem esta retornando a senha com hash

```HTTP/1.1 201 Created
{
  "id": 11,
  "name": "John Doe",
  "email": "mardos182@test.com",
  "password": "$2b$10$LuVHtaR/orH7i.GR47ol/O6770lnSvVyszFz9PXhbItnqUF6NtoRu",
  "roles": [
    "PARTNER"
  ],
  "createdAt": "2024-06-15T21:19:43.476Z",
  "updatedAt": "2024-06-15T21:19:43.476Z"
}
```

Para omitir a senha foi criado src/auth/users/user.presenter.ts

```javascript
// src/auth/users/user.presenter.ts

export class UserPresenter {
    constructor(readonly user: User){}

    toJSON(){
        return{
            id: this.user.id,
            email: this.user.email,
            roles: this.user.roles,
            createAt: this.user.createdAt,
            updateAt: this.user.updatedAt
        }
    }

}
```

```
nest g controller auth/admin-users
```

criar rota login

```
nest g controller auth
```

criar serviço autentificação

```
nest g service auth
```

Nest possui base para trabalhar com JWT

```
npm install @nestjs/jwt
```

```POST http://localhost:3000/auth/login
// HTTP/1.1 201 Created
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsIm5hbWUiOiJKb2huIERvZSIsImVtYWlsIjoiY2FzYUB0ZXN0LmNvbSIsInJvbGVzIjpbIlBBUlRORVIiXSwiY3JlYXRlZEF0IjoiMjAyNC0wNi0xNVQyMTo1ODoyOC45NzZaIiwidXBkYXRlZEF0IjoiMjAyNC0wNi0xNVQyMTo1ODoyOC45NzZaIiwiaWF0IjoxNzE4NDg4OTgxLCJleHAiOjE3MTg0OTg5ODF9.vIMkUTk7cdagDVC55zDMbioszJ8GWTO8URWUGd2CLng"
}
```

CRUD do partners

```
nest g resource
```

Proteger controller para somente quem estiver autentificado tenha acesso, intercepta a requisição antes de chegar no metodo

```
nest g guard auth
```

// Observables - rxjs - camada em cima da promise

criar eventos

```
nest g resource
```

gerenciador de tenant

```
nest g module tenant
```

```
nest g service tenant
```

```
nest g interceptor tenant
```

Client ---- request --(inter)--> Controller --(inter)-- response ----> Client

Interceptor é semelhante ao middle

Tres serviços nest
1 - shared service - singleton
2 - scope service | request service
3 - transient service

```javascript
// src/tenant/tenant.service.ts
import { Injectable, Scope } from '@nestjs/common';
import { Partner } from '@prisma/client';

@Injectable({
    scope: Scope.REQUEST
})
export class TenantService {
    private tenant: Partner

    setTenant(tenant: Partner) {
        this.tenant = tenant
    }

    getTenant() {
        return this.tenant
    }
}
```

permissão por usuario

```
nest g guard auth/roles
```

```
nest g decorator auth/roles
```

## Lib Core e multi APP

```bash
nest g library
```

nome: core

## Acessando com: Dev Container

Buscar Ctrl + p:

- > Dev Conteiner: Open Folder in Container...
  > Selecionar o local do arquivo
  > Container Configuration:
- From 'docker-compose.yaml'
  Seleciona serviço principal:
- ->app
- db
  Select Feature:
- ZSH Plugins
- Common Utilities
- Shell History

Acessar .devcontainer

```json
// Arquivo: .devcontainer/devcontainer.json

//Nome do projeto Extend
"name": "nestjs-multitenancy-api (Extend)",
//Local do projeto Extend
"workspaceFolder": "/home/node/app",

//...
"features": {
  "ghcr.io/devcontainers/features/common-utils:2": {},
		"ghcr.io/devcontainers-contrib/features/zsh-plugins:0": {
			"plugins": "git git-flow F-Sy-H zsh-autosuggestions zsh-completions",
			"omzPlugins": "https://github.com/z-shell/F-Sy-H https://github.com/zsh-users/zsh-autosuggestions https://github.com/zsh-users/zsh-completions"
		},
		"ghcr.io/stuartleeks/dev-container-features/shell-history:0": {}
},
//...

//...
 "customizations": {
  "vscode": {
   "extensions": [
    "prisma.prisma",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode"
   ]
  }
 }
//...

```

Corrigir // Arquivo: .devcontainer/docker-compose.yml

```yml
volumes:
  # Update this to wherever you want VS Code to mount the folder of your project
  - .:/home/node/app:cached
## Deixar command comentado
# command: /bin/sh -c "while sleep 1000; do :; done"
```

## Autenticação e Autorização

- Roles: Definição de roles para usuários (PARTNER e USER).
- Guard: Implementação de guards para proteger rotas e garantir que somente usuários autenticados e autorizados possam acessar determinadas funcionalidades.

## Criar e Gerenciar Ingressos

- CRUD de Ingressos: Operações de criação, leitura, atualização e deleção de ingressos.
- Notificações: Envio de notificações para usuários interessados.

## Tecnologias Utilizadas

- NestJS: Framework para construção de aplicações Node.js escaláveis e eficientes.
- Prisma: Ferramenta de ORM e gerenciamento de banco de dados.
- Docker: Containerização para facilitar o desenvolvimento e a implantação.
- MySQL: Sistema de gerenciamento de banco de dados relacional.

## Melhores Práticas

- Injeção de Dependência: Uso de injeção de dependência para melhor modularização e testabilidade.
- Arquitetura de Microsserviços: Permite escalabilidade e independência entre módulos.
- Gerenciamento de Tenants: Implementação de multi-tenancy para suporte a múltiplos clientes/parceiros.

## Próximos Passos

- Implementação de Relatórios: Geração de relatórios de vendas e performance.
- Escalabilidade: Otimização para suportar alta demanda e múltiplos tenants.
- Integração com Outras Plataformas: Integração com serviços de pagamento e redes sociais.

## Recursos Adicionais

- [Documentação NestJS](https://docs.nestjs.com/)
- [Documentação Prisma](https://www.prisma.io/docs)
- [Documentação Docker](https://docs.docker.com/)
- [Tutorial de Microsserviços com NestJS](https://www.youtube.com/watch?v=UWKHcIa-Hjo)
