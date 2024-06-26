
# Food Explorer

The Food Explorer is a digital restaurant menu. The administrator can create, edit, or delete new dishes, and the user can view dish details and add them to a cart.

## Access here

- [Explore the site](https://myfoodexplorer.vercel.app)
- [Backend deploy](https://foodexplorer-api-9wdp.onrender.com)
  

![App Screenshot](https://i.imgur.com/GWE175c.png)


#### 🔑 Use the account below to view the application from the admin's perspective.

```bash
  e-mail: admin@foodexplorer.com
  senha: 123456
```


## 🚀 Technologies

- NodeJS
- JavaScript
- Express
- Knex


## Endpoints

```bash
/plates #get => lists all mels | post => create a meal
/plates/:id #get => retrieves a meal by id
/plates/:id #delete => deletes a meal
/plates/:id #put => updates a meal
/session #post => creates a session
/users  #post => creates a user
```

## Run project

Clone the project

```bash
  git clone https://github.com/helomafra/foodExplorer-api.git
```


Create a .env file with

```bash
AUTH_SECRET
```

Install the dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```





