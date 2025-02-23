/**
 * @file openapi-generator.js
 * @description This script processes OpenAPI specifications and generates TypeScript API clients
 *              for Angular applications using NgOpenApiGen.
 * @author Weslley De Souza
 * @date 2025-02-23
 * @version 1.0
 *
 * @dependencies
 *  - fs (File System) - for reading files from the filesystem
 *  - path - for handling and transforming file paths
 *  - json-schema-ref-parser - for resolving OpenAPI references
 *  - ng-openapi-gen - for generating Angular services from OpenAPI specifications
 *
 * @usage
 *  1. Place OpenAPI JSON spec files in the "./config/swagger" directory.
 *  2. Ensure the filenames follow the pattern `[appName]-spec.json`.
 *  3. Run the script to generate Angular API clients under "./libs/app/generated".
 *
 * @license MIT
 */

const fs = require('fs');
const path = require('path');
const $RefParser = require('json-schema-ref-parser');
const { NgOpenApiGen } = require('ng-openapi-gen');

const configPath = path.resolve('./config/swagger');
const outputPath = path.resolve('./libs/app/generated');

const options = {
  ignoreUnusedModels: false,
};

// Get all files matching the pattern `[appName]*-spec.json` in the `config/swagger` directory
const specFiles = fs
  .readdirSync(configPath)
  .filter((file) => file.endsWith('-spec.json'));

// Process each file
(async () => {
  for (const file of specFiles) {
    const appName = file.split('-spec.json')[0]; // Extract appName from file name
    const inputFile = path.join(configPath, file);
    const outputDir = path.join(outputPath, appName);

    console.log(`Processing ${file}...`);

    try {
      // Load and resolve OpenAPI specification
      const RefParser = new $RefParser();
      const openApi = await RefParser.bundle(inputFile, {
        dereference: { circular: false },
      });

      // Configure options for NgOpenApiGen
      const ngOpenGenOptions = {
        ...options,
        input: inputFile,
        output: outputDir,
      };

      // Generate code
      const ngOpenGen = new NgOpenApiGen(openApi, ngOpenGenOptions);
      ngOpenGen.generate();

      console.log(`Generated API for ${appName} at ${outputDir}`);
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
})();
