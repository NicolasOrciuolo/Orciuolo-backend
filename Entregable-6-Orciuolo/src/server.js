import http from 'http';
import app from './app.js'

// import { init } from './socket.js'

import { init } from './db/mongodb.js'

await init();

const server = http.createServer(app);
const PORT = 8080;

init(server);

server.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT} 🚀`);
});






