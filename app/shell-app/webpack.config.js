import "webpack-dev-server";

import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import HTMLWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import { tanstackRouter } from "@tanstack/router-plugin/webpack";

import packageJson from "./package.json" with { type: "json" };

const { ModuleFederationPlugin } = webpack.container;

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * @param {Record<string, any>} env
 * @param {{ mode: string }} argv
 * @returns {import("webpack").Configuration}
 */
function defineConfig({ WEBPACK_SERVE }, argv) {
  return {
    target: "web",
    mode: WEBPACK_SERVE ? "development" : "production",
    entry: "./src/main.ts",
    devtool: "inline-source-map",
    devServer: {
      static: {
        directory: path.resolve(__dirname, "public")
      },
      host: "0.0.0.0",
      port: 3000,
      hot: true
    },
    output: {
      clean: true,
      path: path.resolve(__dirname, "dist")
    },
    module: {
      // loader
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: "ts-loader",
          exclude: /node_modules/
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader", "postcss-loader"]
        }
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, "./public/index.html"),
        minify: "auto"
      }),
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
        enableRouteGeneration: false
      }),
      new ModuleFederationPlugin({
        name: "host",
        filename: "remoteEntry.js",
        remotes: {
          "@host": "host@http://localhost:3000/remoteEntry.js"
        },
        exposes: {
          "./store": "./src/store/remote.ts"
        },
        shared: {
          ...packageJson.dependencies,
          react: {
            eager: true,
            singleton: true,
            requiredVersion: packageJson.dependencies.react
          },
          "react-dom": {
            eager: true,
            singleton: true,
            requiredVersion: packageJson.dependencies["react-dom"]
          },
          zustand: {
            eager: true,
            singleton: true,
            requiredVersion: packageJson.dependencies["zustand"]
          }
        }
      })
    ]
  };
}

export default defineConfig;
