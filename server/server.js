const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const helmet = require('helmet');
const path = require('path');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

mongoose
	.connect(db)
	.then(() => {
		console.log('MongoDB connected');
	})
	.catch(e => {
		console.log(`MongoDB error: ${e}`);
	});

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

if (proccess.env.NODE_ENV) {
	express.use(express.static(path.join(__dirname, '../client/build')));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../client/build/index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}`));
