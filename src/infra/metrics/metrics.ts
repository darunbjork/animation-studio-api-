import client from "prom-client";

client.collectDefaultMetrics();

export const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["method", "route", "status"],
});

export { client };
