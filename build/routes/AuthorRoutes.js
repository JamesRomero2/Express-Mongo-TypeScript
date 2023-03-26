"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const AuthorController_1 = __importDefault(require("../controllers/AuthorController"));
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const router = express_1.default.Router();
router.post('/create', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.author.create), AuthorController_1.default.createAuthor);
router.get('/get/:authorId', AuthorController_1.default.readAuthor);
router.get('/get/', AuthorController_1.default.readAllAuthor);
router.patch('/update/:authorId', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.author.update), AuthorController_1.default.updateAuthor);
router.delete('/delete/:authorId', AuthorController_1.default.deleteAuthor);
module.exports = router;
