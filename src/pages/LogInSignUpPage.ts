import { BasePage } from "@core/ui/BasePage";
import { BaseVerification } from "@core/ui/BaseVerification";
import { Page } from "@playwright/test";


export class LogInPage extends BasePage {
    constructor(protected page: Page) {
        super(page);
    }

    /* ** SELECTORS ** */
    private readonly formContainer = this.page.locator("section[id='form']");
    private readonly logInForm = {
        header: this.formContainer.locator("div[class='login-form'] h2"),
        emailField: this.formContainer.getByTestId("login-email"),
        passwordField: this.formContainer.getByTestId("login-password"),
        submitButton: this.formContainer.getByTestId("login-button"),
        errorMessage: this.formContainer.locator("div[class='login-form'] p"),
    }
    private readonly signUpForm = {
        header: this.formContainer.locator("div[class='signup-form'] h2"),
        nameField: this.formContainer.getByTestId("signup-name"),
        emailField: this.formContainer.getByTestId("signup-email"),
        submitButton: this.formContainer.getByTestId("signup-button"),
        errorMessage: this.formContainer.locator("div[class='signup-form'] p"),
    }

    /* ** CONSTANTS ** */
    public readonly LOGIN_URL = "/login";
    public readonly SIGNUP_URL = "/signup";
    public readonly PAGE_TITLE = "Automation Exercise - Signup / Login";
    public readonly LOGIN_FORM_HEADER_TEXT = "Login to your account";
    public readonly SIGNUP_FORM_HEADER_TEXT = "New User Signup!";

    /* ** ACTION METHODS ** */
    async navigateTo(pageType: "login" | "signup" = "login") {
        if (pageType === "login")
            await this.page.goto(this.LOGIN_URL);
        else await this.page.goto(this.SIGNUP_URL);
    }

    async login(email: string, password: string) {
        await this.logInForm.emailField.fill(email);
        await this.logInForm.passwordField.fill(password);
        await this.logInForm.submitButton.click();
    }

    async signup(name: string, email: string) {
        await this.signUpForm.nameField.fill(name);
        await this.signUpForm.emailField.fill(email);
        await this.signUpForm.submitButton.click();
    }

    /*** VERIFICATION METHODS ***/
    async verifyFormHeader(form: "login" | "signup", timeout = 5000) {
        const headerLocator = form === "login" ? this.logInForm.header : this.signUpForm.header;
        const headerText = form === "login" ? this.LOGIN_FORM_HEADER_TEXT : this.SIGNUP_FORM_HEADER_TEXT;
        await BaseVerification.verifyText(headerLocator, headerText, timeout);
    }

    async verifyErrorMessage(form: "login" | "signup", expectedMessage: string, timeout = 5000) {
        const errorMessageLocator = form === "login" ? this.logInForm.errorMessage : this.signUpForm.errorMessage;
        await BaseVerification.verifyText(errorMessageLocator, expectedMessage, timeout);
    }

    async verifyStillOnPage(timeout = 5000) {
        const expectedUrlRegex = new RegExp(`${this.LOGIN_URL}$|${this.SIGNUP_URL}$`);
        await BaseVerification.verifyCurrentUrl(this.page, expectedUrlRegex, timeout);
        await BaseVerification.verifyPageTitle(this.page, this.PAGE_TITLE, timeout);
        await this.verifyFormHeader("login", timeout);
        await this.verifyFormHeader("signup", timeout);    
    }

    async verifyLogInFormValidationDisplayed(field: "email" | "password") {
        const loginRequiredFieldMap = {
            email: this.logInForm.emailField,
            password: this.logInForm.passwordField,
        };
        const fieldLocator = loginRequiredFieldMap[`${field}` as keyof typeof loginRequiredFieldMap];
        await BaseVerification.verifyFieldInvalid(fieldLocator);
    }

    async verifySignUpFormValidationDisplayed(field: "name" | "email") {
        const signupRequiredFieldMap = {
            name: this.signUpForm.nameField,
            email: this.signUpForm.emailField,
        };
        const fieldLocator = signupRequiredFieldMap[`${field}` as keyof typeof signupRequiredFieldMap];
        await BaseVerification.verifyFieldInvalid(fieldLocator);
    }        
}