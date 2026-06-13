# 🚀 End-to-End CI/CD Pipeline for Web Applications on AWS

## 📌 Project Overview

This project demonstrates a complete production-ready CI/CD pipeline for deploying containerized web applications on AWS.

The pipeline automates the entire software delivery lifecycle, from code commit to production deployment, using industry-standard DevOps tools and AWS services.

The solution integrates GitHub, Jenkins, SonarQube, Docker, Amazon ECR, Amazon ECS, Application Load Balancer (ALB), CloudWatch, Nexus Repository, and Slack to provide a fully automated deployment workflow.

---

## 🎯 Objectives

* Automate software build, test, and deployment processes
* Improve code quality using SonarQube Quality Gates
* Containerize applications using Docker
* Store container images securely in Amazon ECR
* Deploy applications automatically to Amazon ECS
* Route traffic through Application Load Balancer (ALB)
* Monitor infrastructure and applications using CloudWatch
* Store build artifacts in Nexus Repository
* Receive real-time build notifications through Slack

---

# 🏗️ CI/CD Pipeline Workflow

```text
Developer Push Code
        │
        ▼
GitHub Webhook Trigger
        │
        ▼
Jenkins Pipeline
        │
        ├── Fetch Source Code
        ├── Install Dependencies
        ├── Unit Testing
        ├── ESLint Analysis
        ├── SonarQube Analysis
        ├── Quality Gate Validation
        ├── Docker Build
        ├── Archive Docker Artifact
        └── Push Docker Image
        │
        ▼
Amazon ECR
        │
        ▼
Amazon ECS Deployment
        │
        ▼
Application Load Balancer
        │
        ▼
Production Application
        │
        ├── CloudWatch Monitoring
        ├── Nexus Artifact Storage
        └── Slack Notifications
```

---

# ⚙️ Technologies Used

### Version Control

* Git
* GitHub

### CI/CD

* Jenkins
* GitHub Webhooks

### Code Quality

* SonarQube
* ESLint

### Containerization

* Docker

### Artifact Management

* Nexus Repository

### AWS Services

* Amazon ECR
* Amazon ECS (Fargate)
* Application Load Balancer (ALB)
* Amazon CloudWatch

### Notifications

* Slack

---

# 🔄 Pipeline Stages

## 1. Source Code Management

Developers push code to GitHub repository.

GitHub Webhook automatically triggers the Jenkins pipeline.

---

## 2. Build Stage

Jenkins performs:

```bash
npm install
```

to install project dependencies.

---

## 3. Testing Stage

Unit tests are executed:

```bash
npm test
```

to validate application functionality.

---

## 4. Static Code Analysis

ESLint validates coding standards:

```bash
npm run lint
```

---

## 5. SonarQube Analysis

Jenkins scans source code using SonarQube to detect:

* Bugs
* Vulnerabilities
* Code Smells
* Security Issues

---

## 6. Quality Gate

The pipeline waits for SonarQube Quality Gate results.

If Quality Gate fails:

```text
Deployment is stopped.
```

---

## 7. Docker Build

Docker image is created automatically.

```bash
docker build
```

---

## 8. Artifact Archiving

Docker image is exported and archived as:

```text
devops-dashboard.tar
```

---

## 9. Push Image to Amazon ECR

Docker image is pushed to:

```text
Amazon Elastic Container Registry (ECR)
```

with:

* Build Number Tag
* Latest Tag

---

## 10. Deploy to Amazon ECS

Jenkins triggers ECS deployment:

```bash
aws ecs update-service --force-new-deployment
```

ECS pulls the latest image from ECR and deploys the updated container.

---

## 11. Traffic Routing

Application Load Balancer (ALB) distributes traffic to ECS tasks.

Benefits:

* High Availability
* Load Distribution
* Fault Tolerance

---

## 12. Monitoring

Amazon CloudWatch provides:

* Application Logs
* ECS Metrics
* Infrastructure Monitoring
* Alerts and Notifications

---

## 13. Artifact Storage

Build artifacts are uploaded to Nexus Repository.

Benefits:

* Artifact Versioning
* Artifact Retention
* Centralized Storage

---

## 14. Notifications

Slack notifications are sent automatically after each build.

Status:

* Success
* Failure
* Unstable

---

# ☁️ AWS Architecture

```text
Users
   │
   ▼
Route 53
   │
   ▼
Application Load Balancer
   │
   ▼
Amazon ECS Cluster
   │
   ▼
Web Application Container
   │
   ├── CloudWatch Logs
   └── CloudWatch Metrics

Docker Images
   │
   ▼
Amazon ECR
```

---

# ✅ Key Features

* Fully Automated CI/CD Pipeline
* GitHub Webhook Integration
* Jenkins Automation
* SonarQube Quality Gates
* Docker Containerization
* Amazon ECR Integration
* Amazon ECS Deployment
* Application Load Balancer
* CloudWatch Monitoring
* Nexus Artifact Repository
* Slack Notifications
* Production-Ready AWS Infrastructure

---

# 📊 Benefits

* Faster Release Cycles
* Improved Code Quality
* Reduced Manual Effort
* Automated Deployments
* Better Monitoring & Visibility
* Scalable AWS Infrastructure
* Secure Artifact Management

---

# 🚀 Future Enhancements

* Infrastructure as Code using Terraform
* Kubernetes Deployment (EKS)
* Blue/Green Deployments
* Canary Releases
* Prometheus & Grafana Monitoring
* Multi-Environment Deployment (Dev, QA, Prod)

---

# 👨‍💻 Author

**Aryan**

DevOps Engineer | AWS | Docker | Jenkins | Kubernetes | CI/CD | Linux

LinkedIn: https://linkedin.com/in/aryan-95
GitHub: https://github.com/aryan-95

