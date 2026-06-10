import { invalidRegisterData } from './../accountData';
import { AccountInformation, requiredFields } from "@pages/SignUpInformationPage";
import { buildUserData } from "@utils/dataHelpers";
import { generateUniqueNumberString } from "@utils/helpers";

type Case = {
  name: string;
  expectedFieldError: string;
  errorMessage: string;
  data: Partial<AccountInformation>;
};

const randomString = generateUniqueNumberString(100, 999, true);

export const validAccInfo: AccountInformation = {
  email: `testUser_${randomString}@demo.abc`,
  password: "123456",
  name: `Test User - ${randomString}`,
  title: "Mr",
  dayOfBirth: "1",
  monthOfBirth: "January",
  yearOfBirth: "1990",
  firstName: "Test",
  lastName: "User",
  company: "Test Company",
  address: "123 Test Street",
  address2: "Suite 100",
  country: "Test Country",
  zipCode: "12345",
  state: "Test State",
  city: "Test City",
  mobileNumber: "0912345678",
  newsLetter: true,
  offers: true,
};

export const invalidRegisterData_Screen1: Array<Case> = [
  {
    name: "Email field is empty",
    expectedFieldError: "email",
    errorMessage: "",
    data: buildUserData(validAccInfo, { deleteFields: ["email"] }),
  },
  {
    name: "Name field is empty",
    expectedFieldError: "name",
    errorMessage: "",
    data: buildUserData(validAccInfo, { deleteFields: ["name"] }),
  },
  {
    name: "Email already exist",
    expectedFieldError: "",
    errorMessage: "Email Address already exist!",
    data: {
      email: validAccInfo.email,
      name: validAccInfo.name,
    },
  },
];

export const invalidRegisterData_misingField_Screen2: Array<Case> = requiredFields
  .filter(field => field !== "email" && field !== "name")
  .map(field => {
    return {
      name: `Missing required field: ${field}`,
      expectedFieldError: field as string,
      errorMessage: "",
      data: buildUserData(validAccInfo, { deleteFields: [field] }),
    };
  });

export const invalidRegisterData_invalidFormatField_Screen2: Array<Case> = [
  {
    name: "Password less than 6 characters",
    expectedFieldError: "password",
    errorMessage: "Password must be at least 6 characters!",
    data: buildUserData(validAccInfo, { overrides: { password: "123" } }),
  },
  {
    name: "Password more than 20 characters",
    expectedFieldError: "password",
    errorMessage: "Password must be at most 20 characters!",
    data: buildUserData(validAccInfo, { overrides: { password: "1".repeat(21) } }),
  },
  {
    name: "Invalid mobile number format",
    expectedFieldError: "mobileNumber",
    errorMessage: "Mobile number is not valid!",
    data: buildUserData(validAccInfo, { overrides: { mobileNumber: "invalidNumber" } }),
  },
  {
    name: "Invalid zip code format",
    expectedFieldError: "zipCode",
    errorMessage: "Zip code is not valid!",
    data: buildUserData(validAccInfo, { overrides: { zipCode: "12345!" } }),
  }
]

