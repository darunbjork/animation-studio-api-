import client from 'prom-client';

client.collectDefaultMetrics();

export const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request latency',
  labelNames: ['method', 'route', 'status'],
});

export { client };
