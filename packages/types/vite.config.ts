import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      name: "types",
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es", "umd"],
      fileName: (format) => `types.${format}.js`,
    },
    rollupOptions: {},
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src/"),
    },
  },
});
