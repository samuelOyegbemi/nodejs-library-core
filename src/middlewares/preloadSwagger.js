/**
 * @method preloadSwagger
 * @param {Object} documentation - Swagger json documentation
 * @return {function(Object, Object, Function): null} Middleware to update documentation properties
 */
const preloadSwagger = documentation => (req, res, next) => {
  documentation.host = req.get('host');
  req.swaggerDoc = documentation;
  next();
};

export { preloadSwagger };
