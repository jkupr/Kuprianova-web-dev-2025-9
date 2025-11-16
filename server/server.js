import jsonServer from 'json-server';
import cors from 'cors';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);
server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`JSON Server запущен на http://localhost:${PORT}`);
    console.log(`API блюд: http://localhost:${PORT}/dishes`);
    console.log(`API заказов: http://localhost:${PORT}/orders`);
});