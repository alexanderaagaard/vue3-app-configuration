# vue3-app-configuration

Vue 3 plugin that provides an easy way to manage feature flags in your Vue 3 application through Azure App Configuration. This plugin allows you to use feature flags and toggle between different environments.

## Installation

```
npm install vue3-app-configuration
```

## Get started

To use vue3-app-configuration, you need to initialize it in your main application file, typically main.ts or main.js.

```ts
import { createApp } from "vue";
import App from "./App.vue";
import { AppConfigurationPlugin } from "vue3-app-configuration";

const app = createApp(App);

app.use(
  AppConfigurationPlugin,
  "your-azure-configuration-readonly-connection-string"
);

app.mount("#app");
```

Replace 'your-azure-configuration-readonly-connection-string' with your actual connection string. For help with setting up a connection string and using feature flags in Azure, check out this guide: [Feature Flags in Vue with Azure App Configuration](https://www.tvaidyan.com/2022/07/14/feature-flags-in-vue-with-azure-app-configuration).

## Using in Vue Components

You can use the `vue3-app-configuration` plugin in your Vue components in two ways: using an async non-reactive method or a non-blocking reactive method.

### Reactive Usage

```html
<script setup lang="ts">
  import { useFeatureFlags } from "vue3-app-configuration";

  const { getFeatureFlag } = useFeatureFlags();

  const { isFeatureEnabled, featureDescription } = getFeatureFlag(
    "your-feature-flag-name",
    "your-label"
  );
</script>

<template>
  <p v-if="isFeatureEnabled">{{ featureDescription }}</p>
  <p v-else>This feature is disabled</p>
</template>
```

### Non-Reactive Usage

```html
<script setup lang="ts">
  import { onMounted } from "vue";
  import { useFeatureFlags } from "vue3-app-configuration";

  const { getFeatureFlagAsync } = useFeatureFlags();

  onMounted(async () => {
    const { isFeatureEnabled, featureDescription } = await getFeatureFlagAsync(
      "your-feature-flag-name",
      "your-label"
    );
  });
</script>
```

## AppConfigurationClient

The AppConfigurationClient instance is exposed at `this.featureFlagsManager.appConfigurationClient`.

Inspired by

- [@azure/app-configuration](https://www.npmjs.com/package/@azure/app-configuration)
- [vue3-application-insights](https://www.npmjs.com/package/vue3-application-insights)
- [Feature Flags in Vue with Azure App Configuration](https://www.tvaidyan.com/2022/07/14/feature-flags-in-vue-with-azure-app-configuration)
