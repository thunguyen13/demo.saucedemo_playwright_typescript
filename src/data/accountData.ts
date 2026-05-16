import { UserInfo } from "@services/AuthService";
import { generateUniqueNumberString } from "@utils/helpers";

const randomString = generateUniqueNumberString(100, 999, true);

type TypeLogin = {
  case: string;
  payloadData: {
    email?: string;
    password?: string;
    username?: string;
    pass?: string;
  };
  message?: string;
};

type TypeUserInfo = {
  case: string;
  payloadData: Partial<UserInfo>;
  code?: number;
  message?: string;
};

type TypeGetUserDetail = {
  case: string;
  payloadData: { email?: string };
  code?: number;
  message?: string;
};

export const validAccInfo: UserInfo = {
  email: `test_user_${randomString}@demo.abc`,
  password: "123456",
  name: `Test User - ${randomString}`,
  title: "Mr",
  birth_date: "1",
  birth_month: "January",
  birth_year: "1990",
  firstname: "Test",
  lastname: "User",
  company: "Test Company",
  address1: "123 Test Street",
  address2: "Suite 100",
  country: "Test Country",
  zipcode: "12345",
  state: "Test State",
  city: "Test City",
  mobile_number: "1234567890",
};

export const badRequestData: Array<TypeLogin> = [
  {
    case: "Wrong name for email field",
    payloadData: {
      username: validAccInfo.email,
      password: validAccInfo.password,
    },
    message: "Bad request, email parameter is missing in {method} request.",
  },
  {
    case: "Wrong name for password field",
    payloadData: { email: validAccInfo.email, pass: validAccInfo.password },
    message: "Bad request, password parameter is missing in {method} request.",
  },
  {
    case: "Lack of password field",
    payloadData: { email: validAccInfo.email },
    message: "Bad request, password parameter is missing in {method} request.",
  },
  {
    case: "Lack of email field",
    payloadData: { password: validAccInfo.password },
    message: "Bad request, email parameter is missing in {method} request.",
  },
  {
    case: "Lack of email and password field",
    payloadData: {},
    message: "Bad request, email parameter is missing in {method} request.",
  },
  {
    case: "Email and password fields are unset",
    payloadData: { email: undefined, password: undefined },
    message: "Bad request, email parameter is missing in {method} request.",
  },
  {
    case: "Email field is unset",
    payloadData: { email: undefined, password: validAccInfo.password },
    message: "Bad request, email parameter is missing in {method} request.",
  },
  {
    case: "Password field is unset",
    payloadData: { email: validAccInfo.email, password: undefined },
    message: "Bad request, password parameter is missing in {method} request.",
  },
];

export const notFoundData: Array<TypeLogin> = [
  {
    case: "Wrong password",
    payloadData: { email: validAccInfo.email, password: "wrongpassword123" },
  },
  {
    case: "Wrong email",
    payloadData: {
      email: "test_user_@demo.abc",
      password: validAccInfo.password,
    },
  },
  {
    case: "Email and password fields are empty",
    payloadData: { email: "", password: "" },
    message: "Bad request, email parameter is missing in {method} request.",
  },
  {
    case: "Email field is empty",
    payloadData: { email: "", password: validAccInfo.password },
    message: "Bad request, email parameter is missing in {method} request.",
  },
  {
    case: "Password field is empty",
    payloadData: { email: validAccInfo.email, password: "" },
    message: "Bad request, password parameter is missing in {method} request.",
  },
  {
    case: "Email and password fields are blank spaces",
    payloadData: { email: " ", password: " " },
  },
  {
    case: "Email field is blank space",
    payloadData: { email: " ", password: validAccInfo.password },
  },
  {
    case: "Password field is blank space",
    payloadData: { email: validAccInfo.email, password: " " },
  },
  {
    case: "Invalid email format - missing domain",
    payloadData: {
      email: validAccInfo.email.split("@")[0],
      password: validAccInfo.password,
    },
  },
  {
    case: "Invalid email format - missing username",
    payloadData: {
      email: `@${validAccInfo.email.split("@")[1]}`,
      password: validAccInfo.password,
    },
  },
];

export const validRegisterData: Array<TypeUserInfo> = [
  {
    case: "Valid user data - Full fields",
    payloadData: buildUserData(validAccInfo),
  },
  {
    case: "Valid user data - Only required fields",
    payloadData: buildUserData(validAccInfo, {}, [
      "title",
      "birth_date",
      "birth_month",
      "birth_year",
      "company",
      "address2",
    ]),
  },
  {
    case: "Valid user data - some optional fields are empty",
    payloadData: buildUserData(validAccInfo, { company: "", address2: "" }, [
      "birth_date",
    ]),
  },
];

