import express from 'express';
import config from './db/config.js';
import routes from './routes/app routtes.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//applying jwt
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], config.jwt_secret, (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

routes(app);

app.get('/', (req, res) => {
    res.send('Welcome to wapChat');
});


app.listen(config.port, () => {
    console.log(`Hey Omanyu, your server is running in ${config.url}`);
});