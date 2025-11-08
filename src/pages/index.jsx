import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../layout/LayoutPublic";
import NotFound from "./NotFound";
import Home from "./Home";
import ParticipantsList from "./ParticipantList";
import RegistrationForm from "./RegistrationForm";
import Badge from "./Badge";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPublic />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/participantes",
        element: <ParticipantsList />
      },
      {
        path: "/registro",
        element: <RegistrationForm />
      },
      {
        path: "/gafete/:id",
        element: <Badge />
      }
    ],
  },
]);
