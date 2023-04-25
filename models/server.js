const express = require('express');
const cors = require('cors');
const authRoutes = require('../routes/auth');
const userRoutes = require('../routes/user');
const categoriesRoutes = require('../routes/categories');
const productsRoutes = require('../routes/products');
const { } = require('../database/config');
const dbConnection = require('../database/config');

    class Server {

        constructor() {
            this.app = express();
            this.port = process.env.PORT;
            this.path = {
                auth: '/api/auth',
                user: '/api/user',
                product: '/home',
                category: '/api/category'
            }
            // DB Conection
            this.dataBaseConnection();

            //Middlewares
            this.middlewares();

            //Routes
            this.routes();
        }

        async dataBaseConnection() {
            await dbConnection()
        }

        middlewares() {
            this.app.use( express.static('public') );
            this.app.use( cors() );
            this.app.use( express.json());
        }

        routes() {
            
            this.app.use(this.path.auth, authRoutes);
            this.app.use(this.path.user, userRoutes);
            this.app.use(this.path.product, productsRoutes);
            this.app.use(this.path.category, categoriesRoutes);

        }

        listen() {
            this.app.listen( this.port, () => {
                console.log('Listening in PORT ', this.port)
            })
        }

}

module.exports =
    Server