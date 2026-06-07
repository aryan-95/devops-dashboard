const Docker = require('dockerode');
require('dotenv').config();

const docker = new Docker({ socketPath: process.env.DOCKER_SOCKET || '/var/run/docker.sock' });

// List all containers (running + stopped)
const listContainers = async (all = true) => {
  const containers = await docker.listContainers({ all });
  return containers.map((c) => ({
    id: c.Id.substring(0, 12),
    fullId: c.Id,
    name: c.Names[0]?.replace('/', '') || 'unnamed',
    image: c.Image,
    status: c.Status,
    state: c.State,
    ports: c.Ports,
    created: c.Created,
  }));
};

// List all images
const listImages = async () => {
  const images = await docker.listImages();
  return images.map((img) => ({
    id: img.Id.replace('sha256:', '').substring(0, 12),
    fullId: img.Id,
    tags: img.RepoTags || ['<none>'],
    size: (img.Size / 1024 / 1024).toFixed(2) + ' MB',
    created: img.Created,
  }));
};

// Start a container
const startContainer = async (id) => {
  const container = docker.getContainer(id);
  await container.start();
  return { success: true, message: `Container ${id} started` };
};

// Stop a container
const stopContainer = async (id) => {
  const container = docker.getContainer(id);
  await container.stop();
  return { success: true, message: `Container ${id} stopped` };
};

// Restart a container
const restartContainer = async (id) => {
  const container = docker.getContainer(id);
  await container.restart();
  return { success: true, message: `Container ${id} restarted` };
};

// Remove a container
const removeContainer = async (id, force = true) => {
  const container = docker.getContainer(id);
  await container.remove({ force });
  return { success: true, message: `Container ${id} removed` };
};

// Get container logs
const getContainerLogs = async (id, tail = 100) => {
  const container = docker.getContainer(id);
  const logs = await container.logs({
    stdout: true,
    stderr: true,
    tail,
    timestamps: true,
  });
  return logs.toString('utf8');
};

// Inspect a container
const inspectContainer = async (id) => {
  const container = docker.getContainer(id);
  return await container.inspect();
};

// Pull an image
const pullImage = async (imageName) => {
  return new Promise((resolve, reject) => {
    docker.pull(imageName, (err, stream) => {
      if (err) return reject(err);
      docker.modem.followProgress(stream, (err, output) => {
        if (err) return reject(err);
        resolve({ success: true, message: `Image "${imageName}" pulled successfully`, output });
      });
    });
  });
};

// Remove an image
const removeImage = async (id, force = false) => {
  const image = docker.getImage(id);
  await image.remove({ force });
  return { success: true, message: `Image ${id} removed` };
};

// Run a new container
const runContainer = async ({ image, name, ports, env, cmd, detach = true }) => {
  const portBindings = {};
  const exposedPorts = {};

  if (ports) {
    ports.forEach((p) => {
      const [host, container] = p.split(':');
      exposedPorts[`${container}/tcp`] = {};
      portBindings[`${container}/tcp`] = [{ HostPort: host }];
    });
  }

  const container = await docker.createContainer({
    Image: image,
    name,
    Env: env || [],
    Cmd: cmd || undefined,
    ExposedPorts: exposedPorts,
    HostConfig: {
      PortBindings: portBindings,
    },
  });

  await container.start();
  return {
    success: true,
    message: `Container "${name || image}" started`,
    id: container.id.substring(0, 12),
  };
};

// Docker system info
const getSystemInfo = async () => {
  return await docker.info();
};

// Docker version
const getVersion = async () => {
  return await docker.version();
};

// Prune stopped containers
const pruneContainers = async () => {
  const result = await docker.pruneContainers();
  return { success: true, message: 'Stopped containers pruned', ...result };
};

// Prune unused images
const pruneImages = async () => {
  const result = await docker.pruneImages();
  return { success: true, message: 'Unused images pruned', ...result };
};

module.exports = {
  listContainers,
  listImages,
  startContainer,
  stopContainer,
  restartContainer,
  removeContainer,
  getContainerLogs,
  inspectContainer,
  pullImage,
  removeImage,
  runContainer,
  getSystemInfo,
  getVersion,
  pruneContainers,
  pruneImages,
};
