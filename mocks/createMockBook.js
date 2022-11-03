const {faker} = require("@faker-js/faker/locale/en");

// create book with random data
module.exports = (author) => ({
    id: faker.database.mongodbObjectId(),
    title: faker.helpers.fake('{{word.preposition}} {{word.noun}} {{word.verb}} {{word.preposition}} {{word.noun}}'),
    year: faker.date.past().getFullYear(),
    author,
})