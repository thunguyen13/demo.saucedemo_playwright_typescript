import { generateUniqueNumberString } from "@utils/helpers";

/**
 * Generates a unique email and name for a test user.
 * @returns { email: string; name: string }
 */
export function generateUniqueEmailAndName(): { email: string; name: string } {
  const randomString = generateUniqueNumberString(100, 999, true);
  return {
    email: `test_user_${randomString}@demo.abc`,
    name: `Test User - ${randomString}`,
  };
}

/**
 * 
 * @param baseObject base object to override
 * @param options {overrides: Partial<T>, deleteFields: Array<keyof T>, deleteRemainingFields: boolean} - to define overrides, fields to delete, and whether to delete remaining fields
 * @returns 
 */
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
