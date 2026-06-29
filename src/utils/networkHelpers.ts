import { Page } from "@playwright/test";

/**
 * To mock response for a given url
 * @param page page
 * @param url url in string or RegExp to match
 * @param body body data to return
 * @param options { status?: number, header?: Record<string, string>, contentType?: string } to set
 */
export async function mockResponse(page: Page, url: string | RegExp, body: unknown, options?: { status?: number, header?: Record<string, string>, contentType?: string }) {
    await page.context().route(url, async route => 
        await route.fulfill({
            status: options?.status || 200,
            headers: options?.header,
            contentType: options?.contentType,
            body: JSON.stringify(body)
        })
    );
}

/**
 * To abort a request
 * @param page page
 * @param url url in string or RegExp to match
 */
export async function abortRequest(page: Page, patterns: (string | RegExp)[]) {
    const context = page.context();
    for (const pattern of patterns) {
        await context.route(pattern, route => route.abort());
    }
}

export async function blockAds(page: Page) {
    const blockHosts = ["**googleads**", "**adsbygoogle**"];
    await abortRequest(page, blockHosts);
}