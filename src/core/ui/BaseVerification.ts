import { expect, Locator, Page } from "@playwright/test";


export class BaseVerification {
    static async verifyPageTitle(page: Page, expectedTitle: string, timeout: number = 5000) {
        await expect(page).toHaveTitle(expectedTitle, { timeout });
    }
    
    static async verifyText(locator: Locator, expectedText: string | RegExp, timeout: number = 5000) {
        const locatorStr = locator.toString();
        const errorVisibleMsg = `Expected locator ${locatorStr} to be visible`;
        await expect(locator, errorVisibleMsg).toBeVisible({ timeout });
        const errorHaveTextMsg = `Expected locator ${locatorStr} to have text "${expectedText}"`;
        await expect(locator, errorHaveTextMsg).toHaveText(expectedText, { timeout });
    }

    static async verifyCurrentUrl(page: Page, expectedUrl: string | RegExp, timeout: number = 5000) {
        const errorMsg = `Expected current URL to match "${expectedUrl}"`;
        await expect(page, errorMsg).toHaveURL(expectedUrl, { timeout });
    }

    static async verifyFieldInvalid(fieldLocator: Locator, timeout: number = 5000) {
        const errorMsg = `Expected browser validation tooltip to be displayed for locator ${fieldLocator.toString()}`;
        const isInvalid = await fieldLocator.evaluate(el => el.matches(":invalid"), { timeout });
        expect(isInvalid, errorMsg).toBe(true);
    }
}