import { time } from "console";
import { Document, Schema } from "mongoose";

interface chatInterface {
    recipients: [string],
    messages: [{
        text: string,
        sender: boolean,
        time: Date
    }]
}

interface chatDocument extends Document { }

function recipientLimit(val: number): boolean {
    return val == 2;
}

const chatScheme = new Schema<chatInterface>({
    recipients: [{
        type: String,
        validate: [recipientLimit, "{PATH} does not match the limit of 2"]
    }],
    messages: [{
        text: { type: String },
        sender: { type: Boolean },
        time: { type: Date, default: Date.now() }
    }]
});

export {chatScheme, chatInterface, chatDocument};