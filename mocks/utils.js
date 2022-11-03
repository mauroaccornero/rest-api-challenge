// random numbers range
const getRandomNumberFromRange = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

// get random author
const getRandomAuthor = (authors) => {
    const randomAuthorIndex = getRandomNumberFromRange(0, authors.length - 1)
    return authors[randomAuthorIndex];
}

module.exports = {getRandomAuthor}