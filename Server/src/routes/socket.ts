import { Socket } from "dgram";
import { FastifyInstance, FastifyPluginCallback, FastifyPluginOptions, FastifyRequest } from "fastify";
import { RouteOptions, SocketStream } from "fastify-websocket";
import { RouteGenericInterface } from "fastify/types/route";
import { chatModel, mongoose,userModel } from "../connection";
import { chatDocument } from "../Models/Chat";
import { userDocument } from "../Models/User";
interface user {
    id: string,
    connection: SocketStream
}

interface Message {
    id: string,
    recipient: string,
    message: string,
    time: Date
}

interface RequestInterface extends RouteGenericInterface {
    Body: {
        id: string,
        new?: boolean,
        message?: string
    }
}

const findConnectionIndex = function(connections: user[],value: string): number {
    for(let i=0;i<connections.length;i++) {
        if(connections[i].id == value) return i;
    }
    return connections.length;
};

const findConnection = function(connections: user[], value: string): user | null {
    let ind = findConnectionIndex(connections,value);
    return (ind == connections.length)? null : connections[ind];
}

let connections: user[] = [];
//TODO test socket.ts
const plugin: FastifyPluginCallback 
= function(fastify: FastifyInstance, options: FastifyPluginOptions, next) {

    fastify.register(require('fastify-websocket'));

    fastify.post('/', { websocket: true},
    (connection: SocketStream, req: FastifyRequest<RequestInterface>) => {
        connection.socket.on("initiate",async (body: user) => {
            connections.push({
                id: body.id,
                connection: connection
            })
            await userModel.findById(mongoose.Types.ObjectId(body.id))
            .update({active: true}, (err: any) => {
                console.log(`socket user update error for ${body.id} : ${err}`);
            });
        });

        connection.socket.on("message",(message: Message) => {
            let curId = mongoose.Types.ObjectId(message.id);
            let recipientId = mongoose.Types.ObjectId(message.recipient);
            let recipients = (message.id < message.recipient)?
                [curId, recipientId] : [recipientId, curId];
            chatModel.findOne({ recipient: recipients})
            .then(async (doc: chatDocument | null) => {
                if(typeof doc == null) throw {ERR: "incorrect recipient"};
                else {
                    let recipient = findConnection(connections,message.recipient);
                    let msg = {
                        text: message.message,
                        sender: (recipients[1].equals(curId)),
                        time: message.time
                    };
                    doc?.messages?.push(msg);
                    await doc?.save(); //TODO callback not handled
                    if(recipient != null) recipient?.connection.socket.send(msg);
                }
            })
            .catch((err) => {
                connection.socket.send(err);
            });
        });

        connection.socket.on("disconnect", (body: user) => {
            connections.splice(findConnectionIndex(connections, body.id),1);
            userModel.findByIdAndUpdate(mongoose.Types.ObjectId(body.id), {active: false})
            .then(async (doc: userDocument | null) => {
                if(doc == null) throw 400;
                doc.active = false;
                await doc.save(); //TODO callback  not handled
            })
            .catch((err) => {
                console.log(`socket disconnect error for ${body.id} : ${err}`);
            });
        });
    });


    next();
}

export default plugin;