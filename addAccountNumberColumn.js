const sequelize = require('./config/db');

(async () => {
    try {
        await sequelize.query('ALTER TABLE `Users` ADD `account_number` VARCHAR(255);');
        console.log('Successfully added account_number column to Users table.');
    } catch (err) {
        console.error('Error adding account_number column:', err);
    }
})();
