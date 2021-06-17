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

// sorting helper function
function _sortingObjectsByValues(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyB] > obj[keyA]) {
      return 1
    } else {
      return 0;
    }
  });
}

function getMostPopularAuthors(books, authors) {
  const count = books.reduce((acc, { authorId, borrows }) => {
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length];
    }
    return acc;
  }, {});
  for (let id in count) {
    const sum = count[id].reduce((acc, b) => acc + b);
    count[id] = sum;
  }
  const sorted = _sortObjectByValues(count);
  let arr = sorted
  .map((authorId) => {
    const {
      name: {first, last },
    } = authors.find(({ id }) => id === Number(authorId));
    let name = `${first} ${last}`;
    return { name, count: count[authorId] };
  })
  .slice(o, 5);
  return arr; 
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
