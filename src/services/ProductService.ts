import { ApiClient, RequestOption } from "@core/api/ApiClient";


export class ProductService {

    constructor(private client: ApiClient) {}

    /**
     * To get the list of all products with their details
     * @returns response object containing the status code, headers, and body with the list of all products and their details
     */
    async getAllProducts() {
        const endpoint = "/productsList";
        const response = await this.client.get(endpoint);
        return response;
    }

    /**
     * To get the list of all brands
     * @returns response object containing the status code, headers, and body with the list of all brands and their details
     */
    async getAllBrands() {
        const endpoint = "/brandsList";
        const response = await this.client.get(endpoint);
        return response;
    }
    
    /**
     * To search for products based on the search product name provided in the payload data and get the list of products matching the search product name
     * @param payloadData payload data containing the search product name in the form of { search_product: string }
     * @returns response object containing the status code, headers, and body with the list of products matching the search product name provided in the payload data
     */
    async postSearchProducts(payloadData: { search_product: string }) {
        const endpoint = "/searchProduct";
        const payload: RequestOption["Post"] = {
            form: payloadData
        }
        const response = await this.client.post(endpoint, payload);
        return response;
    }
}