// ============================================================
// TAKASON - Zod Validasyon Middleware
// Gelen istekleri şemaya göre doğrular
// ============================================================

const { ZodError } = require('zod');

// ============================================================
// validate - Zod şemasıyla istek gövdesini doğrula
// Kullanım: router.post('/register', validate(registerSchema), authController.register)
// ============================================================
const validate = (schema) => (req, res, next) => {
  try {
    // parse() başarısız olursa ZodError fırlatır, errorHandler yakalar
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return next(err); // errorHandler'a gönder
    }
    next(err);
  }
};

// Query parametrelerini doğrula
const validateQuery = (schema) => (req, res, next) => {
  try {
    req.query = schema.parse(req.query);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return next(err);
    }
    next(err);
  }
};

// URL parametrelerini doğrula
const validateParams = (schema) => (req, res, next) => {
  try {
    req.params = schema.parse(req.params);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return next(err);
    }
    next(err);
  }
};

module.exports = { validate, validateQuery, validateParams };
