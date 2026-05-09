import { ApiClient, ResquestOption } from "@core/api/ApiClient";
import { cleanUndefinedValues } from "@utils/helpers";

export interface UserIdentity {
    email: string;
    password: string;
}

export interface UserInfo {
    email: string;
    password: string;
    name: string;
    title: string;
    birth_date: string;
    birth_month: string;
    birth_year: string;
    firstname: string;
    lastname: string;
    company: string;
    address1: string;
    address2: string;
    country: string;
    zipcode: string;
    state: string;
    city: string;
    mobile_number: string;
};

export class AuthService {

    constructor(private client: ApiClient) {
        //  super(client);
    }

    /**
     * To login and verify if the account is existing
     * @param payloadData payload data containing the username and password in the form of { username: string, password: string }
     * @returns response object containing the status code, headers, and body with the verification result of the login credentials provided in the payload data
     */
    async verifyLogin(payloadData: UserIdentity) {
        const endpoint = "/verifyLogin";
        const payload: ResquestOption["Post"] = {
            form: {
                email: payloadData.email,
                password: payloadData.password
            }
        };
        const response = await this.client.post(endpoint, payload);
        return response;
    }


    /**
     * To create an account
     * @param payloadData payload data containing the user information in the form of { email: string, password: string, name: string, title: string, birth_date: string, birth_month: string, birth_year: string, firstname: string, lastname: string, company: string, address1: string, address2: string, country: string, zipcode: string, state: string, city: string, mobile_number: string }
     * @returns response object containing the status code, headers, and body with the result of the account creation process based on the user information provided in the payload data
     */
    async createAccount(payloadData: Partial<UserInfo>) {
        const endpoint = "/createAccount";
        const rawPayloadData = {
            email: payloadData.email,
            password: payloadData.password,
            name: payloadData.name,
            title: payloadData.title,
            birth_date: payloadData.birth_date,
            birth_month: payloadData.birth_month,
            birth_year: payloadData.birth_year,
            firstname: payloadData.firstname,
            lastname: payloadData.lastname,
            company: payloadData.company,
            address1: payloadData.address1,
            address2: payloadData.address2,
            country: payloadData.country,
            zipcode: payloadData.zipcode,
            state: payloadData.state,
            city: payloadData.city,
            mobile_number: payloadData.mobile_number
        };
        const payload: ResquestOption["Post"] = {
            form: cleanUndefinedValues(rawPayloadData)
        };
        const response = await this.client.post(endpoint, payload);
        return response;
    }

    /**
     * To delete an account
     * @param payloadData payload data containing the username and password in the form of { username: string, password: string }
     * @returns response object containing the status code, headers, and body with the result of the account deletion process based on the username and password provided in the payload data
     */
    async deleteAccount(payloadData: UserIdentity) {
        const endpoint = "/deleteAccount";
        const payload: ResquestOption["Delete"] = {
            form: {
                email: payloadData.email,
                password: payloadData.password
            }
        }
        const response = await this.client.delete(endpoint, payload);
        return response;
    }

    /**
     * To update information of an account
     * @param payloadData payload data containing the user information in the form of { email: string, password: string, name: string, title: string, birth_date: string, birth_month: string, birth_year: string, firstname: string, lastname: string, company: string, address1: string, address2: string, country: string, zipcode: string, state: string, city: string, mobile_number: string }
     * @returns response object containing the status code, headers, and body with the result of the account creation process based on the user information provided in the payload data
     */
    async updateAccount(payloadData: Partial<UserInfo>) {
        const endpoint = "/updateAccount";
        const cleanedPayloadData = cleanUndefinedValues(payloadData);
        const payload: ResquestOption["Put"] = { 
            form: cleanedPayloadData 
        };
        const response = await this.client.put(endpoint, payload);
        return response;
    }

    
    async getUserDetailByEmail(payloadData: { email: string }) {
        const endpoint = "/getUserDetailByEmail";
        const queryParams: ResquestOption["Get"] = {
            params: {
                email: payloadData.email
            }
        };
        const response = await this.client.get(endpoint, queryParams);
        return response;
    }


}