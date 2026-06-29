import { expect, Locator, Page } from "@playwright/test";


export class BaseVerification {

    static async expectWithLog(
        expectation: () => Promise<void> | void,
        message: string,
        timeout: number = 5000
    ): Promise<void> {
        await expectation();
        console.log(`[VERIFICATION] => PASSED: ${message}`);
    }
    static async verifyPageTitle(page: Page, expectedTitle: string, timeout: number = 5000) {
        // await expect(page).toHaveTitle(expectedTitle, { timeout });
        const errorMsg = `Expected page title to be "${expectedTitle}"`;
        await this.expectWithLog(() => expect(page, errorMsg).toHaveTitle(expectedTitle, { timeout }), `${errorMsg}`);
    }
    
    static async verifyText(locator: Locator, expectedText: string | RegExp, timeout: number = 5000) {
        const locatorStr = locator.toString();
        const errorVisibleMsg = `Expected locator "${locatorStr}" to be visible`;
        // await expect(locator, errorVisibleMsg).toBeVisible({ timeout });
        await this.expectWithLog(() => expect(locator, errorVisibleMsg).toBeVisible({ timeout }), errorVisibleMsg);
        const errorHaveTextMsg = `Expected locator "${locatorStr}" to have text "${expectedText}"`;
        // await expect(locator, errorHaveTextMsg).toHaveText(expectedText, { timeout });
        await this.expectWithLog(() => expect(locator, errorHaveTextMsg).toHaveText(expectedText, { timeout }), errorHaveTextMsg);
    }

    static async verifyCurrentUrl(page: Page, expectedUrl: string | RegExp, timeout: number = 5000) {
        const errorMsg = `Expected current URL to match "${expectedUrl}"`;
        // await expect(page, errorMsg).toHaveURL(expectedUrl, { timeout });
        await this.expectWithLog(() => expect(page, errorMsg).toHaveURL(expectedUrl, { timeout }), errorMsg);
    }

    static async verifyFieldIsInvalid(fieldLocator: Locator, timeout: number = 5000) {
        const errorMsg = `Expected field "${fieldLocator.toString()}" to be invalid (validated by browser)`;
        const isInvalid = await fieldLocator.evaluate(el => el.matches(":invalid"), { timeout });
        // expect(isInvalid, errorMsg).toBe(true);
        await this.expectWithLog(() => expect(isInvalid, errorMsg).toBe(true), errorMsg);
    }

    static async verifyFieldValue(fieldLocator: Locator, expectedValue: string, timeout: number = 5000) {
        const errorMsg = `Expected field "${fieldLocator.toString()}" to have value "${expectedValue}"`;
        // await expect(fieldLocator, errorMsg).toHaveValue(expectedValue, { timeout });
        await this.expectWithLog(() => expect(fieldLocator, errorMsg).toHaveValue(expectedValue, { timeout }), errorMsg);
    }
}