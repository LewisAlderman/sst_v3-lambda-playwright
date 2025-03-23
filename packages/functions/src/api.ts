import { Resource } from "sst";
import { Handler } from "aws-lambda";
import { Example } from "@sst-pdf-lambda-demo/core/example";
// import {getBrowser, getBrowserContext} from "@sst-pdf-lambda-demo/core/playwright";

import {Browser, chromium as pw} from "playwright";
import chromium from '@sparticuz/chromium';

const LOCAL_CHROMIUM_PATH = "/Users/lewisalderman/Library/Caches/ms-playwright/chromium-1161/chrome-mac/Chromium.app/Contents/MacOS/Chromium";

export const getBrowser = async () => pw.launch({
	headless: true,
	devtools: false,
	executablePath: process.env.SST_DEV
    ? LOCAL_CHROMIUM_PATH
    : await chromium.executablePath(),
	args: [
		"--disable-dev-shm-usage",
		"--disable-setuid-sandbox",
		"--disk-cache-size=33554432",
		"--no-sandbox",
		"--single-process",
		"--disable-gpu",
	],
});

export const getBrowserContext = (browser: Browser) => browser.newContext({ ignoreHTTPSErrors: true });

export const handler: Handler = async (_event) => {
  const browser = await getBrowser();
  const context = await getBrowserContext(browser);
  
  // simple open close op for playwright
  const page = await context.newPage();
  await page.goto("https://example.com");
  const title = await page.title();
  console.log(`Title: ${title}`);
  await page.close();
  await context.close();
  await browser.close();

  return {
    statusCode: 200,
    body: `Title is: ${title}`,
    // body: `${Example.hello()} Linked to ${Resource.MyBucket.name}.`,
  };
};
