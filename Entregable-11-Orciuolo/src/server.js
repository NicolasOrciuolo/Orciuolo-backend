import http from 'http';
import app from './app.js'
import config from "./config/config.js"

import { initSocket } from './socket.js'
import { init } from './db/mongodb.js'

await init();

const server = http.createServer(app);
initSocket(server);

const PORT = config.port;

server.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}/login 🚀`);
});






