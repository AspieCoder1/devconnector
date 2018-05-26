const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

mongoose.connect(db).then(() => {
	console.log('MongoDB connected');
}).catch(e => {
	console.log(`MongoDB error: ${e}`);
});

app.get('/', (req, res) => res.send('Hello!'));

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}`));