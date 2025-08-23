import { faker } from "@faker-js/faker";
import {Talisman} from "../../models/Talisman";

export function makeFakeTalisman(overrides: Partial<Talisman> = {}): Talisman {
    return new Talisman({
        id: faker.number.int({ min: 1, max: 1000 }).toString(),
        name: faker.lorem.words(2),
        image: faker.image.url(),
        description: faker.lorem.sentence(),
        effect: faker.lorem.sentence(),
        ...overrides,
    });
}