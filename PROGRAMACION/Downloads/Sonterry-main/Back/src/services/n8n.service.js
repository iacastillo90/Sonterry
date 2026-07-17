const axios = require('axios');
const env = require('../config/env');
const logger = require('../logs/logger');

const triggerN8nWorkflow = async (payload) => {
  if (!env.N8N_WEBHOOK_URL) {
    logger.warn('[n8n Service] N8N_WEBHOOK_URL is not defined. Skipping trigger.');
    return null;
  }

  try {
    const headers = { 'Content-Type': 'application/json' };
    if (env.N8N_API_KEY) {
      headers['Authorization'] = `Bearer ${env.N8N_API_KEY}`;
    }

    const response = await axios.post(env.N8N_WEBHOOK_URL, payload, { headers, timeout: 10000 });
    logger.info('[n8n Service] Workflow triggered successfully.', { status: response.status });
    return response.data;
  } catch (error) {
    logger.error(`[n8n Service] Failed to trigger workflow: ${error.message}`);
    throw error; // Throw error so BullMQ handles retries and backoff
  }
};

module.exports = { triggerN8nWorkflow };
