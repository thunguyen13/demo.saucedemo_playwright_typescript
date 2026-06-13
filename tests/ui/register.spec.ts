import { LogInPage } from "@pages/LogInSignUpPage";
import { SignUpInformationPage } from "@pages/SignUpInformationPage";
import { test } from "@playwright/test";
import { validAccInfo } from "@data/ui/accountData";
import { AccountCreatedPage } from "@pages/AccountCreatedPage";


test.describe("Registration with valid data", () => {
    test("Should register successfully and navigate to account created page", async ({ page }) => {
        const logInSignUpPage = new LogInPage(page);
        const signUpInformationPage = new SignUpInformationPage(page);
        const accountCreatedPage = new AccountCreatedPage(page);

        await logInSignUpPage.navigateTo("signup");
        await logInSignUpPage.signup(validAccInfo.name, validAccInfo.email);
        await signUpInformationPage.fillinformationForm(validAccInfo);
        await signUpInformationPage.submitinformationForm();
        await accountCreatedPage.verifyPageContent();
    });        
});