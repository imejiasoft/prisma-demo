const Subscription = {
  count: {
    subscribe(parent, args, { pubSub }, info) { }
  },

  author: {
      subscribe(parent, args, {pubSub}, info) {
          return pubSub.asyncIterator('author')
      }
  },
  book: {
      subscribe(parent, { authorId }, { db, pubSub}, info) {
        return pubSub.asyncIterator(`book - ${authorId}`)
      }
  }


  
};

export default Subscription;
