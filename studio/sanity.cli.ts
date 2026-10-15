import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "61myr3v6",
    dataset: "production",
  },
  // Hosted Studio address: https://dirtysouthbar.sanity.studio
  studioHost: "dirtysouthbar",
  autoUpdates: true,
});
