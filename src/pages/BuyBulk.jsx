export default function BuyBulk() {
    // Dummy bulk waste listings (later replace with backend fetch)
    const bulkItems = [
      {
        id: 1,
        name: "Plastic Scrap",
        quantity: "10 Tons",
        price: "₹5,000 / ton",
        seller: "Green Plastics Ltd.",
      },
      {
        id: 2,
        name: "Aluminium Waste",
        quantity: "3 Tons",
        price: "₹25,000 / ton",
        seller: "MetalWorks Pvt. Ltd.",
      },
      {
        id: 3,
        name: "Paper Waste",
        quantity: "20 Tons",
        price: "₹3,000 / ton",
        seller: "EcoPaper Industries",
      },
    ];
  
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Bulk Waste Listings
        </h1>
  
        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-lg rounded-2xl overflow-hidden">
            <thead>
              <tr className="bg-green-600 text-white text-left">
                <th className="p-4">Item</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Price</th>
                <th className="p-4">Seller</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {bulkItems.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? "bg-green-50" : "bg-white"
                  } hover:bg-green-100 transition`}
                >
                  <td className="p-4 font-medium">{item.name}</td>
                  <td className="p-4">{item.quantity}</td>
                  <td className="p-4">{item.price}</td>
                  <td className="p-4">{item.seller}</td>
                  <td className="p-4">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                      Contact Seller
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  