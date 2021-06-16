function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  return books.reduce((checkedOut, book) => {
    if(!book.borrows[0].returned) {
      checkedOut++ 
    } return checkedOut;
  }, 0);
}

function getMostCommonGenres(books) {
  let mostPopular = [];
  books.forEach((book) => {
    mostPopular.push({ name: book.genre, count: book.genre++})
  })
  return mostPopular
}

function getMostPopularBooks(books) {
  const popBookList = [];
  for(let item in books) {
    const book = books[item];
    const name = book.title;
    const borrows = book.borrows;
    const count = borrows.length;
    const newObj = {name, count};
  }
  const sortPopBooks = popBookList.sort((bookA, bookB) => {
    return bookB.count - bookA.count;
  });
  return sortPopBooks.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const popAuthor = []
  for(let i = 0; i < authors.length; i++) {
    const authorObj = {
      name: authors[i].name.first + " " + authors[i].name.last, count: 0
    };
    for(let j = 0; j < books.length; j++) {
      if(book[j].authorid === author[i].id) {
        authorObj.count += books[j].borrows.length
      }
    }
    returnArray.push(authorObj);
  }
  returnArray.sort((a, b) => b.count - a.count)
  return returnArray.slice(0, 5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
