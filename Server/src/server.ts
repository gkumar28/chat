import { fastify } from 'fastify';
import userPlugin from './routes/user';
import chatPlugin from './routes/chat';
const PORT = process.env.PORT || 8000;
export const server = fastify({  //TODO export connection -> models -> routes
    logger: true,
});

server.register(userPlugin, {
    prefix: '/api/users'
});

server.register(chatPlugin, {
    prefix: '/api/chat'
})

async function start(): Promise<void> {
    try {
        await server.listen(PORT);
    }
    catch(err) {
        server.log.error(err);
        process.exit(1);
    }
}

start();