import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: "dark",
      themes: {
        dark: {
          dark: true,
          colors: {
            primary: "#667eea",
            secondary: "#764ba2",
            accent: "#4facfe",
            background: "#0a0a0a",
            surface: "#1a1a1a",
            error: "#ff5252",
            info: "#2196f3",
            success: "#4caf50",
            warning: "#ff9800",
            text: "#ffffff",
            "on-primary": "#ffffff",
            "on-secondary": "#ffffff",
            "on-background": "#ffffff",
            "on-surface": "#ffffff",
          },
        },
        light: {
          dark: false,
          colors: {
            primary: "#667eea",
            secondary: "#764ba2",
            accent: "#4facfe",
            background: "#f5f6fa",
            surface: "#ffffff",
            error: "#ff5252",
            info: "#2196f3",
            success: "#4caf50",
            warning: "#ff9800",
            text: "#171717",
            "on-primary": "#ffffff",
            "on-secondary": "#ffffff",
            "on-background": "#222222",
            "on-surface": "#222222",
          },
        },
      },
    },
  });
  app.vueApp.use(vuetify);
});
