# NovaCore LMS Pro Deployment Guide

## Frontend

Platform

GitHub Pages

Repository

novacore-lms-pro

Build

Static HTML, CSS, JavaScript

---

## Backend

Platform

Render

Runtime

Node.js

Root Directory

server

Build Command

npm install

Start Command

npm start

---

## Database

Platform

MongoDB Atlas

Cluster

Free M0 Cluster

Database Name

novacore_lms_pro

---

## Environment Variables

PORT

MONGODB_URI

JWT_SECRET

NODE_ENV

---

## Folder Structure

client/

server/

database/

deployment/

README.md

---

## Production Checklist

✓ GitHub Repository Created

✓ MongoDB Atlas Connected

✓ Backend Environment Variables Added

✓ GitHub Pages Enabled

✓ Render Service Connected

---

## Security Checklist

Never upload

.env

node_modules

uploads/temp

Always upload

Source Code

README.md

package.json

Documentation

---

## .gitignore

node_modules/

.env

uploads/temp/

npm-debug.log

.DS_Store
# Production Deployment

## Frontend URL

https://your-username.github.io/novacore-lms-pro/

---

## Backend URL

https://your-backend-name.onrender.com

---

## API Base URL

https://your-backend-name.onrender.com/api

---

## Custom Domain (Optional)

www.yourdomain.com

---

## SSL

Enable HTTPS

Use valid SSL certificate

Redirect HTTP to HTTPS

---

# Final Testing Checklist

Frontend

✓ Responsive on Mobile

✓ Responsive on Tablet

✓ Responsive on Desktop

✓ Navigation Working

✓ Contact Form Connected

✓ Login/Register Working

✓ Course Pages Working

Backend

✓ MongoDB Connected

✓ Authentication Working

✓ JWT Verified

✓ Protected Routes Working

✓ Course CRUD Working

✓ Contact API Working

✓ File Upload Working

Database

✓ Collections Created

✓ Indexes Enabled

✓ Backups Configured

Security

✓ Passwords Encrypted

✓ Environment Variables Hidden

✓ HTTPS Enabled

✓ CORS Configured

Performance

✓ Images Optimized

✓ CSS Minified (Production)

✓ JavaScript Minified (Production)

✓ Fast Loading Time

---

# Client Handover

Provide

- GitHub Repository
- Frontend URL
- Backend URL
- Admin Login
-
