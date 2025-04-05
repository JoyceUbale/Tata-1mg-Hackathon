export function addMiddlewares(app) {
    // Server middlewares can be added here
    app.use((req, res, next) => {
      // Catalyst-specific middleware for tracking
      console.log(`[Catalyst] ${req.method} ${req.url}`);
      next();
    });
  }
  