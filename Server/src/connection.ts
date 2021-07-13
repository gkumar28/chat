//import { connect } from "mongodb";
import { Mongoose } from "mongoose";
import { chatDocument, chatScheme } from "./Models/Chat";
import { userScheme, userDocument } from "./Models/User";

const uri = 'mongodb://localhost:27017/chat';
const mongoose = new Mongoose();

mongoose.connect(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('connection established');
})
.catch((err) => {
    console.log(err);
});

mongoose.connection.on('error', (err) => {
    console.log(err);
});

process.on('uncaughtException', (err) => {
    console.log(err);
    mongoose.disconnect();
});

const chatModel = mongoose.model<chatDocument>('chat',chatScheme);
const userModel = mongoose.model<userDocument>('user',userScheme);

export {mongoose, userModel, chatModel};
//TODO check if multiple models work with connect