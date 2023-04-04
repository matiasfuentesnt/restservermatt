const express = require('express');
const cors = require('cors');
const authRoutes = require('../routes/auth');
const userRoutes = require('../routes/user');
const { } = require('../database/config');
const dbConnection = require('../database/config');

    class Server {

        constructor() {
            this.app = express();
            this.port = process.env.PORT;
            this.usersRoutePath = '/api/user';
            this.authRoutePath = '/api/auth';
            
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
            
            this.app.use(this.authRoutePath, authRoutes);
            this.app.use(this.usersRoutePath, userRoutes);

        }

        listen() {
            this.app.listen( this.port, () => {
                console.log('Listening in PORT ', this.port)
            })
        }

}

module.exports =
    Server