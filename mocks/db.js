const { v4: uuidv4 } = require("uuid");

// random numbers range
const randomRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// create random year
const randYear = (year) => randomRange(1900, year);

// get random author
const randAuthor = (authors) => authors[randomRange(authors.length - 1, 0)];

module.exports = () => {
  const data = { books: [], authors: [] };
  const today = new Date();
  const year = today.getFullYear();

  // add authors
  for (let i = 0; i < 100; i++) {
    data.authors.push({
      id: uuidv4(),
      name: `author ${i}`,
    });
  }

  // add books
  for (let i = 0; i < 100; i++) {
    data.books.push({
      id: uuidv4(),
      title: `book title ${i}`,
      year: randYear(year),
      author: randAuthor(data.authors),
    });
  }

  return data;
};
