import {faker} from "@faker-js/faker";
import {Weapon} from "../../models/Weapon";


export function makeFakeWeapon(overrides: Partial<Weapon> = {}): Weapon {
    return new Weapon({
        id: faker.number.int({ min: 1, max: 1000 }).toString(),
        name: faker.lorem.words(2),
        image: faker.image.url(),
        description: faker.lorem.sentence(),
        category: faker.helpers.arrayElement([
            "Small Weapon",
            "Medium Weapon",
            "Great Weapon",
        ]),
        weight: faker.number.float({ min: 1, max: 20, fractionDigits: 1 }),
        attack: [
            { name: "Phy", amount: faker.number.int({ min: 5, max: 20 }) },
            { name: "Mag", amount: faker.number.int({ min: 5, max: 20 }) },
            { name: "Fire", amount: faker.number.int({ min: 5, max: 20 }) },
            { name: "Light", amount: faker.number.int({ min: 5, max: 20 }) },
            { name: "Holy", amount: faker.number.int({ min: 5, max: 20 }) },
            { name: "Crit", amount: faker.number.int({ min: 5, max: 20 }) },
        ],
        defence: [
            { name: "Phy", amount: faker.number.int({ min: 5, max: 20 }) },
            { name: "Mag", amount: faker.number.int({ min: 5, max: 20 }) },
            { name: "Fire", amount: faker.number.int({ min: 5, max: 20 }) },
            { name: "Light", amount: faker.number.int({ min: 5, max: 20 }) },
            { name: "Holy", amount: faker.number.int({ min: 5, max: 20 }) },
            { name: "Boost", amount: faker.number.int({ min: 5, max: 20 }) },
        ],
        scalesWith: [
            {
                name: "Str",
                scaling: "C"
            }
        ],
        requiredAttributes: [
            {
                name: "Str",
                amount: 10,
            },
        ],
        ...overrides,
    });
}