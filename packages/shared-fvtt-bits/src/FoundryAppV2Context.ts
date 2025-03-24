import React, { useContext } from "react";

export const FoundryAppV2Context =
  React.createContext<foundry.applications.api.ApplicationV2 | null>(null);

export const useFoundryAppV2 = () => {
  const application = useContext(FoundryAppV2Context);
  if (application === null) {
    throw new Error(
      "useFoundryAppV2 must be used within a Foundry application",
    );
  }
  if (!(application instanceof foundry.applications.api.ApplicationV2)) {
    throw new Error(
      "useFoundryAppV2 must be used within a Foundry AppV2 application (this was V1)",
    );
  }
  return application;
};
