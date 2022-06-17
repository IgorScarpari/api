const Book = require("../models/book");

//GET: Search all books.
exports.findAll = async (req, res) => {
    try {
        const books = await Book.find({
            order: [["name", "ASC"]],
            raw: true,
        });
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//GET: Search books by id receive.
exports.findOne = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findOne({ _id: id });

        if (!!book) {
            res.json(book);
        } else {
            res.status(404).json({ error: "Book not found." })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

//POST: Insert a book.
exports.create = async (req, res) => {
    const book = req.body;
    if (Book.findOne({ title: book.title, author: book.author })) {
        res.status(404).json({ error: "Book is already registered." })
    } else {
        return Book.create()
            .then((book) => {
                return res.status(201).send({
                    message: 'Book uploaded successfully',
                    book
                });
            })
            .catch(error => res.status(500).send(error));
    }
};

//PUT: Update book data.
exports.update = async (req, res) => {
    const { id } = req.params;
    try {
        const updateBook = await Book.updateOne({ _id: id }, req.body);
        res.json({ success: !!updateBook });
    } catch (err) {
        res.status(500).json({ error: "Book not found." });
    }
};

//DELETE: Remove book data.
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await Book.deleteOne({ _id: id });

        res.json({ success: !!deletedBook });
    } catch (err) {
        res.status(500).json({ error: "Book not found." });
    }
}; 