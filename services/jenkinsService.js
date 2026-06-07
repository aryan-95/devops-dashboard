const axios = require('axios');
require('dotenv').config();

const jenkinsClient = axios.create({
  baseURL: process.env.JENKINS_URL,
  auth: {
    username: process.env.JENKINS_USER,
    password: process.env.JENKINS_TOKEN,
  },
  timeout: 10000,
});

// Get all jobs
const getAllJobs = async () => {
  const res = await jenkinsClient.get(
    '/api/json?tree=jobs[name,color,url,lastBuild[number,result,timestamp,duration]]'
  );
  return res.data.jobs;
};

// Get single job details
const getJobDetails = async (jobName) => {
  const res = await jenkinsClient.get(
    `/job/${encodeURIComponent(jobName)}/api/json?tree=name,color,url,builds[number,result,timestamp,duration,id]`
  );
  return res.data;
};

// Trigger a build (no params)
const triggerBuild = async (jobName) => {
  await jenkinsClient.post(`/job/${encodeURIComponent(jobName)}/build`);
  return { success: true, message: `Build triggered for "${jobName}"` };
};

// Trigger build with parameters
const triggerBuildWithParams = async (jobName, params) => {
  await jenkinsClient.post(`/job/${encodeURIComponent(jobName)}/buildWithParameters`, null, {
    params,
  });
  return { success: true, message: `Parameterized build triggered for "${jobName}"` };
};

// Get build status
const getBuildStatus = async (jobName, buildNumber) => {
  const res = await jenkinsClient.get(
    `/job/${encodeURIComponent(jobName)}/${buildNumber}/api/json`
  );
  return res.data;
};

// Get console output
const getConsoleOutput = async (jobName, buildNumber) => {
  const res = await jenkinsClient.get(
    `/job/${encodeURIComponent(jobName)}/${buildNumber}/consoleText`
  );
  return res.data;
};

// Stop/abort a build
const stopBuild = async (jobName, buildNumber) => {
  await jenkinsClient.post(
    `/job/${encodeURIComponent(jobName)}/${buildNumber}/stop`
  );
  return { success: true, message: `Build #${buildNumber} stopped for "${jobName}"` };
};

// Get Jenkins server info
const getServerInfo = async () => {
  const res = await jenkinsClient.get('/api/json?tree=numExecutors,description,jobs[name]');
  return res.data;
};

// Create a new freestyle job
const createJob = async (jobName, configXml) => {
  await jenkinsClient.post(`/createItem?name=${encodeURIComponent(jobName)}`, configXml, {
    headers: { 'Content-Type': 'application/xml' },
  });
  return { success: true, message: `Job "${jobName}" created successfully` };
};

// Delete a job
const deleteJob = async (jobName) => {
  await jenkinsClient.post(`/job/${encodeURIComponent(jobName)}/doDelete`);
  return { success: true, message: `Job "${jobName}" deleted` };
};

// Get build queue
const getQueue = async () => {
  const res = await jenkinsClient.get('/queue/api/json');
  return res.data.items;
};

module.exports = {
  getAllJobs,
  getJobDetails,
  triggerBuild,
  triggerBuildWithParams,
  getBuildStatus,
  getConsoleOutput,
  stopBuild,
  getServerInfo,
  createJob,
  deleteJob,
  getQueue,
};
