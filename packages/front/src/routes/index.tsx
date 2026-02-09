import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import type React from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

const handleSubmit = (
  e: React.SubmitEvent<HTMLFormElement>,
  navigateHook: ReturnType<typeof useNavigate>,
) => {
  e.preventDefault();
  console.log("submit");
  const formData = new FormData(e.target);
  const steamId = formData.get("steamId");
  navigateHook({ to: `/${steamId}/result` });
};

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Obten un paquete de juegos aleatorio</h1>
      <form onSubmit={(e) => handleSubmit(e, navigate)}>
        <label>
          Name: <input type="text" name="steamId" />
        </label>
        <button type="submit">Mi boton</button>
      </form>
    </>
  );
}
