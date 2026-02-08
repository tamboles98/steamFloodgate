import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/result")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <p>Aquí es donde tendremos los resultados cuando los implementemos</p>
    </div>
  );
}
