require('dotenv').config();
const UserManager = require('./manager/UserManager');

(async () => {
    for (let i = 0; i < 10; i++) {
        const user = {
            name: `user ${i} swag`,
            username: `user${i}`,
            password: `password${i}`,
            email: `user${i}@swag.com`,
        };

        await UserManager.save(user);
    }
})();