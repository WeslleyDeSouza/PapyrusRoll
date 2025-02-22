# Papyrusroll

This repository is a showcase project for my portfolio and CV, demonstrating expertise in full-stack development using Nx, NestJS, Swagger, and Angular. PapyrusRoll simplifies document creation, organization, and management with smart automation.

![Banner](https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/The_judgement_of_the_dead_in_the_presence_of_Osiris.jpg/1000px-The_judgement_of_the_dead_in_the_presence_of_Osiris.jpg)

### Architecture
Generated from Code:

```mermaid
---
title: NX Project Architecture
---
flowchart LR
%% defining styles
    classDef app fill:#f7e081,stroke:#333,stroke-width:1px
    classDef e2e fill:#81d4fa,stroke:#333,stroke-width:1px
    classDef lib fill:#c5e1a5,stroke:#333,stroke-width:1px
    classDef db fill:#ffccbc,stroke:#333,stroke-width:1px
    classDef proxy fill:#bdbdbd,stroke:#333,stroke-width:1px

%% defining entities
    nginx[Nginx Proxy]:::proxy

    subgraph UI [UI Services]
        direction TB
        uiShell[uiShell]:::app
        uiDoc[uiDoc]:::app
        uiAuth[uiAuth]:::app
    end

    subgraph Backend [Backend Services]
        direction TB
        apiShell[apiShell]:::app
        apiDoc[apiDoc]:::app
        apiAuth[apiAuth]:::app
        
        subgraph Databases [Databases]
            direction TB
            mysqlAuth[(MySQL - Auth)]:::db
            mysqlDoc[(MySQL - Documents)]:::db
        end
    end

    subgraph Libraries [Shared Libraries]
        direction TB
        auth[auth]:::lib
        core[core]:::lib
    end

    subgraph E2E Tests [E2E Testing]
        direction TB
        apiDocE2E[apiDoc-e2e]:::e2e
        apiAuthE2E[apiAuth-e2e]:::e2e
        uiDocE2E[uiDoc-e2e]:::e2e
        uiAuthE2E[uiAuth-e2e]:::e2e
    end

%% defining dependencies
    nginx --> uiShell & uiDoc & uiAuth
    nginx --> apiShell & apiDoc & apiAuth
    
    uiAuth -->|static| auth
    uiShell -->|static| core
    uiShell -->|static| auth
    uiShell -->|dynamic| uiDoc
    uiShell -->|dynamic| uiAuth

    core -->|static| auth

    apiAuth -->|stores data| mysqlAuth
    apiDoc -->|stores data| mysqlDoc

    apiDocE2E -->|implicit| apiDoc
    apiAuthE2E -->|implicit| apiAuth
    uiDocE2E -->|implicit| uiDoc
    uiAuthE2E -->|implicit| uiAuth
 
```

### Getting started

``npx nx serve uiShell``
