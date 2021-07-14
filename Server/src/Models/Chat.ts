import { time } from "console";
import { Document, Schema } from "mongoose";

interface chatInterface {
    recipient?: [string],
    messages?: [{
        text: string,
        sender: boolean,
        time: Date
    }]
}

interface chatDocument extends Document, chatInterface { }

function recipientLimit(val: Array<number>): boolean {
    return val.length == 2;
}

const chatScheme = new Schema<chatInterface>({
    recipient: {
        type: [String],
        validate: [recipientLimit, '{PATH} should have length 2'],
        required: true
    },
    messages: [{
        text: { type: String },
        sender: { type: Boolean },
        time: { type: Date, default: Date.now() }
    }]
});

export {chatScheme, chatInterface, chatDocument};