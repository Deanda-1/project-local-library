function findAuthorById(authors, id) {
  return authors.find((matchingAuth) => matchingAuth.id ===id);
}

function findBookById(books, id) {
  return books.find((matchingID) => matchingID.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowed = books.filter(book => !book.borrows[0].returned);
  const returned = books.filter(book => book.borrows[0].returned);
  return [borrowed,returned];
}

function getBorrowersForBook(book, accounts) {
  const loaned = book.borrows
  const borrowers = loaned.map(({ id, returned }) => {
    const account = accounts.find(account => account.id === id);

    return {
      ...account,
      returned,
    };
  });
  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
