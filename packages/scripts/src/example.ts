import { Resource } from "sst";
import { Example } from "@sst-pdf-lambda-demo/core/example";

console.log(`${Example.hello()} Linked to ${Resource.MyBucket.name}.`);
