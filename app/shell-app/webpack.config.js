import "webpack-dev-server";
import path from "node:path";
import HTMLWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import { tanstackRouter } from "@tanstack/router-plugin/webpack";

const { ModuleFederationPlugin } = webpack.container;

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
      static: "./dist",
      host: "0.0.0.0",
      port: 3000,
      hot: true
    },
    output: {
      clean: true,
      path: path.resolve(import.meta.dirname, "dist")
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
        template: path.resolve(import.meta.dirname, "./public/index.html"),
        minify: "auto"
      }),
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
        enableRouteGeneration: false,
      }),
      new ModuleFederationPlugin({
        name: "host",
        filename: "remoteEntry.js"
      })
    ]
  };
}

export default defineConfig;
