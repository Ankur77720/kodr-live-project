const mongoose = require('mongoose');


function connect() {
    mongoose.connect('mongodb://localhost:27017/kodr-live-project')
        .then(() => {
            console.log('Connected to the database');
        })
        .catch((error) => {
            console.log('Error connecting to the database');
            console.log(error);
        });
}

module.exports = connect;