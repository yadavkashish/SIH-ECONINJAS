const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Ward = require("./models/Ward");
const Application = require("./models/Application");


dotenv.config();

const wards = [
  { city: "Ghaziabad", wardNumber: 1, name: "Raj Nagar", pincodes: ["201002"], localities: ["Raj Nagar"] },
  { city: "Ghaziabad", wardNumber: 2, name: "Indirapuram", pincodes: ["201010"], localities: ["Indirapuram"] },
  { city: "Ghaziabad", wardNumber: 3, name: "Vijay Nagar", pincodes: ["201005"], localities: ["Vijay Nagar"] },
  { city: "Ghaziabad", wardNumber: 4, name: "Shastri Nagar", pincodes: ["201001"], localities: ["Shastri Nagar"] },
  { city: "Ghaziabad", wardNumber: 5, name: "Kavi Nagar", pincodes: ["201002"], localities: ["Kavi Nagar"] },
  { city: "Ghaziabad", wardNumber: 6, name: "Vaishali", pincodes: ["201012"], localities: ["Vaishali"] },
  { city: "Ghaziabad", wardNumber: 7, name: "Kaushambi", pincodes: ["201010"], localities: ["Kaushambi"] },
  { city: "Ghaziabad", wardNumber: 8, name: "Sahibabad", pincodes: ["201005"], localities: ["Sahibabad"] },
  { city: "Ghaziabad", wardNumber: 9, name: "Nehru Nagar", pincodes: ["201001"], localities: ["Nehru Nagar"] },
  { city: "Ghaziabad", wardNumber: 10, name: "Mohan Nagar", pincodes: ["201007"], localities: ["Mohan Nagar"] },
  { city: "Ghaziabad", wardNumber: 11, name: "Modinagar", pincodes: ["201204"], localities: ["Modinagar"] },
  { city: "Ghaziabad", wardNumber: 12, name: "Crossings Republik", pincodes: ["201016"], localities: ["Crossings Republik"] },
  { city: "Ghaziabad", wardNumber: 13, name: "Pratap Vihar", pincodes: ["201009"], localities: ["Pratap Vihar"] },
  { city: "Ghaziabad", wardNumber: 14, name: "Loni", pincodes: ["201102"], localities: ["Loni"] },
  { city: "Ghaziabad", wardNumber: 15, name: "Govindpuram", pincodes: ["201013"], localities: ["Govindpuram"] },
  { city: "Ghaziabad", wardNumber: 16, name: "Muradnagar", pincodes: ["201206"], localities: ["Muradnagar"] },
  { city: "Ghaziabad", wardNumber: 17, name: "Dasna", pincodes: ["201015"], localities: ["Dasna"] },
  { city: "Ghaziabad", wardNumber: 18, name: "Nandgram", pincodes: ["201003"], localities: ["Nandgram"] },
  { city: "Ghaziabad", wardNumber: 19, name: "Chiranjeev Vihar", pincodes: ["201002"], localities: ["Chiranjeev Vihar"] },
  { city: "Ghaziabad", wardNumber: 20, name: "Madhuban Bapudham", pincodes: ["201009"], localities: ["Madhuban Bapudham"] },
];

const applications = [
  {
    fullName: "Alice",
    age: 25,
    gender: "Female",
    mobile: "9999999999",
    address: { house: "12A", locality: "Raj Nagar", selectedWard: 1, city: "Ghaziabad", pin: "201002" },
    ngoName: "Green NGO",
    occupation: "Student",
    status: "approved",
    points: 50,
  },
  {
    fullName: "Bob",
    age: 30,
    gender: "Male",
    mobile: "8888888888",
    address: { house: "34B", locality: "Indirapuram", selectedWard: 2, city: "Ghaziabad", pin: "201010" },
    ngoName: "",
    occupation: "Professional",
    status: "pending",
    points: 0,
  },
  {
    fullName: "Charlie",
    age: 28,
    gender: "Male",
    mobile: "7777777777",
    address: { house: "56C", locality: "Vijay Nagar", selectedWard: 3, city: "Ghaziabad", pin: "201005" },
    ngoName: "Eco Group",
    occupation: "Homemaker",
    status: "approved",
    points: 30,
  },
  {
    fullName: "Deepa",
    age: 35,
    gender: "Female",
    mobile: "6666666666",
    address: { house: "78D", locality: "Shastri Nagar", selectedWard: 4, city: "Ghaziabad", pin: "201001" },
    ngoName: "Clean Ghaziabad",
    occupation: "Teacher",
    status: "approved",
    points: 20,
  },
  {
    fullName: "Eshan",
    age: 40,
    gender: "Male",
    mobile: "5555555555",
    address: { house: "90E", locality: "Kavi Nagar", selectedWard: 5, city: "Ghaziabad", pin: "201002" },
    ngoName: "",
    occupation: "Retired",
    status: "pending",
    points: 0,
  },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Ward.deleteMany({ city: "Ghaziabad" });
    await Ward.insertMany(wards);
    console.log("✅ Seeded wards");

    await Application.deleteMany({ "address.city": "Ghaziabad" });
    await Application.insertMany(applications);
    console.log("✅ Seeded applications");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
