const User = require('./models/User');
const generateAccountNumber = require('./utils/generateAccountNumber');

(async () => {
    try {
        const users = await User.findAll();
        for (const user of users) {
            if (!user.account_number || user.account_number === '') {
                user.account_number = generateAccountNumber();
                await user.save();
            }
        }
        console.log('Updated existing users with unique account numbers.');
    } catch (err) {
        console.error('Error updating users:', err);
    }
})();
