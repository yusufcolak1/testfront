// ============================================================
// TAKASON - API Client (merkezi)
// ============================================================

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api';

class ApiClient {
  constructor() {
    this.baseURL = API_URL;
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }

  getToken() {
    return this.token || localStorage.getItem('token');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    const token = this.getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;

    let response;
    try {
      response = await fetch(url, { ...options, headers });
    } catch (err) {
      console.error(`[api] Ağ hatası: ${url}`, err);
      throw new Error('Sunucuya bağlanılamadı. Backend çalışıyor mu?');
    }

    // Content-type guard — HTML/text dönerse anlamlı hata
    const ct = response.headers.get('content-type') || '';
    if (!ct.includes('application/json')) {
      const text = await response.text().catch(() => '');
      console.error(`[api] Beklenmeyen yanıt (${response.status}) ${url}\n`, text.slice(0, 200));
      throw new Error(`Sunucu JSON yerine ${ct || 'bilinmeyen format'} döndürdü (HTTP ${response.status}).`);
    }

    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || `HTTP ${response.status}`);
      err.status = response.status;
      err.data = data;
      throw err;
    }
    return data;
  }

  get(endpoint, params) {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.request(endpoint + qs);
  }
  post(endpoint, body) { return this.request(endpoint, { method: 'POST', body: JSON.stringify(body) }); }
  put(endpoint, body) { return this.request(endpoint, { method: 'PUT', body: JSON.stringify(body) }); }
  patch(endpoint, body) { return this.request(endpoint, { method: 'PATCH', body: JSON.stringify(body) }); }
  delete(endpoint) { return this.request(endpoint, { method: 'DELETE' }); }

  // ---- Auth ----
  register(userData) { return this.post('/auth/register', userData); }
  async login(creds) {
    const r = await this.post('/auth/login', creds);
    if (r.data?.tokens?.accessToken) this.setToken(r.data.tokens.accessToken);
    return r;
  }
  logout() { this.setToken(null); return this.request('/auth/logout', { method: 'POST' }).catch(() => {}); }
  getMe() { return this.get('/auth/me'); }

  // ---- Items ----
  getItems(params = {}) { return this.get('/items', params); }
  getItemById(id) { return this.get(`/items/${id}`); }
  createItem(data) { return this.post('/items', data); }
  updateItem(id, data) { return this.patch(`/items/${id}`, data); }
  deleteItem(id) { return this.delete(`/items/${id}`); }
  toggleFavorite(id) { return this.post(`/items/${id}/favorite`); }

  // ---- Categories ----
  getCategories() { return this.get('/categories'); }
  getCategoryById(id) { return this.get(`/categories/${id}`); }

  // ---- Trades ----
  getTrades(params = {}) { return this.get('/trades/my', params); }
  createTrade(data) { return this.post('/trades', data); }
  acceptTrade(id) { return this.patch(`/trades/${id}/accept`); }
  rejectTrade(id) { return this.patch(`/trades/${id}/reject`); }
  cancelTrade(id) { return this.patch(`/trades/${id}/cancel`); }

  // ---- Content (public) ----
  getFaqs() { return this.get('/faqs'); }
  getHelpCategories() { return this.get('/help/categories'); }
  getPremiumPerks() { return this.get('/premium/perks'); }
  getPremiumPlans() { return this.get('/premium/plans'); }
  getSafeSwapSteps() { return this.get('/safe-swap/steps'); }
  getPublicSettings() { return this.get('/settings/public'); }

  // ---- User-scoped ----
  getLeaderboard(limit = 50) { return this.get('/leaderboard', { limit }); }
  getMyAds(status) { return this.get('/users/me/ads', status ? { status } : undefined); }
  getMyTrades(status) { return this.get('/users/me/trades', status ? { status } : undefined); }
  getMyFavorites() { return this.get('/users/me/favorites'); }
  updateMyProfile(data) { return this.patch('/users/me/profile', data); }

  // ---- Addresses ----
  getAddresses() { return this.get('/addresses'); }
  createAddress(data) { return this.post('/addresses', data); }
  updateAddress(id, data) { return this.patch(`/addresses/${id}`, data); }
  deleteAddress(id) { return this.delete(`/addresses/${id}`); }

  // ---- Messages ----
  getConversations() { return this.get('/messages'); }
  getConversation(id) { return this.get(`/messages/${id}`); }
  sendMessage(roomId, content) { return this.post(`/messages/${roomId}`, { content }); }
  startConversation(userId) { return this.post('/messages/start', { userId }); }

  // ---- Item upload (multipart) ----
  async createItemWithImages(formData) {
    const url = `${this.baseURL}/items`;
    const headers = {};
    const token = this.getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const resp = await fetch(url, { method: 'POST', headers, body: formData });
    const ct = resp.headers.get('content-type') || '';
    if (!ct.includes('application/json')) throw new Error(`Sunucu JSON döndürmedi (HTTP ${resp.status}).`);
    const data = await resp.json();
    if (!resp.ok) throw new Error(data.message || `HTTP ${resp.status}`);
    return data;
  }

  // ---- Notifications ----
  getNotifications() { return this.get('/notifications'); }
  markNotificationRead(id) { return this.patch(`/notifications/${id}/read`); }

  // ---- Admin ----
  admin = {
    stats: () => this.get('/admin/stats'),
    // Users
    listUsers: (params) => this.get('/admin/users', params),
    getUser: (id) => this.get(`/admin/users/${id}`),
    createUser: (d) => this.post('/admin/users', d),
    updateUser: (id, d) => this.patch(`/admin/users/${id}`, d),
    deleteUser: (id) => this.delete(`/admin/users/${id}`),
    // Items
    listItems: (params) => this.get('/admin/items', params),
    updateItem: (id, d) => this.patch(`/admin/items/${id}`, d),
    deleteItem: (id) => this.delete(`/admin/items/${id}`),
    // Categories
    createCategory: (d) => this.post('/admin/categories', d),
    updateCategory: (id, d) => this.patch(`/admin/categories/${id}`, d),
    deleteCategory: (id) => this.delete(`/admin/categories/${id}`),
    // Trades
    listTrades: (params) => this.get('/admin/trades', params),
    updateTrade: (id, d) => this.patch(`/admin/trades/${id}`, d),
    deleteTrade: (id) => this.delete(`/admin/trades/${id}`),
    // FAQ
    listFaqs: () => this.get('/admin/faqs'),
    createFaq: (d) => this.post('/admin/faqs', d),
    updateFaq: (id, d) => this.patch(`/admin/faqs/${id}`, d),
    deleteFaq: (id) => this.delete(`/admin/faqs/${id}`),
    // Help categories
    listHelpCategories: () => this.get('/admin/help-categories'),
    createHelpCategory: (d) => this.post('/admin/help-categories', d),
    updateHelpCategory: (id, d) => this.patch(`/admin/help-categories/${id}`, d),
    deleteHelpCategory: (id) => this.delete(`/admin/help-categories/${id}`),
    // Premium perks
    listPerks: () => this.get('/admin/premium-perks'),
    createPerk: (d) => this.post('/admin/premium-perks', d),
    updatePerk: (id, d) => this.patch(`/admin/premium-perks/${id}`, d),
    deletePerk: (id) => this.delete(`/admin/premium-perks/${id}`),
    // Premium plans
    listPlans: () => this.get('/admin/premium-plans'),
    createPlan: (d) => this.post('/admin/premium-plans', d),
    updatePlan: (id, d) => this.patch(`/admin/premium-plans/${id}`, d),
    deletePlan: (id) => this.delete(`/admin/premium-plans/${id}`),
    // Safe swap steps
    listSteps: () => this.get('/admin/safe-swap-steps'),
    createStep: (d) => this.post('/admin/safe-swap-steps', d),
    updateStep: (id, d) => this.patch(`/admin/safe-swap-steps/${id}`, d),
    deleteStep: (id) => this.delete(`/admin/safe-swap-steps/${id}`),
    // Settings
    listSettings: (group) => this.get('/admin/settings', group ? { group } : undefined),
    updateSetting: (key, d) => this.put(`/admin/settings/${key}`, d),
    bulkUpdateSettings: (items) => this.put('/admin/settings', { items }),
    deleteSetting: (key) => this.delete(`/admin/settings/${key}`),
    // SMTP/SMS test
    testSmtp: (d) => this.post('/admin/settings/smtp/test', d),
    verifySmtp: () => this.get('/admin/settings/smtp/verify'),
    testSms: (d) => this.post('/admin/settings/sms/test', d),
  };

  healthCheck() { return this.get('/health'); }
}

export const api = new ApiClient();
export default api;
