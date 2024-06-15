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