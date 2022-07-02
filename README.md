# Bark - Social Media for Dogs!

## Overview

<img src="./public/bark2.gif" alt="Project Overview GIF" width=70% height=auto>

## Table of Contents
- [Description](#description)
- [Installation](#installation-and-setup)
- [Technologies](#technologies)
- [Team Members](#contributors)

## Description
This website was created as a social media platform for users to connect their dogs with others! They are able to join groups and host/attend events that best fit their personalities. Users are able to befriend others and share thoughts through a chat functionality. Users, groups, and events are able to be searched sitewide in the navbar. Clicking on the map icon up top allows users to see markers where hosted events will be located at!

---

## Installation and Setup
1. Fork and clone the repo and navigate to the root directory.

2. To install dependencies:
```
npm install
```
3. Follow instructions in example.env file to create a .env.local file to allow access for Auth0, GoogleMapsAPI, and PostgreSQL DB

4. Run database build file to create schema for your Postgres database
```
npm run dbbuild
```

5. To run dev-build:
```
npm run dev
```

6. To run production-build:
```
npm run build
```
7. Open http://localhost:3000 in your browser

---

## Technologies
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [MantineUI](https://mantine.dev/)
---


### Contributors
- [Robert Campbell](https://github.com/recampbelljr)
- [Isaac Chung](https://github.com/imizik)
- [Jason Matta](https://github.com/jmatta9)
- [Kenny Tran](https://github.com/kennytran95)
- [Mike Zaki](https://github.com/Mikezaki94)
- [Fengji Zhang](https://github.com/fengjizhang)
