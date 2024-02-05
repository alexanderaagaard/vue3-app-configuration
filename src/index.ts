import { App, InjectionKey } from "vue";
import {
  AppConfigurationClient,
  featureFlagPrefix,
  isFeatureFlag,
  parseFeatureFlag,
} from "@azure/app-configuration";

interface FeatureFlagsManager {
  getFeatureFlag(name: string, label?: string): Promise<boolean>;
}

const featureFlagsManager = (
  connectionString?: string
): FeatureFlagsManager => {
  let client: AppConfigurationClient | null = null;

  if (connectionString) {
    client = new AppConfigurationClient(connectionString);
  }

  return {
    async getFeatureFlag(name: string, label?: string) {
      if (!client) {
        console.warn(
          "[App Configuration Plugin] AppConfigurationClient is not initialized."
        );
        return false;
      }
      try {
        const response = await client.getConfigurationSetting({
          key: `${featureFlagPrefix}${name}`,
          label,
        });

        if (!isFeatureFlag(response)) return false;
        return parseFeatureFlag(response).value.enabled;
      } catch (error) {
        console.error(
          "[App Configuration Plugin] Error fetching feature flag.",
          error
        );
        return false;
      }
    },
  };
};

const FeatureFlagsManagerKey: InjectionKey<FeatureFlagsManager> = Symbol(
  "FeatureFlagsManager"
);

function AppConfigurationPlugin(app: App, connectionString?: string) {
  app.provide(FeatureFlagsManagerKey, featureFlagsManager(connectionString));
}

export { FeatureFlagsManagerKey, AppConfigurationPlugin };
