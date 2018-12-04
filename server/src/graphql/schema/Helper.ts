import UserManager from '../../arango/manager/UserManager';

const getUser = async (_key: string) => UserManager.find(_key);

export {
    getUser,
};
