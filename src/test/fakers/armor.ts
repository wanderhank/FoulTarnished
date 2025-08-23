import { faker } from "@faker-js/faker";
import { Armor } from "../../models/Armor";

export function makeFakeArmor(overrides: Partial<Armor> = {}): Armor {
    return new Armor({
        id: faker.number.int({ min: 1, max: 1000 }).toString(),
        name: faker.lorem.words(2),
        image: faker.image.url(),
        description: faker.lorem.sentence(),
        category: faker.helpers.arrayElement([
            "Chest Armor",
            "Head Armor",
            "Leg Armor",
            "Gauntlet Armor",
        ]),
        dmgNegation: [
            { name: "Phy", amount: faker.number.int({ min: 5, max: 20 }) },
            { name: "Fire", amount: faker.number.int({ min: 5, max: 20 }) },
            { name: "Magic", amount: faker.number.int({ min: 5, max: 20 }) },
        ],
        resistance: [
            { name: "Immunity", amount: faker.number.int({ min: 10, max: 50 }) },
            { name: "Poise", amount: faker.number.int({ min: 5, max: 30 }) },
        ],
        weight: faker.number.float({ min: 1, max: 20, fractionDigits: 1 }),
        ...overrides,
    });
}