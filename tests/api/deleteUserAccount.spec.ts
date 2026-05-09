import { BaseValidator } from "@core/api/BaseValidator";
import { test } from "@fixtures/api/account";
import { UserIdentity, UserInfo } from "@services/AuthService";
import { validAccInfo, badRequestData, notFoundData } from "src/data/accountData";

const endpoint = "/deleteAccount";
const testUser: UserInfo = validAccInfo;
const successMsg = "Account deleted!";
const successCode = 200;
const badRequestCode = 400;
const defaultBadRequestMsg = "Bad request, email or password parameter is missing in DELETE request.";
const notFoundCode = 404;
const notFoundMsg = "Account not found!";
const unsupportedMethodCode = 405;
const unsupportedMethodMsg = `Method \"{method}\" not allowed.`;

test.describe.configure({ "mode": "parallel" });

test.beforeEach(async ({ authService }) => {
    console.log(`[Before each hook] Creating test user.`);
    await authService.createAccount(testUser);
    console.log(`[Created] Test user has been created with email: ${testUser.email} and password: ${testUser.password}`);
});

test.describe("Success Delete API", () => {
    test("Should verify delete success with valid credentials",async ({ authService }) => {
        const userIdentity: UserIdentity = {
            email: testUser.email,
            password: testUser.password
        };
        console.log(`Testing delete with valid credentials: email: ${userIdentity.email} and password: ${userIdentity.password}`);
        const response = await authService.deleteAccount(userIdentity);
        BaseValidator.verifyStatusCode(response, successCode);
        BaseValidator.verifyFieldValue(response, "responseCode", successCode);
        BaseValidator.verifyFieldValue(response, "message", successMsg);
    });
});

test.describe("Failed Delete API", () => {
    for (const data of badRequestData) {
        test(`Should retieve error message for missing field(s): ${data.case}`, async ({ apiClient, cleanUpUser }) => {
            const payloadData = {
                form: data.payloadData
            };
            console.log(`Testing delete with payload: ${JSON.stringify(payloadData.form)}`);
            try {
                const response = await apiClient.delete(endpoint, payloadData);
                const badRequestMsg = data.message?.replace("{method}", "DELETE") || defaultBadRequestMsg;
                BaseValidator.verifyStatusCode(response, successCode);
                BaseValidator.verifyFieldValue(response, "responseCode", badRequestCode);
                BaseValidator.verifyErrorResponse(response, badRequestMsg);
            } finally {
                await cleanUpUser({ email: testUser.email, password: testUser.password });
            }
        });
    }
    for (const data of notFoundData) {
        test(`Should retieve error message for invalid credentials: ${data.case}`, async ({ apiClient, cleanUpUser }) => {
            const payloadData = {
                form: data.payloadData
            };
            console.log(`Testing delete with payload: ${JSON.stringify(payloadData.form)}`);
            try {
                const response = await apiClient.delete(endpoint, payloadData);
                BaseValidator.verifyStatusCode(response, successCode);
                BaseValidator.verifyFieldValue(response, "responseCode", notFoundCode);
                BaseValidator.verifyErrorResponse(response, notFoundMsg);
            } finally {
                await cleanUpUser({ email: testUser.email, password: testUser.password });
            }
            
        });
    }
});

test.describe("Verify API delete retrieves error message for unsupported HTTP method", () => {
    const payloadData = {
        form: {
            email: testUser.email,
            password: testUser.password
        }
    }
    test("Should retieve error message for unsupported HTTP method: GET", async ({ apiClient, cleanUpUser }) => {
        console.log(`Testing deleteAccount with unsupported HTTP method: GET and payload: ${JSON.stringify(payloadData.form)}`);
        try {
            const response = await apiClient.get(endpoint, payloadData);
            BaseValidator.verifyStatusCode(response, unsupportedMethodCode);
            BaseValidator.verifyFieldValue(response, "detail", unsupportedMethodMsg.replace("{method}", "GET"));
        } finally {
            await cleanUpUser({ email: testUser.email, password: testUser.password });
        }
    });
    test("Should retieve error message for unsupported HTTP method: PUT", async ({ apiClient, cleanUpUser }) => {
        console.log(`Testing deleteAccount with unsupported HTTP method: PUT and payload: ${JSON.stringify(payloadData.form)}`);
        try {
            const response = await apiClient.put(endpoint, payloadData);
            BaseValidator.verifyStatusCode(response, unsupportedMethodCode);
            BaseValidator.verifyFieldValue(response, "detail", unsupportedMethodMsg.replace("{method}", "PUT"));
        } finally {
            await cleanUpUser({ email: testUser.email, password: testUser.password });
        }
    });
    test("Should retieve error message for unsupported HTTP method: POST", async ({ apiClient, cleanUpUser }) => {
        console.log(`Testing deleteAccount with unsupported HTTP method: POST and payload: ${JSON.stringify(payloadData.form)}`);
        try {
            const response = await apiClient.post(endpoint, payloadData);
            BaseValidator.verifyStatusCode(response, unsupportedMethodCode);
            BaseValidator.verifyFieldValue(response, "detail", unsupportedMethodMsg.replace("{method}", "POST"));
        } finally {
            await cleanUpUser({ email: testUser.email, password: testUser.password });
        }
    });
});