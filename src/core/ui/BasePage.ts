import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import { Page } from "@playwright/test";


export abstract class BasePage {
    constructor(protected page: Page) {}

    public header = new Header(this.page);
    public footer = new Footer(this.page);

    private scrollUpBtn = this.page.locator("#scrollUp");

    async scrollToTop() {
        await this.scrollUpBtn.click();
    }
}