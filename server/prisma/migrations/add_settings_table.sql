-- Settings table for admin panel configuration
-- Stores Cloudinary and other dynamic settings

CREATE TABLE IF NOT EXISTS settings (
  id VARCHAR(36) PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Index for faster lookups
CREATE INDEX idx_settings_key ON settings(key);

-- Insert default Cloudinary settings (from environment variables)
INSERT INTO settings (id, key, value, description) 
VALUES (
  UUID(),
  'cloudinary',
  JSON_OBJECT(
    'cloudName', 'dhkgsk5wv',
    'apiKey', '737549276127958',
    'apiSecret', 'a0-f_UG8_eerMM0s7HIt3C4uZJQ'
  ),
  'Cloudinary API credentials for image uploads'
) ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;
