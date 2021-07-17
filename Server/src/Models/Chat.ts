import { Document, Schema } from "mongoose";

interface chatInterface {
    recipient?: [Object],
    messages?: [{
        text: string,
        sender: boolean,
        time: Date
    }]
}

interface chatDocument extends Document, chatInterface { }

function recipientLimit(val: Array<Schema.Types.ObjectId>): boolean {
    return val.length == 2;
}

function recipientComp(val: Array<Schema.Types.ObjectId>): boolean {
    return val[0].toString() < val[1].toString();
}

const chatScheme = new Schema<chatInterface>({
    recipient: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }],
        validate: [
            { validator: recipientLimit, msg:'{PATH} should have length 2'}, 
            { validator: recipientComp, msg:'{PATH} has objectIds in wrong order'}],
        required: true
    },
    messages: [{
        text: { type: String },
        sender: { type: Boolean },
        time: { type: Date, default: Date.now() }
    }]
});

export {chatScheme, chatInterface, chatDocument};