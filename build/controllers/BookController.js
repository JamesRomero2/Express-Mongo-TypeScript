"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BookModel_1 = __importDefault(require("../models/BookModel"));
const createBook = (req, res, next) => {
    const { title, author } = req.body;
    const book = new BookModel_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        title,
        author
    });
    return book
        .save()
        .then((book) => res.status(201).json({ book }))
        .catch((error) => res.status(500).json({ error }));
};
const readBook = (req, res, next) => {
    const bookId = req.params.bookId;
    return BookModel_1.default.findById(bookId)
        .populate('author')
        .select('-__v')
        .then((book) => (book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Not Found' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAllBook = (req, res, next) => {
    return BookModel_1.default.find()
        .populate('author')
        .select('-__v')
        .then((books) => res.status(200).json({ books }))
        .catch((error) => res.status(500).json({ error }));
};
const updateBook = (req, res, next) => {
    const bookId = req.params.bookId;
    return BookModel_1.default.findById(bookId)
        .then((book) => {
        if (book) {
            book.set(req.body);
            return book
                .save()
                .then((book) => res.status(201).json({ book }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'Not Found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteBook = (req, res, next) => {
    const bookId = req.params.bookId;
    return BookModel_1.default.findByIdAndDelete(bookId)
        .then((book) => (book ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not Found' })))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = {
    createBook,
    readAllBook,
    readBook,
    updateBook,
    deleteBook
};
