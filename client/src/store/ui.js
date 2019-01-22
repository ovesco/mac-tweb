import settings from '../../env.json';

/* eslint-disable no-param-reassign */
export default {
    namespaced: true,
    state: {
        menuCollapsed: false,
        reader: {
            files: [],
        },
        notifications: [],
        modalActivityId: null,
        notificationsManagerVisible: false,
    },
    mutations: {
        collapseMenu: (state, value) => {
            state.menuCollapsed = value;
        },
        setModalActivity(state, activityId) {
            state.notificationsManagerVisible = false;
            state.modalActivityId = activityId;
        },
        showNotifications: (state, value) => {
            if (!value) state.notifications.splice(0);
            state.notificationsManagerVisible = value;
        },
        addNotification(state, notification) {
            state.notifications.unshift(notification);
        },
        addFileToWatch: (state, file) => {
            state.reader.files.push(file);
        },
        removeReaderFile: (state, file) => {
            const index = state.reader.files.indexOf(file);
            if (index > -1) state.reader.files.splice(index, 1);
        },
    },
    getters: {
        showReader: state => state.reader.files.length > 0,
        showNotifications: state => state.notificationsManagerVisible,
        showModalActivity: state => state.modalActivityId !== null,
        notified: state => state.notifications.filter(n => !n.read).length > 0,
        menuCollapsed: state => state.menuCollapsed,
        serverUrl: () => settings.url,
    },
};
