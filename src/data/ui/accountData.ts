import { UserInfo } from "@services/AuthService";
import { generateUniqueNumberString } from "@utils/helpers";



const randomString = generateUniqueNumberString(100, 999, true);

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
  mobile_number: "0912345678",
};