"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const AuthorRoutes_1 = __importDefault(require("./routes/AuthorRoutes"));
const BookRoutes_1 = __importDefault(require("./routes/BookRoutes"));
const router = (0, express_1.default)();
mongoose_1.default
    .connect(config_1.config.mongo.uri, { retryWrites: true, w: 'majority' })
    .then(() => {
    console.log('Connected');
    startServer();
})
    .catch((error) => {
    console.log(error);
});
const startServer = () => {
    router.use((req, res, next) => {
        console.log(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            console.log(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    // RULES OF API
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    // ROUTES
    router.use('/author', AuthorRoutes_1.default);
    router.use('/book', BookRoutes_1.default);
    // HEALTH CHECK
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));
    // ERROR HANDLING
    router.use((req, res, next) => {
        const error = new Error('Not Found');
        console.log(error);
        return res.status(404).json({ message: error.message });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => console.log(`SERVER IS RUNNING ON PORT ${config_1.config.server.port}`));
};
