const {faker} = require("@faker-js/faker/locale/en");

// create author with random data
module.exports = () => ({
    id: faker.database.mongodbObjectId(),
    name: faker.name.fullName(),
})