import { bucket } from "./storage";

export const myApi = new sst.aws.Function("MyApi", {
  url: true,
  link: [bucket],
  handler: "packages/functions/src/api.handler",
  memory: "2 GB",
  timeout: "15 minutes",
  nodejs: {
    esbuild: {
     external: ["chrome-aws-lambda", "chromium-bidi"],
    },
    install: ["@sparticuz/chromium", "playwright"],
  },
  layers: [
    "arn:aws:lambda:eu-west-2:764866452798:layer:chrome-aws-lambda:50"
  ]
});
