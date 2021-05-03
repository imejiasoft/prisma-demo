import { v4 as uuidv4 } from "uuid";

const Mutation = {
  createUser: (parent, { data }, { db }, info) => {
    const isEmailTaken = db.users.some((user) => user.email == data.email);
    if (isEmailTaken) {
      throw new Error("Email Taken");
    }

    const user = {
      id: uuidv4(),
      ...data,
    };

    db.users.push(user);

    return user;
  },

  updateUser: (parent, args, { db }, info) => {
    const { id, ...data } = args;

    const user = db.users.find((user) => user.id == id);

    if (!user) {
      throw new Error("User not found");
    }

    const isEmailTaken = db.users.some((user) => user.email == data.email);
    if (isEmailTaken) {
      throw new Error("Email Taken");
    }

    db.users = db.users.map((user) => {
      if (user.id == id) {
        user = { ...user, ...data };
        return user;
      }
      return user;
    });

    return { ...user, ...data };
  },

  createAuthor: (parent, args, { db, pubSub, prisma }, info) => {
    
    const author = {
      id: uuidv4(),
      ...args,
    };

    db.authors.push(author);

    pubSub.publish("author", {
      author: {
        mutation: "CREATED",
        data: author,
      },
    });

    return author;
  },
  createBook: (parent, { data }, { db, pubSub }, info) => {

    const isAuthorExist = db.authors.some(author => author.id == data.writted_by)

    if(!isAuthorExist) {
        throw new Error('Author does not exist')
    }

    const book = {
      id: uuidv4(),
      ...data,
    };

    db.books.push(book);

    pubSub.publish(`book - ${data.writted_by}`, {
      book: {
        mutation: "CREATED",
        data: book,
      },
    });

    return book;
  },
};

export default Mutation;
