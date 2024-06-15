# Aplicações multi tenancy com Nest.js

https://www.youtube.com/watch?v=UWKHcIa-Hjo

// MVC
// Container de injeções
// kebab-case = artefato (controller, service, )

// parceiros entrem na plataforma e divuguem os eventos, tenant são as empresas(parceiros) que possuem varios usuario

autentificação


```
nest g module auth
```


```
nest g controller auth/users
```


```
nest g service auth/users
```

// banco de dados
```
npx prisma
```

```
npx prisma init
```

Rodar banco mysql com docker

Entrar container do banco de dados
```
docker compose exec db bash
```

```
mysql -uroot -proot
```

```
npx prisma migrate dev
```

Integrar prisma com nestjs

```
nest g module prisma
```

Criar service para configurar conexão
```
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
  providers: [UsersService]
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
  exports: [PrismaService]
})
export class PrismaModule {}
```

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

Criar roles padrão para User
```javascript
// src/auth/users/user-roles.ts

export enum UserRoles{
    PARTNER = 'PARTNER'//Quem cadastra os ingressos
    , USER = 'USER'// Quem compra os ingressos
}

```