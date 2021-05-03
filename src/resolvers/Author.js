const Author = {
    register_by: (parent, _, { db}, __) => {
        return db.users.find(user => user.id == parent.register_by);
    },
    books: (parent, _, { db}, __) => {
        return db.books.filter(book => book.writted_by == parent.id);
    }
}

export default Author;