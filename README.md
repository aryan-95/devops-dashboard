# DevOps Dashboard

A Node.js web application to manage Jenkins CI/CD pipelines and Docker containers from a single UI.

## Features

### Jenkins
- View all jobs with status
- Trigger builds (with or without parameters)
- Stop running builds
- View build status and console output
- Delete jobs
- View build queue

### Docker
- List all containers (running + stopped)
- Start / Stop / Restart / Remove containers
- View container logs
- List all Docker images
- Pull new images
- Run new containers with ports and env vars
- Prune stopped containers and unused images
- View Docker system info and version

## Prerequisites

- Node.js v18+
- Jenkins running (local or remote)
- Docker installed and running

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure .env**
   ```
   PORT=3000
   JENKINS_URL=http://localhost:8080
   JENKINS_USER=admin
   JENKINS_TOKEN=your_api_token_here
   DOCKER_SOCKET=/var/run/docker.sock
   ```

   To get your Jenkins API token:
   - Go to Jenkins → Your username → Configure → API Token → Add new Token

3. **Run the app**
   ```bash
   # Development (auto-restart)
   npm run dev

   # Production
   npm start
   ```

4. **Open browser**
   ```
   http://localhost:3000
   ```

## Folder Structure

```
devops-dashboard/
├── server.js                  # Express entry point
├── package.json
├── .env                       # Configuration (create this)
├── routes/
│   ├── jenkins.js             # Jenkins API routes
│   └── docker.js              # Docker API routes
├── services/
│   ├── jenkinsService.js      # Jenkins business logic
│   └── dockerService.js       # Docker business logic
└── public/
    └── index.html             # Full frontend dashboard
```

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/jenkins/jobs | List all jobs |
| POST | /api/jenkins/jobs/:name/build | Trigger build |
| GET | /api/jenkins/jobs/:name/builds/:num | Build status |
| GET | /api/jenkins/jobs/:name/builds/:num/console | Console log |
| POST | /api/jenkins/jobs/:name/builds/:num/stop | Stop build |
| DELETE | /api/jenkins/jobs/:name | Delete job |
| GET | /api/jenkins/queue | Build queue |
| GET | /api/docker/containers | List containers |
| POST | /api/docker/containers/run | Run container |
| POST | /api/docker/containers/:id/start | Start container |
| POST | /api/docker/containers/:id/stop | Stop container |
| POST | /api/docker/containers/:id/restart | Restart container |
| DELETE | /api/docker/containers/:id | Remove container |
| GET | /api/docker/containers/:id/logs | Container logs |
| GET | /api/docker/images | List images |
| POST | /api/docker/images/pull | Pull image |
| DELETE | /api/docker/images/:id | Remove image |
| GET | /api/docker/info | Docker system info |
