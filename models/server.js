const express = require('express');
const cors = require('cors');
const userRoutes = require('../routes/user')

    class Server {

        constructor() {
            this.app = express();
            this.port = process.env.PORT;
            this.usersRoutePath = '/api/user'

            //Middlewares
            this.middlewares();

            //Routes
            this.routes();
        }

        middlewares() {
            this.app.use( express.static('public') );
            this.app.use( cors() );
            this.app.use( express.json())
        }

        routes() {
            
            this.app.use(this.usersRoutePath, userRoutes)

        }

        listen() {
            this.app.listen( this.port, () => {
                console.log('Listening in PORT ', this.port)
            })
        }

}

module.exports =
    Server