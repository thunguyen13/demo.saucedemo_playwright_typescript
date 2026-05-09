import { ApiClient } from "@core/api/ApiClient";
import { AuthService, UserIdentity, UserInfo } from "@services/AuthService";
import { APIRequestContext, test as base, request as playwrightRequest } from "@playwright/test";
import { validAccInfo } from "src/data/accountData";

type Fixtures = {
  apiClient: ApiClient;
  authService: AuthService;
  testUser: UserInfo;
};


export const test = base.extend<{},Fixtures>({
  apiClient: 
  [
    async ({}, use) => {
      const baseUrl = "/api";
      const apiRequest: APIRequestContext = await playwrightRequest.newContext({ baseURL: baseUrl });
      const apiClient = new ApiClient(apiRequest, baseUrl);
      await use(apiClient);
      await apiRequest.dispose();
    },
    { scope: "worker" }
  ],
  authService: [
    async ({ apiClient }, use) => {
      const authService = new AuthService(apiClient);
      await use(authService);
    },
    { scope: "worker" }
  ],
  testUser: [
    async ({ authService }, use) => {
      const testUserInfo: UserInfo = validAccInfo;
      console.log(`[Fixtures before all hook] Creating test user.`);
      await authService.createAccount(testUserInfo);
      console.log(`[Set up] Test user has been created with email: ${testUserInfo.email} and password: ${testUserInfo.password}`);

      await use(testUserInfo);

      console.log(`[Fixtures after all hook] Deleting test user.`);
      const userIdentity: UserIdentity = {
        email: testUserInfo.email,
        password: testUserInfo.password
      }
      await authService.deleteAccount(userIdentity);
      console.log(`[Clean up] Test user with email: ${testUserInfo.email} has been deleted`);
    },
    { scope: "worker" }
  ]
});
