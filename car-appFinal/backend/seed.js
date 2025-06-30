require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/models/User");
const Vehicle = require("./src/models/Vehicle");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Erro ao conectar com o MongoDB:", error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {

    await User.deleteMany({});
    await Vehicle.deleteMany({});
    
    const users = [
      { username: "admin", password: "admin123" },
      { username: "user1", password: "user123" },
      { username: "user2", password: "user456" }
    ];

    const createdUsers = [];
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
      createdUsers.push(user);
      console.log(`Usuário criado: ${user.username}`);
    }

    const vehicles = [
      {
        make: "Toyota",
        model: "Corolla",
        year: 2022,
        color: "Branco",
        price: 85000,
        owner: createdUsers[0]._id
      },
      {
        make: "Honda",
        model: "Civic",
        year: 2021,
        color: "Preto",
        price: 95000,
        owner: createdUsers[0]._id
      },
      {
        make: "Volkswagen",
        model: "Golf",
        year: 2023,
        color: "Azul",
        price: 110000,
        owner: createdUsers[1]._id
      },
      {
        make: "Ford",
        model: "Focus",
        year: 2020,
        color: "Vermelho",
        price: 75000,
        owner: createdUsers[1]._id
      },
      {
        make: "Chevrolet",
        model: "Onix",
        year: 2023,
        color: "Prata",
        price: 65000,
        owner: createdUsers[2]._id
      }
    ];

    for (const vehicleData of vehicles) {
      const vehicle = new Vehicle(vehicleData);
      await vehicle.save();
      console.log(`Veículo criado: ${vehicle.make} ${vehicle.model} ${vehicle.year}`);
    }

    console.log("Dados de exemplo inseridos com sucesso!");
    console.log("\nUsuários criados:");
    console.log("- admin / admin123");
    console.log("- user1 / user123");
    console.log("- user2 / user456");
    
  } catch (error) {
    console.error("Erro ao inserir dados:", error);
  } finally {
    mongoose.connection.close();
  }
};

const run = async () => {
  await connectDB();
  await seedData();
};

run();
