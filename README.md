# Papyrusroll

This repository is a showcase project for my portfolio and CV, demonstrating expertise in full-stack development using Nx, NestJS, Swagger, and Angular. PapyrusRoll simplifies document creation, organization, and management with smart automation.

![Banner](https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/The_judgement_of_the_dead_in_the_presence_of_Osiris.jpg/1000px-The_judgement_of_the_dead_in_the_presence_of_Osiris.jpg)

### Architecture
Generated from Code:

```mermaid
---
title: NX Project Architecture
---
flowchart TD

%% Styles
    classDef app fill:#2c2c2c,stroke:#fff,stroke-width:1px,color:#fff
    classDef service fill:#444,stroke:#fff,stroke-width:1px,color:#fff
    classDef db fill:#777,stroke:#fff,stroke-width:1px,color:#fff
    classDef proxy fill:#999,stroke:#fff,stroke-width:1px,color:#fff
    classDef e2e fill:#555,stroke:#fff,stroke-width:1px,color:#fff

%% Defining Entities
    subgraph "Frontend Services"
        direction TB
        uiShell["UI Shell"]:::service
        uiDoc["UI Documents"]:::service
        uiAuth["UI Auth"]:::service
    end

    subgraph "Backend Services"
        direction TB
        apiShell["API Shell"]:::service
        apiDoc["API Documents"]:::service
        apiAuth["API Auth"]:::service
        subgraph "Databases"
            mysqlAuth["MySQL - Auth"]:::db
            mysqlDoc["MySQL - Documents"]:::db
        end
    end

    nginx["Nginx Proxy"]:::proxy

    subgraph "E2E Testing"
        direction TB
        apiDocE2E["apiDoc-e2e"]:::e2e
        apiAuthE2E["apiAuth-e2e"]:::e2e
        uiDocE2E["uiDoc-e2e"]:::e2e
        uiAuthE2E["uiAuth-e2e"]:::e2e
    end

%% Defining Dependencies
    uiShell -->|HTTP| nginx
    uiDoc -->|HTTP| nginx
    uiAuth -->|HTTP| nginx

    nginx -->|HTTP| apiShell
    nginx -->|HTTP| apiDoc
    nginx -->|HTTP| apiAuth

    apiAuth -->|Stores Data| mysqlAuth
    apiDoc -->|Stores Data| mysqlDoc

    uiAuth --> auth
    uiShell --> core
    uiShell --> uiDoc
    uiShell --> uiAuth

    core --> auth

    apiDocE2E -->|Tests| apiDoc
    apiAuthE2E -->|Tests| apiAuth
    uiDocE2E -->|Tests| uiDoc
    uiAuthE2E -->|Tests| uiAuth
 
```

### Getting started

``npx nx serve uiShell``
