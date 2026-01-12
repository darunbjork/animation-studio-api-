export function setupGracefulShutdown(server: any) {
  const shutdown = async () => {
    console.log("🛑 Graceful shutdown started");

    server.close(() => {
      console.log("HTTP server closed");
      process.exit(0);
    });

    setTimeout(() => {
      console.error("Force exit");
      process.exit(1);
    }, 10000);
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}
