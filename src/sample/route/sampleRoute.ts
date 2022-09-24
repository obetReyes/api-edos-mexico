import express from 'express';
import controller from '../service/sampleService';

const router = express.Router();

router.get('/ping', controller.serverHealthCheck);

export = router;

