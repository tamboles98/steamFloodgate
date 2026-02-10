import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type React from "react";

import SteamIdForm from "../components/SteamIdForm";
import "./index.css";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

const createHandleSubmit = (navigateHook: ReturnType<typeof useNavigate>) => {
  return (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
    const formData = new FormData(e.target);
    const steamId = formData.get("steamId");
    navigateHook({ to: `/${steamId}/result` });
  };
};

function RouteComponent() {
  const navigate = useNavigate();
  const handleSubmit = createHandleSubmit(navigate);

  return (
    <>
      <h1>Obtén un paquete de juegos aleatorio</h1>
      <SteamIdForm submitHandler={handleSubmit} />
    </>
  );
}
