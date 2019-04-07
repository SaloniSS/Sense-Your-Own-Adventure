import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import parser from './parser';

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const connectWithRetry = () => {
	return mongoose.connect('mongodb://mongo:27017/rooms', { useNewUrlParser: true }, (err) => {
		if (err) {
			console.error('\nFailed to connect to mongo on startup - retrying in 5 sec\n', err, '\n');
			setTimeout(connectWithRetry, 5000);
		} else {
			console.error('Connected to mongo\n');

			app.use('/', parser);

		}
	});
};
connectWithRetry();

module.exports = app;