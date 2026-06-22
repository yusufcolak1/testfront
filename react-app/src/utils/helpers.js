// When VITE_API_URL is a relative path like "/api", uploads must be served
// from the origin root (/uploads/...), not under /api/uploads/.
// Use absolute origin for uploads only when running against a remote server.
const RAW_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const UPLOAD_BASE = RAW_API_URL.startsWith('/') ? '' : RAW_API_URL;

/**
 * Returns the full URL for an image.
 * If the path is null, returns a placeholder.
 * If the path starts with http, returns it as is.
 * Otherwise, builds an upload-relative URL (never prefixed with /api).
 */
export const getFullImageUrl = (path) => {
  if (!path) return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400';
  if (path.startsWith('http')) return path;

  let cleanPath = path;
  if (!path.startsWith('/uploads/') && !path.startsWith('uploads/')) {
    cleanPath = path.startsWith('/') ? `/uploads${path}` : `/uploads/${path}`;
  } else {
    cleanPath = path.startsWith('/') ? path : `/${path}`;
  }

  return `${UPLOAD_BASE}${cleanPath}`;
};
