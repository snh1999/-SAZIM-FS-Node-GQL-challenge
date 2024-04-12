import { Category, PrismaClient, RentDuration } from "@prisma/client";

const dummyUsers = [
    {
        id: "1",
        firstName: "Alice",
        lastName: "Doe",
        email: "alice@prisma.io",
        password: "alice",
        phone: "1234567890",
        address: "123 Main St",
    },
    {
        id: "2",
        firstName: "Bob",
        lastName: "Smith",
        email: "bob@prisma.io",
        password: "bob",
        phone: "1234567890",
    },
    {
        id: "3",
        firstName: "John",
        lastName: "Doe",
        email: "john@prisma.io",
        password: "john",
        phone: "1234567890",
    },
];

const dummyProducts = [
    {
        title: "Ball",
        category: [Category.SPORTING_GOODS],
        description: "A ball",
        price: 10,
        rentPrice: 0.5,
        rentDuration: RentDuration.DAY,
        ownerId: dummyUsers[0].id,
    },
    {
        title: "Chair",
        category: [Category.FURNITURE],
        description: "A chair",
        price: 100,
        rentPrice: 2,
        rentDuration: RentDuration.DAY,
        ownerId: dummyUsers[1].id,
    },
    {
        title: "Table",
        category: [Category.FURNITURE],
        description: "A table",
        price: 100,
        rentPrice: 5,
        rentDuration: RentDuration.DAY,
        ownerId: dummyUsers[2].id,
    },
    {
        title: "Laptop",
        category: [Category.ELECTRONICS],
        description: "A laptop",
        price: 1000,
        rentPrice: 50,
        rentDuration: RentDuration.DAY,
        ownerId: dummyUsers[2].id,
    },
    {
        title: "TV",
        category: [Category.ELECTRONICS],
        description: "A TV",
        price: 1000,
        rentPrice: 50,
        rentDuration: RentDuration.DAY,
        ownerId: dummyUsers[2].id,
    },
    {
        title: "Mobile",
        category: [Category.ELECTRONICS],
        description: "A mobile",
        price: 1000,
        rentPrice: 50,
        rentDuration: RentDuration.DAY,
        ownerId: dummyUsers[1].id,
    },
];

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany();
    await prisma.product.deleteMany();

    await prisma.user.createMany({
        data: dummyUsers,
    });

    await prisma.product.createMany({
        data: dummyProducts,
    });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
