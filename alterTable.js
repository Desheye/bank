const sequelize = require('./config/db');

(async () => {
    try {
        // Get all unique keys for the Users table
        const [keys] = await sequelize.query(`
            SELECT DISTINCT INDEX_NAME
            FROM INFORMATION_SCHEMA.STATISTICS
            WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Users' AND INDEX_NAME LIKE 'email_%' OR INDEX_NAME LIKE 'account_number_%';
        `);

        // Remove all duplicate unique keys
        for (let key of keys) {
            await sequelize.query(`ALTER TABLE Users DROP INDEX ${key.INDEX_NAME};`);
            console.log(`Removed duplicate unique key: ${key.INDEX_NAME}`);
        }

        // Add unique constraints for account_number and email
        await sequelize.query(`
            ALTER TABLE Users
            ADD CONSTRAINT unique_account_number UNIQUE (account_number),
            ADD CONSTRAINT unique_email UNIQUE (email);
        `);
        console.log('Successfully added unique constraints for account_number and email.');
    } catch (err) {
        console.error('Error altering Users table:', err);
    }
})();
