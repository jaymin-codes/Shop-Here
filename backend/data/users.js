import bcrypt from 'bcrypt';    

const generateHashedPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
};

const users = [
    {
        name: "Admin User",
        email: "admin@email.com",
        isAdmin: true,
    },
    {
        name: "Jon Snow",
        email: "jon@email.com",
        isAdmin: false,
    },
    {
        name: "Tyrion Lanister",
        email: "tyrion@email.com",
        isAdmin: false,
    },
];

// Generate hashed passwords for each user
Promise.all(users.map(async (user) => {
    user.password = await generateHashedPassword("123456");
}));

export default users;









// import bcrypt from 'bcrypt';    

// const users = [
//     {
//         name: "Admin User",
//         email: "admin@email.com",
//         password: bcrypt.hash("123456", 10),
//         isAdmin: true,
//     },
//     {
//         name: "Jon Snow",
//         email: "jon@email.com",
//         password: bcrypt.hash("123456", 10),
//         isAdmin: false,
//     },
//     {
//         name: "Tyrion Lanister",
//         email: "tyrion@email.com",
//         password: bcrypt.hash("123456", 10),
//         isAdmin: false,
//     },
// ];

// export default users;
