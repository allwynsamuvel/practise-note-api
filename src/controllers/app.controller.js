export const checkHealth = async (_req, res, next) => {
  try {
    
    const health = {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: Date.now(),
    };

    return res.status(200).send(health);
  } catch (error) {
    next(error);
  }
}
