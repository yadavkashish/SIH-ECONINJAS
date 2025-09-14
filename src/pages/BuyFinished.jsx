export default function BuyFinished() {
    // Dummy product list (later replace with backend / DB fetch)
    const products = [
      {
        id: 1,
        name: "Recycled Paper Notebook",
        price: 120,
        image:
          "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/sample.jpg",
      },
      {
        id: 2,
        name: "Eco-friendly Tote Bag",
        price: 250,
        image:
          "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/eco_bag.jpg",
      },
      {
        id: 3,
        name: "Compostable Plates (Pack of 20)",
        price: 180,
        image:
          "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/plate.jpg",
      },
    ];
  
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Eco-Friendly Products
        </h1>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col items-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-green-700 font-bold">₹{product.price}</p>
              <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  