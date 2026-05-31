import { BaseValidator } from "@core/api/BaseValidator";
import { test } from "@fixtures/api/account";
import { getValueFieldByPath } from "@utils/helpers";
import { duplicateEmailRegisterData, invalidRegisterData, missingFieldRegisterData, validRegisterData } from "@data/api/accountData";


const successCode = 200;
const endpoint = "/createAccount";
const successCreatedCode = 201;
const successMsg = "User created!";
const badRequestCode = 400;
const unsupportedMethodCode = 405;
const unsupportedMethodMsg = `Method \"{method}\" not allowed.`;

test.describe('Register Success', () => {
    for (const data of validRegisterData) {
        test(`Should register successfully with: ${data.case}`, async ({ authService, cleanUpUser }) => {
            console.log(`Testing registration API with payload data: ${JSON.stringify(data.payloadData)}`);
            try {
                const response = await authService.createAccount(data.payloadData);
                BaseValidator.verifyStatusCode(response, successCode);
                BaseValidator.verifyFieldValue(response, "responseCode", successCreatedCode);
                BaseValidator.verifyFieldValue(response, "message", successMsg);
            } finally {
                // Clean up the created user account after the test
                await cleanUpUser({
                    email: data.payloadData.email!,
                    password: data.payloadData.password!,
                });
            }
        });
    };
});

test.describe('Register Failure - Bad Request: Missing/Invalid Field', () => {
    for (const data of missingFieldRegisterData) {
        test(`Should fail to register with: ${data.case}`, async ({ authService, cleanUpUser }) => {
            const errorMsg = data.message || "Bad request, missing required fields in POST request.";
            let response;
            console.log(`Testing registration API with payload data: ${JSON.stringify(data.payloadData)}`);
            try {
                response = await authService.createAccount(data.payloadData);
                BaseValidator.verifyStatusCode(response, successCode);
                BaseValidator.verifyFieldValue(response, "responseCode", badRequestCode);
                BaseValidator.verifyErrorResponse(response, errorMsg);
            } finally {
                // If registraion succeeded unexpectedly, attempt to delete the created account to clean up
                const responseCode = getValueFieldByPath(response?.body, "responseCode");
                if (responseCode === successCreatedCode) {
                    console.log(`[Unexpected Success] Registration succeeded with invalid data. Attempting to clean up created account with email: ${data.payloadData.email}.`);
                    await cleanUpUser({
                        email: data.payloadData.email!,
                        password: data.payloadData.password!,
                    });
                }
            };
        });
    };
    for (const data of invalidRegisterData) {
        test(`Should fail to register with: ${data.case}`, async ({ authService, cleanUpUser }) => {
            const errorMsg = data.message || "Bad request, invalid field format.";
            let response;
            console.log(`Testing registration API with payload data: ${JSON.stringify(data.payloadData)}`);
            try {
                response = await authService.createAccount(data.payloadData);
                BaseValidator.verifyStatusCode(response, successCode);
                BaseValidator.verifyFieldValue(response, "responseCode", badRequestCode);
                BaseValidator.verifyErrorResponse(response, errorMsg);
            } finally {
                // If registraion succeeded unexpectedly, attempt to delete the created account to clean up
                const responseCode = getValueFieldByPath(response?.body, "responseCode");
                if (responseCode === successCreatedCode) {
                    console.log(`[Unexpected Success] Registration succeeded with invalid data. Attempting to clean up created account with email: ${data.payloadData.email}.`);
                    await cleanUpUser({
                        email: data.payloadData.email!,
                        password: data.payloadData.password!,
                    });
                }
            };  
        });
    };
});

test.describe('Register Failure - Bad Request: Duplicate Email', () => {
    const payloadData = duplicateEmailRegisterData.payloadData;
    test.beforeEach(async ({ authService }) => {
        console.log(`[Before each hook] Creating test user.`);
        const response = await authService.createAccount(payloadData);
        BaseValidator.verifyFieldValue(response, "responseCode", successCreatedCode);
        console.log(`[Setup] Created test user with email: ${payloadData.email} for duplicate email registration test.`);
    });
    test(`Should fail to register with: ${duplicateEmailRegisterData.case}`, async ({ authService, cleanUpUser }) => {
        const errorMsg = duplicateEmailRegisterData.message || "Bad request, email already exists.";
        console.log(`Testing registration API with duplicate email payload data: ${JSON.stringify(payloadData)}`);
        try {
            const response = await authService.createAccount(payloadData);
            BaseValidator.verifyStatusCode(response, successCode);
            BaseValidator.verifyFieldValue(response, "responseCode", badRequestCode);
            BaseValidator.verifyErrorResponse(response, errorMsg);
        } finally {
            // Clean up the created user account after the test
            await cleanUpUser({
                email: payloadData.email!,
                password: payloadData.password!,
            });
        };
    });
});

test.describe('Register Unsupported HTTP Method', () => {
    const payloadData = {
        form: validRegisterData[0].payloadData
    }
    test(`Should fail to register with unsupported HTTP method: GET`, async ({ apiClient }) => {
        console.log(`Testing registration API with unsupported HTTP method: GET and payload data: ${JSON.stringify(payloadData.form)}`);
        const response = await apiClient.get(endpoint, payloadData);
        BaseValidator.verifyStatusCode(response, unsupportedMethodCode);
        BaseValidator.verifyFieldValue(response, "detail", unsupportedMethodMsg.replace("{method}", "GET"));
    });
    test(`Should fail to register with unsupported HTTP method: PUT`, async ({ apiClient }) => {
        console.log(`Testing registration API with unsupported HTTP method: GET and payload data: ${JSON.stringify(payloadData.form)}`);
        const response = await apiClient.put(endpoint, payloadData);
        BaseValidator.verifyStatusCode(response, unsupportedMethodCode);
        BaseValidator.verifyFieldValue(response, "detail", unsupportedMethodMsg.replace("{method}", "PUT"));
    });
    test(`Should fail to register with unsupported HTTP method: DELETE`, async ({ apiClient }) => {
        console.log(`Testing registration API with unsupported HTTP method: GET and payload data: ${JSON.stringify(payloadData.form)}`);
        const response = await apiClient.delete(endpoint, payloadData);
        BaseValidator.verifyStatusCode(response, unsupportedMethodCode);
        BaseValidator.verifyFieldValue(response, "detail", unsupportedMethodMsg.replace("{method}", "DELETE"));
    })
});