import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import BookModel from '../models/BookModel';

const createBook = (req: Request, res: Response, next: NextFunction) => {
  const { title, author } = req.body;

  const book = new BookModel({
    _id: new mongoose.Types.ObjectId(),
    title,
    author
  });

  return book
    .save()
    .then((book) => res.status(201).json({ book }))
    .catch((error) => res.status(500).json({ error }));
};

const readBook = (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  return BookModel.findById(bookId)
    .populate('author')
    .select('-__v')
    .then((book) => (book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Not Found' })))
    .catch((error) => res.status(500).json({ error }));
};

const readAllBook = (req: Request, res: Response, next: NextFunction) => {
  return BookModel.find()
    .populate('author')
    .select('-__v')
    .then((books) => res.status(200).json({ books }))
    .catch((error) => res.status(500).json({ error }));
};

const updateBook = (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  return BookModel.findById(bookId)
    .then((book) => {
      if (book) {
        book.set(req.body);

        return book
          .save()
          .then((book) => res.status(201).json({ book }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: 'Not Found' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
const deleteBook = (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  return BookModel.findByIdAndDelete(bookId)
    .then((book) => (book ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not Found' })))
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createBook,
  readAllBook,
  readBook,
  updateBook,
  deleteBook
};
