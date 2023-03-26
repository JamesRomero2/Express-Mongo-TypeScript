import express from 'express';
import BookController from '../controllers/BookController';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.book.create), BookController.createBook);
router.get('/get/:bookId', BookController.readBook);
router.get('/get/', BookController.readAllBook);
router.patch('/update/:bookId', ValidateSchema(Schemas.book.update), BookController.updateBook);
router.delete('/delete/:bookId', BookController.deleteBook);

export = router;
