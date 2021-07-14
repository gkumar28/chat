import { userModel } from "../connection"; 
import FastifyPlugin from 'fastify-plugin';
import { FastifyInstance, FastifyPluginCallback, FastifyPluginOptions, FastifyRequest, FastifyReply, FastifySchema, RequestGenericInterface } from "fastify";
import { userInterface, userDocument } from "../Models/User";

interface ReqQuery {
    id?: string,
    username?: string,
    email?: string
};

interface RequestInterface extends RequestGenericInterface {
    Querystring: ReqQuery,
    Body: userInterface
}

interface RequestUpdateInterface extends RequestGenericInterface {
    Body: userInterface & { search: userInterface }
}

const responseSchema: FastifySchema = {
    response: {
        '2xx': {
            type: 'object',
            _id: 'string'
        }
    }
}

const sendData = function(reply: FastifyReply, code: number, data: any = undefined) {
    reply.code(code);
    reply.send(data);
}


const plugin: FastifyPluginCallback 
    = function(fastify: FastifyInstance, options: FastifyPluginOptions, next) {

    fastify.get('/',{ 
        schema: {
            querystring: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    FirstName: { type: 'string' },
                    LastName: { type: 'string' },
                    FullName: { type: 'string' },
                    username: { type: 'string' },
                    email: { type: 'string' }
                }
            },
            response: responseSchema
        } 
    },  
    (req: FastifyRequest<RequestInterface>, reply: FastifyReply) => {
        userModel.find(req.query).limit(20)
            .then((docs) => {
                if(docs.length > 0) sendData(reply, 200, docs);
                else throw 404;
            })
            .catch((err: number): void => {
                sendData(reply,err);
            });
    });

    fastify.post('/', { 
        schema: {
            body: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    FirstName: { type: 'string' },
                    LastName: { type: 'string' },
                    FullName: { type: 'string' },
                    username: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' }
                }
            }
        } 
    },
    (req: FastifyRequest<RequestInterface>, reply: FastifyReply): void => {
        userModel.exists({$or: [{ username: req.body.username }, { email: req.body.email}]})
            .then(async (res: boolean): Promise<any> => {
                if(res) {
                    throw {
                        statusCode: 400,
                        data: { message: "user already exists" }
                    };
                }
                else {
                    return await userModel.create(req.body).catch((err) => { throw err; });  
                }
            })
            .then((data): void => {
                sendData(reply, 200, data);
            })
            .catch((err: any) => { 
                console.log(`userModel check & save error: ${err}`) 
                sendData(reply,400);
            });
    });

    //TODO complete /user PUT and DELETE request
    fastify.put('/',
    (req: FastifyRequest<RequestUpdateInterface>, reply: FastifyReply): void => {
        userModel.find(req.body.search)
        .then((docs: userDocument[]) => {
            let statusCode: number = 200, data: any = undefined;
            if(docs.length > 1) {
                statusCode = 400;
                data = { message: "Oops! looks like " };
            }
            else {
                for (let key in req.body) {

                }
            }
        })
        .catch((err): void => {
            console.log(`Mongoose Find Error: ${err}`);
            sendData(reply,500);
        })
    });

    next();

}

export default plugin;
