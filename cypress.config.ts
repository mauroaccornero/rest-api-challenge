import { defineConfig } from "cypress";

const cypressConfig = {
  e2e: {
    baseUrl: 'http://localhost:3000',
    env: {
      api_url: 'http://localhost:4000'
    }
  }
}

export default defineConfig(cypressConfig);
