const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Returns the full URL for an image.
 * If the path is null, returns a placeholder.
 * If the path starts with http, returns it as is.
 * Otherwise, prepends the API base URL.
 */
export const getFullImageUrl = (path) => {
  if (!path) return 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=400';
  if (path.startsWith('http')) return path;
  
  let cleanPath = path;
  // Eğer yol /uploads/ ile başlamıyorsa ve bir yerel dosyaysa ekle
  if (!path.startsWith('/uploads/') && !path.startsWith('uploads/')) {
    cleanPath = path.startsWith('/') ? `/uploads${path}` : `/uploads/${path}`;
  } else {
    cleanPath = path.startsWith('/') ? path : `/${path}`;
  }
  
  return `${API_BASE}${cleanPath}`;
};
