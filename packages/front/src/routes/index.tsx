import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

const clickHandler = () => {
  console.log("Button clicked!");
};

function RouteComponent() {
  return (
    <>
      <h1>Obten un paquete de juegos aleatorio</h1>
      <button onClick={clickHandler}>
        <a href="/result">Mi boton</a>
      </button>
    </>
  );
}
