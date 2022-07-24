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
    setupFiles: ["@testing-library/react/dont-cleanup-after-each"],
    mockReset: true,
    coverage: {
      src: ["lib"],
      reporter: ["text", "lcov"],
      all: true,
      exclude: ["lib/**/index.ts", "lib/types.ts", "*.d.ts"],
      100: true,
    },
  },
});
