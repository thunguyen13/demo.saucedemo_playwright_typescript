import { test as base } from '@playwright/test';
import { ApiClient } from '@core/api/ApiClient';
import { ProductService } from 'src/services/ProductService';

type Fixtures = {
    apiClient: ApiClient;
    productService: ProductService;
};

export const test = base.extend<Fixtures>({
    apiClient: async({ request }, use) => {
        const baseUrl = "https://automationexercise.com/api";
        const client = new ApiClient(request, baseUrl);
        await use(client);
    },
    productService: async({ apiClient }, use) => {
        const service = new ProductService(apiClient);
        await use(service);
    }
});

export { expect } from '@playwright/test';


