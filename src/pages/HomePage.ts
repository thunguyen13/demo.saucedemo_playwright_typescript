import { BasePage } from "@core/ui/BasePage";
import { Page } from "@playwright/test";


export class HomePage extends BasePage {
    constructor(protected page: Page) {
        super(page);
    }

    /* ** SELECTORS ** */

    /* ** CONSTANTS ** */
    public readonly PAGE_TITLE = "Automation Exercise";

     /* ** ACTION METHODS ** */
     async navigateTo() {
        await this.page.goto("/");
    }
}