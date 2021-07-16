import { FastifyPluginCallback, FastifyPluginOptions, FastifyInstance, FastifyRequest, FastifyReply, RequestGenericInterface } from "fastify";
import { userModel } from "../connection";
import { userDocument } from "../Models/User";

interface login {
    username: string,
    password: string
}

interface RequestInterface extends RequestGenericInterface {
    Body: login
}

const sendData = function(reply: FastifyReply, code: number, data: any = undefined) {
    reply.code(code);
    reply.send(data);
}

const plugin: FastifyPluginCallback 
= function(fastify: FastifyInstance, options: FastifyPluginOptions,next) {

    fastify.post('/', {
        schema: {
            body: {
                additionalProperties: false,
                required: ['username','password'],
                properties: {
                    username: {type: 'string'},
                    password: {type: 'string'}
                }
            },
            response: {
                '2xx': {
                    additionalProperties: false,
                    properties: {
                        id: {type: 'string'}
                    }
                }
            }
        }
    },(req: FastifyRequest<RequestInterface>,reply: FastifyReply) => {
        userModel.findOne({username: req.body.username})
        .then((doc: userDocument | null): void | Promise<void> => {
            if(doc == null || doc?.password != req.body.password) throw 400;
            else sendData(reply, 200, {id: doc._id});
        })
        .catch((code) => {
            sendData(reply, code);
        })
    });

    next();

}

export default plugin;