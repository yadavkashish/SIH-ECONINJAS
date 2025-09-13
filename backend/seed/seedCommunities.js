const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Community = require("../models/Community");

dotenv.config();

// Wards from your seedWards file
const wards = [
  { city: "Ghaziabad", wardNumber: 1, name: "Raj Nagar" },
  { city: "Ghaziabad", wardNumber: 2, name: "Indirapuram" },
  { city: "Ghaziabad", wardNumber: 3, name: "Vijay Nagar" },
  { city: "Ghaziabad", wardNumber: 4, name: "Shastri Nagar" },
  { city: "Ghaziabad", wardNumber: 5, name: "Kavi Nagar" },
  { city: "Ghaziabad", wardNumber: 6, name: "Vaishali" },
  { city: "Ghaziabad", wardNumber: 7, name: "Kaushambi" },
  { city: "Ghaziabad", wardNumber: 8, name: "Sahibabad" },
  { city: "Ghaziabad", wardNumber: 9, name: "Nehru Nagar" },
  { city: "Ghaziabad", wardNumber: 10, name: "Mohan Nagar" },
  { city: "Ghaziabad", wardNumber: 11, name: "Modinagar" },
  { city: "Ghaziabad", wardNumber: 12, name: "Crossings Republik" },
  { city: "Ghaziabad", wardNumber: 13, name: "Pratap Vihar" },
  { city: "Ghaziabad", wardNumber: 14, name: "Loni" },
  { city: "Ghaziabad", wardNumber: 15, name: "Govindpuram" },
  { city: "Ghaziabad", wardNumber: 16, name: "Muradnagar" },
  { city: "Ghaziabad", wardNumber: 17, name: "Dasna" },
  { city: "Ghaziabad", wardNumber: 18, name: "Nandgram" },
  { city: "Ghaziabad", wardNumber: 19, name: "Chiranjeev Vihar" },
  { city: "Ghaziabad", wardNumber: 20, name: "Madhuban Bapudham" },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Create a community for each ward
    const communities = wards.map(w => ({
      city: w.city,
      wardNumber: w.wardNumber,
      name: `${w.name} Committee`
    }));

    // Clear existing communities
    await Community.deleteMany({ city: "Ghaziabad" });

    // Insert new communities
    await Community.insertMany(communities);

    console.log(`✅ Seeded ${communities.length} communities`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
