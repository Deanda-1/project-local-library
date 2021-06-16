const { getBooksBorrowedCount } = require("./home");

function findAccountById(accounts, id) {
  return accounts.find((matchingID) => matchingID.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a,b) =>
  a.name.last.toLowerCase() > b.name.last.toLowerCase()? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  let counter = 0;
  books.forEach(book => 
    book.borrows.forEach(borrowed => {
      if(accountId === borrowed.id) counter++;}
    ));
    return counter;
    }


function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  let checkedOut = books.filter((book) => book.borrows.some(loaned => 
    !loaned.returned && loaned.id === accountId)
  );
    checkedOut.forEach(book => 
      book.author = authors.find(author => book.authorId === author.id)
    );
    
    return checkedOut; 
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
