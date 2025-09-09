import {Admin} from "../../models/Admin";
import {faker} from "@faker-js/faker";

const roles = ["Admin", "User"] as const;
type Role = (typeof roles)[number];

export function makeFakeAdmin(overrides: Partial<Admin> = {}): Admin {
    return new Admin({
        id: faker.number.int({ min: 1, max: 1000 }).toString(),

        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.helpers.arrayElement(roles),
        ...overrides,
    });
}