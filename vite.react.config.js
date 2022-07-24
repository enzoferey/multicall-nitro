/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/react.ts"),
      name: "multicall-nitro-react",
      fileName: "multicall-nitro-react",
    },
    rollupOptions: {
      external: ["react", "@makerdao/multicall"],
      output: {
        globals: {
          react: "React",
          "@makerdao/multicall": "Multicall",
        },
      },
    },
  },
  plugins: [dts()],
});
