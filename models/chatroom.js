const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://anjalivp92:astrosat@cluster0.hl0trq4.mongodb.net/ChatDb?retryWrites=true&w=majority')
.then(() => {
    console.log("chatroom mongodb connected");
});


const Schema = mongoose.Schema;

const chatroomSchema = new Schema({
    username: {type: String},
    email: {type: String, unique: true},
    message: {type: String},
    created_at: {type:Number, default: Date.now().valueOf()},
    updated_at: {type:Number, default: Date.now().valueOf()}

})

module.exports = mongoose.model('Chatroom', chatroomSchema);