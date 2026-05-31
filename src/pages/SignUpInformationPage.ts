import { expect, Page } from "@playwright/test";
import { BasePage } from "@core/ui/BasePage";
import { BaseVerification } from "@core/ui/BaseVerification";

export interface AccountInformation {
    title: "Mr" | "Mrs";
    name: string;
    email: string;
    password: string;
    dayOfBirth: string;
    monthOfBirth: string;
    yearOfBirth: string;
    newsLetter: boolean;
    offers: boolean;
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
    mobileNumber: string;
}

export class SignUpInformationPage extends BasePage {
    constructor(protected page: Page) {
        super(page);
    }

    /* ** SELECTORS ** */
    private readonly formContainer = this.page.locator("section[id='form']");
    private readonly infomationForm = {
        headers: this.formContainer.locator("h2[class='title text-center']"),
        titleOptions: (title: "Mr" | "Mrs") => this.formContainer.locator(`input[name='title'][value='${title}']`),
        nameField: this.formContainer.getByTestId("name"),
        emailField: this.formContainer.getByTestId("email"),
        passwordField: this.formContainer.getByTestId("password"),
        dayOfBirthDropdown: this.formContainer.getByTestId("days"),
        monthOfBirthDropdown: this.formContainer.getByTestId("months"),
        yearOfBirthDropdown: this.formContainer.getByTestId("years"),
        newsLetterCheckbox: this.formContainer.locator("input[id='newsletter']"),
        offersCheckbox: this.formContainer.locator("input[id='optin']"),
        firstNameField: this.formContainer.getByTestId("first_name"),
        lastNameField: this.formContainer.getByTestId("last_name"),
        companyField: this.formContainer.getByTestId("company"),
        addressField: this.formContainer.getByTestId("address"),
        address2Field: this.formContainer.getByTestId("address2"),
        countryDropdown: this.formContainer.getByTestId("country"),
        stateField: this.formContainer.getByTestId("state"),
        cityField: this.formContainer.getByTestId("city"),
        zipCodeField: this.formContainer.getByTestId("zipcode"),
        mobileNumberField: this.formContainer.getByTestId("mobile_number"),
        createAccountButton: this.formContainer.getByTestId("create-account"),
    }

    /* ** CONSTANTS ** */
    public readonly URL = "/signup";
    public readonly PAGE_TITLE = "Automation Exercise - Signup";
    public readonly HEADER_TEXT = {
        ACCOUNT_INFORMATION: "Enter Account Information",
        ADDRESS_INFORMATION: "Address Information",
    }

    /* ** ACTION METHODS ** */
    async fillInfomationForm(accountInfo: Partial<AccountInformation>) {
        if (accountInfo.title !== undefined)
            await this.infomationForm.titleOptions(accountInfo.title).check();
        if (accountInfo.name !== undefined)
            await this.infomationForm.nameField.fill(accountInfo.name);
        if (accountInfo.password !== undefined)
            await this.infomationForm.passwordField.fill(accountInfo.password);
        if (accountInfo.dayOfBirth !== undefined)
            await this.infomationForm.dayOfBirthDropdown.selectOption(accountInfo.dayOfBirth);
        if (accountInfo.monthOfBirth !== undefined)
            await this.infomationForm.monthOfBirthDropdown.selectOption(accountInfo.monthOfBirth);
        if (accountInfo.yearOfBirth !== undefined)
            await this.infomationForm.yearOfBirthDropdown.selectOption(accountInfo.yearOfBirth);
        if (accountInfo.newsLetter !== undefined)
            await this.infomationForm.newsLetterCheckbox.setChecked(accountInfo.newsLetter);
        if (accountInfo.offers !== undefined)
            await this.infomationForm.offersCheckbox.setChecked(accountInfo.offers || false);
        if (accountInfo.firstName !== undefined)
            await this.infomationForm.firstNameField.fill(accountInfo.firstName);
        if (accountInfo.lastName !== undefined)
            await this.infomationForm.lastNameField.fill(accountInfo.lastName);
        if (accountInfo.company !== undefined)
            await this.infomationForm.companyField.fill(accountInfo.company);
        if (accountInfo.address !== undefined)
            await this.infomationForm.addressField.fill(accountInfo.address);
        if (accountInfo.address2 !== undefined)
            await this.infomationForm.address2Field.fill(accountInfo.address2);
        if (accountInfo.country !== undefined)
            await this.infomationForm.countryDropdown.selectOption(accountInfo.country);
        if (accountInfo.state !== undefined)
            await this.infomationForm.stateField.fill(accountInfo.state);
        if (accountInfo.city !== undefined)
            await this.infomationForm.cityField.fill(accountInfo.city);
        if (accountInfo.zipCode !== undefined)
            await this.infomationForm.zipCodeField.fill(accountInfo.zipCode);
        if (accountInfo.mobileNumber !== undefined)
            await this.infomationForm.mobileNumberField.fill(accountInfo.mobileNumber);
    }

    async submitInfomationForm() {
        await this.infomationForm.createAccountButton.click();
    }

    /* ** VERIFICATION METHODS ** */
    async verifyFormHeader(form: "account" | "address", timeout = 5000) {
        const headerLocator = form === "account" ? this.infomationForm.headers.first() : this.infomationForm.headers.nth(1);
        const headerText = form === "account" ? this.HEADER_TEXT.ACCOUNT_INFORMATION : this.HEADER_TEXT.ADDRESS_INFORMATION;
        await BaseVerification.verifyText(headerLocator, headerText, timeout);
    }

    async verifyStillOnInfomationForm(timeout = 5000) {
        const expectedUrlRegex = new RegExp(`${this.URL}$`);
        await BaseVerification.verifyCurrentUrl(this.page, expectedUrlRegex, timeout);
        await BaseVerification.verifyPageTitle(this.page, this.PAGE_TITLE, timeout);
        await this.verifyFormHeader("account", timeout);
        await this.verifyFormHeader("address", timeout);
    }
}