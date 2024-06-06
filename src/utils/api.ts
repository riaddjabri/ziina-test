import refreshToken from './auth';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Fetch the endpoint. Refresh token is access token is outdated
const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const accessToken = localStorage.getItem('accessToken');

    const headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
    };

    let response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });

    if (response.status === 401) {
        try {
            const newAccessToken = await refreshToken();
            headers.Authorization = `Bearer ${newAccessToken}`;
            response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
        } catch (error) {
            console.error('Token refresh failed:', error);
            throw error;
        }
    }

    return response;
};

export default apiFetch;
