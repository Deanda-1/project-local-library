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
  const bookGenres = books.map((book) => book.genre);
  const temp = [];
  bookGenres.map((genre) => {
    const genreLocation = temp.findIndex((element) => element.name === genre);
    if (genreLocation >= 0) {
      temp[genreLocation].count = temp[genreLocation].count + 1;
    } else {
      temp.push({ name: genre, count: 1});
    }
  });
  temp.sort((a, b) => b.count - a.count);
  if (temp.length > 5) {
    return temp.slice(0, 5);
  }
  return temp;
}

function getMostPopularBooks(books) {
  let reduBooks = books.reduce((acc, book) => {
    if(acc[book.borrows]) {
      acc[book.borrows].count++
    } else {
      acc[book.borrows] = {name: book.title, count: book.borrows.length}
    }
    return acc;
  },{});
  const mappedBooks = Object.keys(reduBooks).map((title) =>
  reduBooks[title]
  )
  const popBooks = mappedBooks.sort((genA, genB) =>
  genA.count < genB.count ? 1 : -1);
  return _slicer(popBooks);
}
function _slicer(incoming) {
  return incoming.slice(0,5);
}

function getMostPopularAuthors(books, authors) {
  return books.map(book => {
    const author = authors.find(author => author.id ==- book.authorId)
    return {
      name: `${author.name.first} ${author.name.last}`,
      count: book.borrows.length
    }
  }).sort((a,b) => b.count - a.count).slice(0,5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
