import { Page } from "@playwright/test";



export class Header {
    constructor(private page: Page) {}

    private readonly header = this.page.locator("#header");
    private readonly logo = this.header.getByAltText("Website for automation practice");
    private readonly menuItems = {
        home: this.header.getByRole("link", { name: "Home" }),
        products: this.header.getByRole("link", { name: "Products" }),
        cart: this.header.getByRole("link", { name: "Cart" }),
        signUpLogIn: this.header.getByRole("link", { name: "Signup / Login" }),
        contactUs: this.header.getByRole("link", { name: "Contact us" }),
    }

    async clickLogo() {
        await this.logo.click();
    }

    async clickMenuItem(item: keyof typeof this.menuItems) {
        await this.menuItems[item].click();
    }

    
}