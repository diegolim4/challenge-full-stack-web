import { reactive } from 'vue';

const EXPIRATION_TIME = 24 * 60 * 60 * 1000;

const state = reactive({
    isAuthenticated: getStoredAuthenticationStatus(),
    client: getStoredClientData(),
});

function saveWithTimestamp(key, data) {
    const timestamp = new Date().getTime();
    localStorage.setItem(key, JSON.stringify({ data, timestamp }));
}

function getStoredDataWithExpirationCheck(key) {
    const item = localStorage.getItem(key);
    if (item) {
        try {
            const { data, timestamp } = JSON.parse(item);
            const now = new Date().getTime();
            if (now - timestamp > EXPIRATION_TIME) {
                localStorage.removeItem(key);
                return null;
            }
            return data;
        } catch (error) {
            console.warn(`Erro ao recuperar ${key} do localStorage:`, error);
            localStorage.removeItem(key);
            return null;
        }
    }
    return null;
}

function getStoredAuthenticationStatus() {
    const status = getStoredDataWithExpirationCheck('isAuthenticated');
    return status === 'true';
}

function getStoredClientData() {
    return getStoredDataWithExpirationCheck('client');
}

function getAccessKey() {
    const client = getStoredDataWithExpirationCheck('client');
    return client?.accessKey;
}

function getIdAdmin() {
    const client = getStoredDataWithExpirationCheck('client');
    return client?.id 
}

const login = (clientData) => {
    state.isAuthenticated = true;
    state.client = clientData;
    saveWithTimestamp('isAuthenticated', 'true');
    saveWithTimestamp('client', clientData);
};

const logout = () => {
    state.isAuthenticated = false;
    state.client = null;
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('client');
};

export default {
    state,
    login,
    logout,
    getAccessKey,
    getIdAdmin,
};
