const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://anjalivp92:astrosat@cluster0.hl0trq4.mongodb.net/ChatDb?retryWrites=true&w=majority')
.then(() => {
    console.log("mongodb connected");
});


const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String},
    email: {type: String, unique: true},
    password: {type: String, required: true},

})

module.exports = mongoose.model('User', userSchema);