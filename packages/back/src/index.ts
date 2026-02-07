import { buildApp } from "./app.js";
import { buildServices } from "./services.js";
import { buildUseCases } from "./useCases.js";

async function main() {
  const services = buildServices();
  const useCases = buildUseCases(services);
  const app = buildApp(useCases);
  app.listen({ port: 3000 }, function (err) {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  });
  process.on("SIGINT", () => {
    app.log.info("Shutting down server...");
    app.close(() => {
      app.log.info("Server closed");
      process.exit(0);
    });
  });
}

main();
