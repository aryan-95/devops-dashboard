const express = require('express');
const router = express.Router();
const jenkins = require('../services/jenkinsService');

// GET /api/jenkins/info
router.get('/info', async (req, res) => {
  try {
    res.json(await jenkins.getServerInfo());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/jenkins/jobs
router.get('/jobs', async (req, res) => {
  try {
    res.json(await jenkins.getAllJobs());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/jenkins/jobs/:name
router.get('/jobs/:name', async (req, res) => {
  try {
    res.json(await jenkins.getJobDetails(req.params.name));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/jenkins/jobs/:name/build
router.post('/jobs/:name/build', async (req, res) => {
  try {
    const { params } = req.body;
    if (params && Object.keys(params).length > 0) {
      res.json(await jenkins.triggerBuildWithParams(req.params.name, params));
    } else {
      res.json(await jenkins.triggerBuild(req.params.name));
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/jenkins/jobs/:name/builds/:number
router.get('/jobs/:name/builds/:number', async (req, res) => {
  try {
    res.json(await jenkins.getBuildStatus(req.params.name, req.params.number));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/jenkins/jobs/:name/builds/:number/console
router.get('/jobs/:name/builds/:number/console', async (req, res) => {
  try {
    const output = await jenkins.getConsoleOutput(req.params.name, req.params.number);
    res.type('text/plain').send(output);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/jenkins/jobs/:name/builds/:number/stop
router.post('/jobs/:name/builds/:number/stop', async (req, res) => {
  try {
    res.json(await jenkins.stopBuild(req.params.name, req.params.number));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE /api/jenkins/jobs/:name
router.delete('/jobs/:name', async (req, res) => {
  try {
    res.json(await jenkins.deleteJob(req.params.name));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/jenkins/queue
router.get('/queue', async (req, res) => {
  try {
    res.json(await jenkins.getQueue());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
