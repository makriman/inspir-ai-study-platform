// Student authentication utilities
const TOKEN_KEY = 'inspir_student_token';
const STUDENT_DATA_KEY = 'inspir_student_data';

export const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export const saveStudentData = (studentData) => {
    localStorage.setItem(STUDENT_DATA_KEY, JSON.stringify(studentData));
};

export const getStudentData = () => {
    const data = localStorage.getItem(STUDENT_DATA_KEY);
    return data ? JSON.parse(data) : null;
};

export const removeStudentData = () => {
    localStorage.removeItem(STUDENT_DATA_KEY);
};

export const isAuthenticated = () => {
    const token = getToken();
    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        if (payload.exp < currentTime) {
            removeToken();
            removeStudentData();
            return false;
        }
        return true;
    } catch (e) {
        return false;
    }
};

export const logout = () => {
    removeToken();
    removeStudentData();
    if (typeof window !== 'undefined' && window.location.pathname !== '/studentlogin') {
        window.location.href = '/studentlogin';
    }
};
