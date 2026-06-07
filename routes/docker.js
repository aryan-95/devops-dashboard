const express = require('express');
const router = express.Router();
const docker = require('../services/dockerService');

// GET /api/docker/info
router.get('/info', async (req, res) => {
  try {
    res.json(await docker.getSystemInfo());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/docker/version
router.get('/version', async (req, res) => {
  try {
    res.json(await docker.getVersion());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/docker/containers
router.get('/containers', async (req, res) => {
  try {
    const all = req.query.all !== 'false';
    res.json(await docker.listContainers(all));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/docker/containers/run
router.post('/containers/run', async (req, res) => {
  try {
    res.json(await docker.runContainer(req.body));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/docker/containers/:id/inspect
router.get('/containers/:id/inspect', async (req, res) => {
  try {
    res.json(await docker.inspectContainer(req.params.id));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/docker/containers/:id/logs
router.get('/containers/:id/logs', async (req, res) => {
  try {
    const tail = parseInt(req.query.tail) || 100;
    const logs = await docker.getContainerLogs(req.params.id, tail);
    res.type('text/plain').send(logs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/docker/containers/:id/start
router.post('/containers/:id/start', async (req, res) => {
  try {
    res.json(await docker.startContainer(req.params.id));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/docker/containers/:id/stop
router.post('/containers/:id/stop', async (req, res) => {
  try {
    res.json(await docker.stopContainer(req.params.id));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/docker/containers/:id/restart
router.post('/containers/:id/restart', async (req, res) => {
  try {
    res.json(await docker.restartContainer(req.params.id));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE /api/docker/containers/:id
router.delete('/containers/:id', async (req, res) => {
  try {
    const force = req.query.force !== 'false';
    res.json(await docker.removeContainer(req.params.id, force));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/docker/images
router.get('/images', async (req, res) => {
  try {
    res.json(await docker.listImages());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/docker/images/pull
router.post('/images/pull', async (req, res) => {
  try {
    const { image } = req.body;
    res.json(await docker.pullImage(image));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE /api/docker/images/:id
router.delete('/images/:id', async (req, res) => {
  try {
    const force = req.query.force === 'true';
    res.json(await docker.removeImage(req.params.id, force));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/docker/prune/containers
router.post('/prune/containers', async (req, res) => {
  try {
    res.json(await docker.pruneContainers());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/docker/prune/images
router.post('/prune/images', async (req, res) => {
  try {
    res.json(await docker.pruneImages());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
