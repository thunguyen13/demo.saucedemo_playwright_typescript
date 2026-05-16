import { expect } from "@playwright/test";
import Ajv from "ajv";
import { getDuplicateByKey, getValueFieldByPath } from "@utils/helpers";
import { ApiResponse } from "./ApiClient";


export class BaseValidator {

    static verifyStatusCode(response: ApiResponse, expectedStatus: number) {
        const actualStatus = response.status;
        const msg = `Expected status code ${expectedStatus}, and got ${actualStatus}`;
        expect(actualStatus, msg).toBe(expectedStatus);
        console.log(`==> Status code ${actualStatus} is as expected.`);
    }

    static verifyContentType(response: ApiResponse, expectedContentType: string) {
        const actualContentType = response.headers["content-type"];
        const msg = `Expected content type ${expectedContentType}, and got ${actualContentType}`;
        expect(actualContentType, msg).toBe(expectedContentType);
        console.log(`==> Content type ${actualContentType} is as expected.`);
    }

    static verifyRequiredFields(response: ApiResponse, requiredFields: string[]) {
        const body = response.body;
        requiredFields.forEach(field => {
            const msg = `Response body is missing required field: ${field}`;
            expect(body, msg).toHaveProperty(field);
            console.log(`==> Required field '${field}' is present in the response body.`);    
        });
    }

    static verifyFieldValue(response: ApiResponse, path: string, expectedValue: any) {
        const actualValue = this.getActualValueByPath(response, path);
        const msg = `Expected field '${path}' to have value ${expectedValue}, and got ${actualValue}`;
        expect(actualValue, msg).toBe(expectedValue);
        console.log(`==> Field '${path}' has value "${actualValue}" as expected.`);
    }

    static verifyFieldValueNotEmpty(response: ApiResponse, path: string) {
        const actualValue = this.getActualValueByPath(response, path);
        const msg = `Expected field '${path}' to not be empty.`;
        expect(actualValue, msg).not.toBe('');
        console.log(`==> Field '${path}' has a non-empty value as expected.`);
    }

    static verifyFieldValueMatchPattern(response: ApiResponse, path: string, pattern: RegExp|string) {
        const actualValue = this.getActualValueByPath(response, path);
        const msg = `Expected field '${path}' to match pattern ${pattern}, and got ${actualValue}`;
        expect(actualValue, msg).toMatch(pattern);
        console.log(`==> Field '${path}' has value "${actualValue}" that matches the pattern ${pattern} as expected.`);
    }

    static verifyFieldValueContainsText(response: ApiResponse, path: string, expectedText: string) {
        const actualValue = this.getActualValueByPath(response, path);
        const actualValueLower = String(actualValue).toLowerCase();
        const expectedTextLower = String(expectedText).toLowerCase();
        const msg = `Expected field '${path}' to contain text "${expectedTextLower}", and got "${actualValueLower}"`;
        expect.soft(actualValueLower, msg).toContain(expectedTextLower);
        console.log(`==> Field '${path}' has value "${actualValueLower}" when expected text is "${expectedTextLower}"`);
    }

    static verifyFieldValueIsEmptyArray(response: ApiResponse, path: string) {
        const actualValue = this.getActualValueByPath(response, path);
        const msgNotArray = `Expected field '${path}' to be an array, and got ${typeof actualValue}`;
        expect(Array.isArray(actualValue), msgNotArray).toBe(true);
        const msgNotEmpty = `Expected field '${path}' to be an empty array, and it has length ${actualValue.length}`;
        expect(actualValue.length, msgNotEmpty).toBe(0);
        console.log(`==> Field '${path}' is an empty array as expected.`);
    }

    static verifyFieldValueIsNonEmptyArray(response: ApiResponse, path: string) {
        const actualValue = this.getActualValueByPath(response, path);
        const msgNotArray = `Expected field '${path}' to be an array, and got ${typeof actualValue}`;
        expect(Array.isArray(actualValue), msgNotArray).toBe(true);
        const msgEmpty = `Expected field '${path}' to be a non-empty array.`;
        expect(actualValue.length, msgEmpty).toBeGreaterThan(0);
        console.log(`==> Field '${path}' is a non-empty array as expected.`);
    }

    static verifyErrorResponse(response: ApiResponse, expectedMessage: string) {
        const body = response.body;
        const msgLackingErrorField = `Expected an error message in response, and the response body contain an 'message' field.`;
        expect(body, msgLackingErrorField).toHaveProperty("message");
        const actualRes = body.message;
        const msgNotMatchingError = `Expected error message to be ${expectedMessage}, and got ${actualRes}`;
        expect(actualRes, msgNotMatchingError).toBe(expectedMessage);
        console.log(`==> Error message "${actualRes}" is as expected.`);
    }

    static verifySchema(response: ApiResponse, schema: any) {
        const body = response.body;
        const ajv = new Ajv();
        const validate = ajv.compile(schema);
        const valid = validate(body);
        const msg = `Response body does not match the expected schema: ${JSON.stringify(validate.errors)}`;
        expect(valid, msg).toBe(true);
        console.log(`==> Response body matches the expected schema.`);
    }

    static verifyArrayHasNoDuplicateObjects(response: ApiResponse, path: string) {
        const actualArray = this.getActualValueByPath(response, path);
        const msgNotArray = `Expected field '${path}' to be an array, and got ${typeof actualArray}`;
        expect(Array.isArray(actualArray), msgNotArray).toBe(true);
        const msgHasDuplicates = `Expected array at field '${path}' to have no duplicate objects.`;
        expect(getDuplicateByKey(actualArray, "id").length, msgHasDuplicates).toBe(0);
        console.log(`==> Array at field '${path}' has no duplicate objects as expected.`);
    }

    static verifyObjectContains(response: ApiResponse, path: string, expectedObject: any) {
        const actualObject = this.getActualValueByPath(response, path);
        const msgObjectNotContains = `Expected object at field '${path}' matches the expected object as expected.`;
        expect(actualObject, msgObjectNotContains).toMatchObject(expectedObject);
        console.log(`==> Object ${JSON.stringify(actualObject)} matches the expected object ${JSON.stringify(expectedObject)} as expected.`);
    }

    private static getActualValueByPath(response: ApiResponse, path: string) {
        const body = response.body;
        const actualValue = getValueFieldByPath(body, path);
        const msgUndefined = `Expected field '${path}' to be defined`;
        expect(actualValue, msgUndefined).not.toBeUndefined();
        return actualValue;
    }
}



