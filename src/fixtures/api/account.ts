import { ApiClient } from "@core/api/ApiClient";
import { AuthService, UserIdentity, UserInfo } from "@services/AuthService";
import { test as base } from "@playwright/test";

type Fixtures = {
  apiClient: ApiClient;
  authService: AuthService;
  cleanUpUser: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  cleanUptestUser: {
    email: string;
    password: string;
  }
};

export const test = base.extend<Fixtures>({
  apiClient: async ({ request }, use) => {
    const baseUrl = "/api";
    const apiClient = new ApiClient(request, baseUrl);
    await use(apiClient);
  },
  authService: async ({ apiClient }, use) => {
    const authService = new AuthService(apiClient);
    await use(authService);
  },
  cleanUpUser: async ({ authService }, use) => {
    let user: { email: string; password: string } = {
        email: "",
        password: "",
    };

    await use(async (u: { email: string; password: string }) => {
      user = u;
    });

    console.log(`[Fixture - After each hook] Attempting to delete test user.`);
    if (user && user.email && user.password) {
      const payload = {
        email: user.email,
        password: user.password,
      };
      const res = await authService.deleteAccount(payload);
      console.log(
        `[Clean up] Aptempted to delete test user with email: ${user.email}. Response code: ${res.body.responseCode}.`
      );
    } else {
        console.log(
          "[Clean up] No user information provided for cleanup. Skipping deletion."
        );
    }
  }
});
