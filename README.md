
# Food Explorer

O Food Explorer é um cardápio digital de restaurante. O administrador pode criar, editar ou excluir novos pratos, o usuário pode visualizar detalhes dos pratos e os adicionar a um carrinho. 

## Acesse

- App
  https://myfoodexplorer.vercel.app/

- Deploy backend
  https://foodexplorer-api-9wdp.onrender.com

![App Screenshot](https://i.imgur.com/GWE175c.png)


#### 🔑 Utilize a conta abaixo para ver a aplicação do ponto de vista do admin

```bash
  e-mail: admin@foodexplorer.com
  senha: 123456
```


## 🚀 Tecnologias:

- NodeJS
- JavaScript
- Express
- Knex


## Endpoints

```bash
/plates #get => lista todos os pratos | post => cria pratos
/plates/:id #get => busca um prato pelo id
/plates/:id #delete => deleta um prato
/plates/:id #put => atualiza um prato
/session #post => cria uma sessão
/users  #post => cria um usuário
```

## Documentação de funcionamento

Clone o projeto

```bash
  git clone https://github.com/helomafra/foodExplorer-api.git
```

Crie um arquivo .env com os dados:

```bash
AUTH_SECRET
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm start
```





