import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "61myr3v6",
    dataset: "production",
  },
  // Hosted Studio address: https://dirtysouthbar.sanity.studio
  studioHost: "dirtysouthbar",
  deployment: {
    appId: "uawmyup0nnq7wtr79lgr0ng1",
    autoUpdates: true,
  },
});
