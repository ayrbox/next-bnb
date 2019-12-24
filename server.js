const express = require('express');
const next = require('next');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const User = require('./model.js').User
const sequelize = require('./model.js').sequelize

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });

const handler = nextApp.getRequestHandler();






nextApp.prepare().then(() => {
    const server = express();
    const sessionStore = new SequelizeStore({
        db: sequelize
    })
    // sessionStore.sync(); 
    server.use(
        session({
            secret: 'asdi2u3j0wd87vlq2i307',
            resave: false,
            saveUninitialized: true,
            name: 'nextbnb',
            cookie: {
                secure: false,
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
            },
            store: sessionStore,
        })
    );


    server.all('*', (req, res) => {
        return handler(req, res);
    });

    server.listen(port, err => {
        if(err) throw err;
        console.log(`Ready on http://localhost:${port}`);
    });
});

