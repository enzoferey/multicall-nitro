/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/index.ts"),
      name: "multicall-nitro",
      fileName: "multicall-nitro",
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
  test: {
    coverage: {
      src: ["lib"],
      reporter: ["lcov"],
      all: true,
      exclude: ["lib/index.ts", "lib/types.ts"],
      100: true,
    },
  },
});
