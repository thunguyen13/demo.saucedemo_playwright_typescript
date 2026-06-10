import { generateUniqueNumberString } from "@utils/helpers";

export function generateUniqueEmailAndName(): { email: string; name: string } {
  const randomString = generateUniqueNumberString(100, 999, true);
  return {
    email: `test_user_${randomString}@demo.abc`,
    name: `Test User - ${randomString}`,
  };
}

export function buildUserData<T extends object>(
  baseObject: T = {} as T,
  options?: {
    overrides?: Partial<T>;
    deleteFields?: Array<keyof T>;
    deleteRemainingFields?: boolean;
  }
): Partial<T> {
  const user = {
    ...baseObject,
    ...options?.overrides,
  };
  if (options?.deleteFields?.length) {
    options.deleteFields.forEach((field) => delete user[field]);
  }
  if (options?.deleteRemainingFields) {
    const overridesFields = Object.keys(options.overrides || {}) as Array<keyof T>;
    const remainingFields = (Object.keys(baseObject) as Array<keyof T>).filter(
      (field) => !overridesFields.includes(field)
    );
    remainingFields.forEach((field) => delete user[field]);
  }
  return user;
}
