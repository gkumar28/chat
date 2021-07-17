import { fastify } from 'fastify';
import userPlugin from './routes/user';
import chatPlugin from './routes/chat';
import socketPlugin from './routes/socket';
import sessionPlugin from './routes/session';
const PORT = process.env.PORT || 8000;
export const server = fastify({  //TODO export connection -> models -> routes
    logger: true,
});

server.register(sessionPlugin, {
    prefix: '/api/session'
})

server.register(userPlugin, {
    prefix: '/api/users'
});

server.register(chatPlugin, {
    prefix: '/api/chat'
})

server.register(socketPlugin, {
    prefix: '/api/messages'
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