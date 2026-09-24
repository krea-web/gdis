import { describe, it, expect } from "vitest";
import { sentryLoaderUrl } from "./sentryLoader";

const KEY = "0123456789abcdef0123456789abcdef";

describe("sentryLoaderUrl", () => {
  it("EU DSN -> js-de.sentry-cdn.com", () => {
    expect(sentryLoaderUrl(`https://${KEY}@o4508000000000000.ingest.de.sentry.io/4508000000000001`)).toBe(
      `https://js-de.sentry-cdn.com/${KEY}.min.js`,
    );
  });

  it("explicit US DSN -> js.sentry-cdn.com", () => {
    expect(sentryLoaderUrl(`https://${KEY}@o123.ingest.us.sentry.io/456`)).toBe(
      `https://js.sentry-cdn.com/${KEY}.min.js`,
    );
  });

  it("DSN without region token -> js.sentry-cdn.com", () => {
    expect(sentryLoaderUrl(`https://${KEY}@o123.ingest.sentry.io/456`)).toBe(
      `https://js.sentry-cdn.com/${KEY}.min.js`,
    );
  });

  it("legacy sentry.io DSN -> js.sentry-cdn.com", () => {
    expect(sentryLoaderUrl(`https://${KEY}@sentry.io/456`)).toBe(`https://js.sentry-cdn.com/${KEY}.min.js`);
  });

  it("tolerates surrounding whitespace (value pasted into the env)", () => {
    expect(sentryLoaderUrl(`  https://${KEY}@o1.ingest.de.sentry.io/2\n`)).toBe(
      `https://js-de.sentry-cdn.com/${KEY}.min.js`,
    );
  });

  it.each([
    ["undefined", undefined],
    ["empty", ""],
    ["not a URL", "not-a-dsn"],
    ["no public key", "https://o1.ingest.de.sentry.io/2"],
    ["public key not 32 hex", "https://undefined@o1.ingest.de.sentry.io/2"],
    ["non-https", `http://${KEY}@o1.ingest.de.sentry.io/2`],
    ["self-hosted / non-Sentry host", `https://${KEY}@sentry.example.com/2`],
    ["look-alike host", `https://${KEY}@o1.ingest.de.sentry.io.evil.com/2`],
  ])("malformed DSN (%s) -> null", (_label, dsn) => {
    expect(sentryLoaderUrl(dsn)).toBeNull();
  });
});
