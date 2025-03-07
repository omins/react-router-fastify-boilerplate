import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import relay from "vite-plugin-relay-lite";

export default defineConfig({
  plugins: [reactRouter(), relay()],
});
