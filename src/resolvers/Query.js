const Query = {
    hello : (parent, args, ctx, info) => {
        const { name } = args;
        return `Hello ${name || 'word'}`
    },
    quantity : () => 1,

    user: (parent, { id }, ctx, info) => { 
        const { db } = ctx;
        if(!id) {
            return db.users;
        }
        return db.users.filter(user => user.id == id);
    },
    author: (parent, { id }, { prisma }, info) => { 
        if(!id) {
            return prisma.authors.findMany();
        }
        return prisma.authors.findOne({
            where : {
                id,
            }
        })
    },
    book: (parent, { id }, { db }, info) => { 
        if(!id) {
            return db.books;
        }
        return db.books.filter(w => w.id == id);
    },
}

export default Query;