'use strict';

const { faker } = require('@faker-js/faker/locale/en');
const createMockAuthor = require('./createMockAuthor')
const createMockBook = require('./createMockBook')
const { getRandomAuthor } = require('./utils')

faker.seed(9165);

// mocks length
const MOCKS_LENGTH = 50

module.exports = () => {
  const data = { books: [], authors: [] };

  for (let i = 0; i < MOCKS_LENGTH; i++) {
    const randomAuthor = createMockAuthor()
    data.authors = [...data.authors, randomAuthor];
    const relatedAuthor = getRandomAuthor(data.authors)
    const randomBook = createMockBook(relatedAuthor)
    data.books = [...data.books, randomBook];
  }

  return data;
};
