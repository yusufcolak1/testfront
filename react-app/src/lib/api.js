// ============================================================
// TAKASON - API Client
// Backend API ile iletişim için merkezi client
// ============================================================

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiClient {
  constructor() {
    this.baseURL = API_URL;
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  getToken() {
    return this.token || localStorage.getItem('token');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Bir hata oluştu');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.data?.tokens?.accessToken) {
      this.setToken(response.data.tokens.accessToken);
    }
    
    return response;
  }

  async logout() {
    this.setToken(null);
    return this.request('/auth/logout', { method: 'POST' });
  }

  async getMe() {
    return this.request('/auth/me');
  }

  // Items endpoints
  async getItems(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/items${queryString ? `?${queryString}` : ''}`);
  }

  async getItemById(id) {
    return this.request(`/items/${id}`);
  }

  async createItem(itemData) {
    return this.request('/items', {
      method: 'POST',
      body: JSON.stringify(itemData),
    });
  }

  async updateItem(id, itemData) {
    return this.request(`/items/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(itemData),
    });
  }

  async deleteItem(id) {
    return this.request(`/items/${id}`, {
      method: 'DELETE',
    });
  }

  async toggleFavorite(itemId) {
    return this.request(`/items/${itemId}/favorite`, {
      method: 'POST',
    });
  }

  // Trades endpoints
  async getTrades(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/trades${queryString ? `?${queryString}` : ''}`);
  }

  async createTrade(tradeData) {
    return this.request('/trades', {
      method: 'POST',
      body: JSON.stringify(tradeData),
    });
  }

  async updateTradeStatus(tradeId, status) {
    return this.request(`/trades/${tradeId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const api = new ApiClient();
export default api;
