import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { router } from './routes/index';
import bodyParser from 'body-parser';
// import docs from './docs/docs.js';

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

const corsOptions = {
	origin: '*',
};
app.use(cors(corsOptions));
app.use(router);
// app.use(docs);

app.listen(port, () => {
	console.log(`서버가 실행됩니다. http://localhost:${port}`);
});
