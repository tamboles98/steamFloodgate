import { Outlet, createRootRoute } from "@tanstack/react-router";
import * as React from "react";
import { HomeBeacon } from "../components/HomeBeacon";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <HomeBeacon />
      <Outlet />
    </React.Fragment>
  );
}
