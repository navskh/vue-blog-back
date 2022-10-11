import express from 'express';
import cors from 'cors';
import Router from './routes/index.js';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

const corsOptions = {
	origin: '*',
};
app.use(cors(corsOptions));
app.use(Router);

app.listen(port, () => {
	console.log(`서버가 실행됩니다. http://localhost:${port}`);
});
