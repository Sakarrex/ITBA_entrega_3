import { Router } from 'express';

const router = Router();

router.get('/health', (request, response) => {
  response.json({
    success: true,
    data: {
      service: 'muebleria-jota-backend',
      status: 'ok',
      path: request.path,
    },
    message: 'Backend funcionando correctamente',
  });
});

export default router;
