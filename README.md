# About

Trabajo practico obligatorio para el curso de Desarrollo NodeJS.
Alumno: Fuentes, Matias Fabian.

## Instalacion

``` npm i ```
``` npm run start ```
``` npm run dev ``` <Desarrollo>

Para utilizar las peticiones POST, PUT, DELETE, es necesario tener un token, que es creado al ingresar con el usuario ADMINISTRADOR. El POST de Logueo y Register no necesitan un token.

Para obtener el x-token es necesario hacer un POST Registro (Registrar un nuevo usuario) con el ```"role":"ADMIN_ROLE"```.
Luego del registro de usuario, hace falta realizar un logueo en POST Login con el ```"email"``` y ```"password"``` registrados anteriormente.
Y recibira un token JWT, que debe de ser insertado en los headers con el nombre de "x-token" en cada peticion.

## Base URL

* http://localhost:3000/home <- Se utiliza para el endpoint> - GET Producto / GET Producto:id
* http://localhost:3000/api <- Se utiliza para la mayoria de los endpoints>
* http://localhost:3000/api/auth/login <- Se utiliza para Loguearse>

## Como obtener un TOKEN

- 1- Realizar una peticion POST Register http://localhost:3000/api/user
- 2- Rellenar los datos.
```
//EXAMPLE
{
    "name": "Matias Fuentes",
    "role": "ADMIN_ROLE",
    "password": "123456",
    "email": "test100@test100.com"
}
// name, email, role, password. OBLIGATORIO.
```
- 3- Al recibir un status 200, se ha realizado correctamente el registro en la DB.
- 4- Luego realizar una peticion POST Login http://localhost:3000/api/auth/login
- 5- Rellenar los datos
```
{
    "email": "test100@test100.com",
    "password": "123456"
}
```
- 6- Al recibir un status 200, en el body recibiras un "token"
```
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDQ3ZDk2M2RkNTIzNjhlN2ZlMDgyNzMiLCJpYXQiOjE2ODI0NTQ1NzQsImV4cCI6MTY4MjQ1ODE3NH0._2xISAJd8OHkMBAbs1Gwt6RQk_JTdARRIlqh4G4R2XM"
```
- 7- Con este token en necesario insertarlo en los HEADERS con el nombre de ```x-token``` para poder realizar peticiones POST, PUT, DELETE.

## GET
Todos los GET retornan un JSON. 

* GET PRODUCTO. http://localhost:3000/home
* GET PRODUCTO ID. http://localhost:3000/home/:id
```
{
    "_id": STRING,
    "nombre": STRING,
    "usuario": {
        "_id": STRING,
        "name": STRING
    },
    "precio"?: NUMBER,
    "description"?: STRING,
    "categoria": STRING,
    "stock"?: BOOLEAN,
    "codigo"?: NUMBER
}
// nombre, categoria. OBLIGATORIO.
// _id, usuario. Se genera automaticamente al crearse.
// precio, stock. Valores opcionales, tienen un valor por default.
// codigo. Valor opcional, se genera uno random por default
// description. Valor opcional
```

* GET CATEGORIA. http://localhost:3000/api/category
* GET CATEGORIA ID. http://localhost:3000/api/category/:id
```
{
    "_id": STRING,
    "nombre": STRING,
    "usuario": {
        "_id": STRING,
        "name": STRING
    }
}
// nombre. OBLIGATORIO
// _id, usuario. Se genera automaticamente al crearse.
```


* GET USUARIOS. http://localhost:3000/api/user
```
{
    "name": STRING,
    "email": STRING,
    "role": STRING,
    "status"?: BOOLEAN,
    "googleSync"?: BOOLEAN,
    "uid": STRING
}
// name, email, role, password. OBLIGATORIO.
// uid, usuario. Se genera automaticamente al crearse.
// status, googleSync. Valores opcionales, tienen un valor por default.
```

## POST

* POST Category http://localhost:3000/api/category
* POST Registro http://localhost:3000/api/user
* POST Login http://localhost:3000/api/auth/login
* POST Producto http://localhost:3000/home

## PUT

* PUT Actualizar Usuario http://localhost:3000/api/user
* PUT Category http://localhost:3000/api/category
* PUT Producto http://localhost:3000/home

## DELETE

* DELETE Usuario http://localhost:3000/api/user
* DELETE Category http://localhost:3000/api/category
* DELETE Producto http://localhost:3000/home