export const missingFieldRegisterData: Array<TypeUserInfo> = [
  {
    case: "Missing required field - email",
    payloadData: buildUserData(validAccInfo, {}, ["email"]),
    message: "Bad request, email parameter is missing in POST request.",
  },
  {
    case: "Missing required field - password",
    payloadData: buildUserData(validAccInfo, {}, ["password"]),
    message: "Bad request, password parameter is missing in POST request.",
  },
  {
    case: "Missing required field - name",
    payloadData: buildUserData(validAccInfo, {}, ["name"]),
    message: "Bad request, name parameter is missing in POST request.",
  },
  {
    case: "Missing required field - lastname",
    payloadData: buildUserData(validAccInfo, {}, ["lastname"]),
    message: "Bad request, lastname parameter is missing in POST request.",
  },
  {
    case: "Missing required field - firstname",
    payloadData: buildUserData(validAccInfo, {}, ["firstname"]),
    message: "Bad request, firstname parameter is missing in POST request.",
  },
  {
    case: "Missing required field - city",
    payloadData: buildUserData(validAccInfo, {}, ["city"]),
    message: "Bad request, city parameter is missing in POST request.",
  },
  {
    case: "Missing required field - address1",
    payloadData: buildUserData(validAccInfo, {}, ["address1"]),
    message: "Bad request, address1 parameter is missing in POST request.",
  },
  {
    case: "Missing required field - country",
    payloadData: buildUserData(validAccInfo, { country: "" }),
    message: "Bad request, country parameter is missing in POST request.",
  },
  {
    case: "Missing required field - state",
    payloadData: buildUserData(validAccInfo, { state: "" }),
    message: "Bad request, state parameter is missing in POST request.",
  },
  {
    case: "Missing required field - zipcode",
    payloadData: buildUserData(validAccInfo, { zipcode: "" }),
    message: "Bad request, zipcode parameter is missing in POST request.",
  },
  {
    case: "Missing required field - mobile_number",
    payloadData: buildUserData(validAccInfo, {}, ["mobile_number"]),
    message: "Bad request, mobile_number parameter is missing in POST request.",
  },
];

export const duplicateEmailRegisterData: TypeUserInfo = {
  case: "Duplicate email registration",
  payloadData: buildUserData(validAccInfo, { email: validAccInfo.email }),
  message: "Email already exists!",
};

export const invalidRegisterData: Array<TypeUserInfo> = [
  {
    case: "Invalid email format - string missing domain",
    payloadData: buildUserData(validAccInfo, {
      email: `est_user_${randomString}@`,
    }),
    message: "Bad request, invalid email format.",
  },
  {
    case: "Ivalid email format - missing username",
    payloadData: buildUserData(validAccInfo, { email: `@demo.abc` }),
    message: "Bad request, invalid email format.",
  },
  {
    case: "Invalid email format - blank email, just spaces",
    payloadData: buildUserData(validAccInfo, { email: "   " }),
    message: "Bad request, invalid email format.",
  },
  {
    case: "Invalid mobile number format",
    payloadData: buildUserData(validAccInfo, {
      mobile_number: "invalid_mobile",
    }),
    message: "Bad request, invalid mobile number format.",
  },
  {
    case: "Invalid password format - too short",
    payloadData: buildUserData(validAccInfo, { password: "pass" }),
    message: "Bad request, invalid password format - too short.",
  },
  {
    case: "Invalid password format - too long",
    payloadData: buildUserData(validAccInfo, { password: "p".repeat(20) }),
    message: "Bad request, invalid password format - too long.",
  },
  {
    case: "Invalid zipcode format",
    payloadData: buildUserData(validAccInfo, { zipcode: "invalid_zipcode" }),
    message: "Bad request, invalid zipcode format.",
  },
];

export const failureGetUserDetailData: Array<TypeGetUserDetail> = [
  {
    case: `Missing parameter - email`,
    payloadData: {},
    code: 400,
    message: "Bad request, email parameter is missing in GET request.",
  },
  {
    case: `No exist email`,
    payloadData: { email: `no_exist_email_${randomString}@gmail.test` },
    code: 404,
    message: "Account not found with this email, try another email!",
  },
  {
    case: `Invalid email format - blank email`,
    payloadData: { email: "" },
    code: 404,
    message: "Account not found with this email, try another email!",
  },
  {
    case: `Invalid email format - missing domain`,
    payloadData: { email: validAccInfo.email.split("@")[0] },
    code: 404,
    message: "Account not found with this email, try another email!",
  },
  {
    case: `Invalid email format - missing username`,
    payloadData: { email: `@${validAccInfo.email.split("@")[1]}` },
    code: 404,
    message: "Account not found with this email, try another email!",
  },
];

