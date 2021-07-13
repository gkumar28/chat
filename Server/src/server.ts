import { fastify } from 'fastify';
import plugin from './routes/user';
const PORT = process.env.PORT || 8000;
export const server = fastify({  //TODO export connection -> models -> routes
    logger: true,
});

server.register(plugin, {
    prefix: '/api/users'
});

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