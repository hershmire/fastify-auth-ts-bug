import { server } from "./app";

const PORT = process.env.PORT || 8080;

const start = async () => {
  try {
    await server.listen({
      port: parseInt(PORT.toString(), 10),
      host: "0.0.0.0",
    });
  } catch (err) {
    server.log.fatal(err, "Error starting service");
    process.exit(1);
  }
};

const stop = async (signal: "SIGTERM" | "SIGINT") => {
  try {
    server.log.info("Closing server");
    await server.close();

    server.log.info({ signal }, "Process terminated");
    process.exit(0);
  } catch (err) {
    server.log.fatal({ signal, err }, "Process terminated");
    process.exit(1);
  }
};

(async () => {
  process.on("SIGTERM", stop);
  process.on("SIGINT", stop);
  process.on("uncaughtException", async (err) => {
    server.log.fatal({ err }, "Uncaught exception, closing server");
    try {
      await server.close();
    } catch (innerErr) {
      server.log.fatal(
        { err: innerErr },
        "Error closing service on uncaught exception",
      );
    }
    process.exit(1);
  });

  await start();
})();
