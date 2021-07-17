import { chatInterface } from "../Models/Chat";
import { mongoose, chatModel } from "../connection";
import { FastifyInstance ,FastifyRequest, FastifyReply, FastifySchema, FastifyPluginOptions, RequestGenericInterface, FastifyPluginCallback } from "fastify";

interface RequestInterface extends RequestGenericInterface {
    Querystring: chatInterface
    Body: chatInterface
}

const sendData = function(reply: FastifyReply, code: number = 200,data: any = undefined) {
    reply.code(code);
    reply.send(data);
}

const responseSchema: FastifySchema = {
    response: {
        200: {
            type: 'object',
            additionalProperties: false,
            properties: {
                message: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            text: { type: 'string' },
                            sender: { type: 'boolean' },
                            time: { type:'object' }
                        }
                    }
                }
            }
        }
    }
}

const plugin: FastifyPluginCallback 
    = function(fastify: FastifyInstance, options: FastifyPluginOptions, next) {
        
        fastify.get('/', {
            schema: {
                querystring: {
                    recipient: {
                        type: 'array',
                        items: { type:'string' },
                        maxItems: 2,
                        minItems: 2
                    }
                },   
                response: responseSchema
            }
        },
        (request: FastifyRequest<RequestInterface>, reply: FastifyReply) => {
            chatModel.findOne(request.query)
            .then((data) => {
                if(data == null) throw 404;
                sendData(reply, 200, data);
            })
            .catch((err) => {
                sendData(reply, err, { message: "chats not found" });
            });
        });   

        fastify.post('/', {
            schema: {
                body: {
                    properties: {
                        recipient: {
                            type: 'array',
                            items: { type: 'string' }
                        }
                    }
                }
            }
        },
        (req: FastifyRequest<RequestInterface>, reply: FastifyReply) => {
            console.log(req.body);
            chatModel.exists({ recipient: req.body.recipient })
            .then(async (res: boolean): Promise<any> => {
                if(!res) return await chatModel.create({ recipient: req.body.recipient});
                else return Promise.resolve({message: "already exists"});
            })
            .then((data): void => {
                sendData(reply, 201, data);
            })
            .catch((err) => {
                console.log(`chat doc save error: ${err}`);
                sendData(reply, 400, err);
            });
        });

        next();
    };

    export default plugin;
