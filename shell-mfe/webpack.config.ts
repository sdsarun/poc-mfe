import "webpack-dev-server";

import packageJson from "./package.json" with { type: "json" };

import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

import webpack from "webpack";
import { type Configuration } from "webpack";

const { container } = webpack;

const { ModuleFederationPlugin } = container;

const __dirname = dirname(fileURLToPath(import.meta.url));

export default function defineConfig(): Configuration {
  return {
    mode: "development",
    entry: "./src/bootstrap.ts",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].bundle.js",
      publicPath: "auto",
      clean: true
    },
    devServer: {
      port: 4000,
      hot: true,
      liveReload: true,
      host: "0.0.0.0",
      static: {
        directory: path.resolve(__dirname, "public")
      },
      historyApiFallback: true
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true
              }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: "asset/resource",
          generator: { filename: "assets/images/[name].[hash][ext]" }
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader", "postcss-loader"]
        }
      ]
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      alias: {
        "@": path.resolve(__dirname, "src"),
        assets: path.resolve(__dirname, "public")
      }
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "public",
            force: true,
            to: "",
            globOptions: {
              ignore: ["**/index.html"]
            }
          }
        ]
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
        publicPath: "auto",
        minify: "auto",
        title: "Shell App"
      }),
      new ModuleFederationPlugin({
        name: "shell_mfe",
        filename: "remoteEntry.js",
        exposes: {
          "./components": "./src/components/remote-expose.ts",
          "./i18n": "./src/i18n/remote-expose.ts",
          "./styles": "./src/styles.css",
        },
        remotes: {
          "@shell_mfe": 'shell_mfe@http://localhost:4000/remoteEntry.js', 
          "@home_mfe": "home_mfe@http://localhost:4001/remoteEntry.js",
        },
        shared: {
          ...packageJson.dependencies,
          "i18next-browser-languagedetector": {
            eager: true,
            requiredVersion: packageJson.dependencies["i18next-browser-languagedetector"],
            singleton: true
          },
          "i18next": {
            eager: true,
            requiredVersion: packageJson.dependencies["i18next"],
            singleton: true
          },
          "react-i18next": {
            eager: true,
            requiredVersion: packageJson.dependencies["react-i18next"],
            singleton: true
          },
          "@tanstack/react-query": {
            eager: true,
            requiredVersion: packageJson.dependencies["@tanstack/react-query"],
            singleton: true
          },
          "@tanstack/react-router": {
            eager: true,
            requiredVersion: packageJson.dependencies["@tanstack/react-router"],
            singleton: true
          },
          react: {
            eager: true,
            requiredVersion: packageJson.dependencies.react,
            singleton: true
          },
          "react-dom": {
            eager: true,
            requiredVersion: packageJson.dependencies["react-dom"],
            singleton: true
          }
        }
      })
    ]
  };
}