export const successUpdateData: Array<TypeUserInfo> = [
  {
    case: "Correct email + password: Full valid fields",
    payloadData: cloneUserData(validAccInfo, {
      email: validAccInfo.email,
      password: validAccInfo.password,
    }),
  },
  {
    case: "Correct email + password: Valid required fields",
    payloadData: cloneUserData(
      validAccInfo,
      {
        email: validAccInfo.email,
        password: validAccInfo.password,
        name: "Updated Name",
        firstname: "Updated First",
        lastname: "Updated Lastname",
        mobile_number: "0904443456",
        zipcode: "3456",
        country: "Updated Country",
        city: "Updated City",
        state: "Updated State",
      },
      [],
      true
    ),
  },
  {
    case: "Correct email + password: Some valid required fields + optional fields 1",
    payloadData: cloneUserData(
      validAccInfo,
      {
        email: validAccInfo.email,
        password: validAccInfo.password,
        mobile_number: "0904443456",
        lastname: "Updated Lastname",
        title: "ABC",
        birth_date: "40",
      },
      [],
      true
    ),
  },
  {
    case: "Correct email + password: Some valid required fields + optional fields 2",
    payloadData: cloneUserData(
      validAccInfo,
      {
        email: validAccInfo.email,
        password: validAccInfo.password,
        mobile_number: "0904443456",
        firstname: "Updated First",
        company: "Updated Company",
        birth_month: "13",
      },
      [],
      true
    ),
  },
];

export const badRequestUpdateData: Array<TypeUserInfo> = [
  {
    case: `Missing field - email`,
    payloadData: cloneUserData(validAccInfo, {}, ["email"]),
    code: 400,
    message: "Bad request, email parameter is missing in PUT request.",
  },
  {
    case: `Missing field - password`,
    payloadData: cloneUserData(validAccInfo, {}, ["password"]),
    code: 400,
    message: "Bad request, password parameter is missing in PUT request.",
  },
  {
    case: `Missing field - email + password`,
    payloadData: cloneUserData(validAccInfo, {}, ["email", "password"]),
    code: 400,
    message: "Bad request, email parameter is missing in PUT request.",
  },
];

export const notFoundUpdateData: Array<TypeUserInfo> = [
  {
    case: `No exist email`,
    payloadData: cloneUserData(validAccInfo, {
      email: `no_exist_email_${randomString}@gmail.test`,
    }),
    code: 404,
    message: "Account not found!",
  },
  {
    case: `Wrong password`,
    payloadData: cloneUserData(validAccInfo, {
      email: validAccInfo.email,
      password: "wrongpassword123",
    }),
    code: 404,
    message: "Account not found!",
  },
  {
    case: `Wrong email - missing domain`,
    payloadData: cloneUserData(validAccInfo, {
      email: validAccInfo.email.split("@")[0],
    }),
    code: 404,
    message: "Account not found!",
  },
  {
    case: `Wrong email - missing username`,
    payloadData: cloneUserData(validAccInfo, {
      email: `@${validAccInfo.email.split("@")[1]}`,
    }),
    code: 404,
    message: "Account not found!",
  },
];

export const invalidUpdateData: Array<TypeUserInfo> = [
  {
    case: `Invalid mobile number format`,
    payloadData: cloneUserData(validAccInfo, {
      mobile_number: "invalid_mobile",
    }),
    code: 400,
    message: "Bad request, invalid mobile number.",
  },
  {
    case: `Invalid zipcode format`,
    payloadData: cloneUserData(validAccInfo, { zipcode: "invalid_zipcode" }),
    code: 400,
    message: "Bad request, invalid zipcode.",
  },
];

export function buildUserData(
  object: Partial<UserInfo> = {},
  overrides: Partial<UserInfo> = {},
  deleteFields?: Array<keyof UserInfo>
): Partial<UserInfo> {
  const randomString = generateUniqueNumberString(100, 999, true);
  const user = {
    ...object,
    email: `test_user_${randomString}@demo.abc`,
    name: `Test User - ${randomString}`,
    ...overrides,
  };
  if (deleteFields?.length) {
    deleteFields.forEach((field) => delete user[field]);
  }
  return user;
}

export function cloneUserData(
  object: Partial<UserInfo> = {},
  overrides: Partial<UserInfo> = {},
  deleteFields?: Array<keyof UserInfo>,
  deleteRemainingFields?: boolean
): Partial<UserInfo> {
  const user = {
    ...object,
    ...overrides,
  };

  if (deleteFields?.length) {
    deleteFields.forEach((field) => delete user[field]);
  }

  if (deleteRemainingFields) {
    const overridesFields = Object.keys(overrides) as Array<keyof UserInfo>;
    const remainingFields = (
      Object.keys(validAccInfo) as Array<keyof UserInfo>
    ).filter((field) => !overridesFields.includes(field));
    remainingFields.forEach((field) => delete user[field]);
  }

  return user;
}
