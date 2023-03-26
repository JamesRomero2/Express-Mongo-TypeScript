import express from 'express';
import AuthorController from '../controllers/AuthorController';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.author.create), AuthorController.createAuthor);
router.get('/get/:authorId', AuthorController.readAuthor);
router.get('/get/', AuthorController.readAllAuthor);
router.patch('/update/:authorId', ValidateSchema(Schemas.author.update), AuthorController.updateAuthor);
router.delete('/delete/:authorId', AuthorController.deleteAuthor);

export = router;
