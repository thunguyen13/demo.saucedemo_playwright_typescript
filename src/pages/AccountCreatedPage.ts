import { BasePage } from "@core/ui/BasePage";
import { BaseVerification } from "@core/ui/BaseVerification";
import { Page } from "@playwright/test";


export class AccountCreatedPage extends BasePage {
    constructor(protected page: Page) {
        super(page);
    }
    
    /* ** SELECTORS ** */
    private readonly container = this.page.locator("section[id='form']");
    private readonly textLocators = {
        header: this.container.getByTestId("account-created"),
        messages: this.container.locator("p"),
    }
    private readonly continueButton = this.container.getByTestId("continue-button");

    /* ** CONSTANTS ** */
    public readonly HEADER = "Account Created!";
    public readonly MESSAGES = [
        "Congratulations! Your new account has been successfully created!",
        "You can now take advantage of member privileges to enhance your online shopping experience with us."
    ];

    /* ** ACTION METHODS ** */
    async clickContinue() {
        await this.continueButton.click();
    }

    /*** VERIFICATION METHODS ***/
    async verifyPageContent(timeout = 5000) {
        await BaseVerification.verifyText(this.textLocators.header, this.HEADER, timeout);
        for (let i = 0; i < this.MESSAGES.length; i++) {
            await BaseVerification.verifyText(this.textLocators.messages.nth(i), this.MESSAGES[i], timeout);
        }
    }
}