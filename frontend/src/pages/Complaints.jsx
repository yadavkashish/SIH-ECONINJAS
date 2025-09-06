import { useState } from "react";

export default function Complaints() {
  const [formData, setFormData] = useState({
    address: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const clearFile = () => {
    setFormData({ ...formData, image: null });
    //reset native file input so same file can be chosen again
    const input = document.getElementById("imageUpload");
    if (input) input.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Complaint submitted: ", formData);

    alert("Complaint submitted successfully!");
    setFormData({ address: "", description: "", image: null });
  };

  return (
    <div className="ml-64 p-10">
      <h1 className="text-3xl font-bold mb-6">Submit a Complaint</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 max-w-lg space-y-4"
      >
        {/* Address */}
        <div>
          <label className="block font-medium mb-1">Complaint Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter the location"
            className="w-full border rounded-lg p-2 focus:ring focus:ring-green-400"
            required
          ></input>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add a brief description"
            rows="4"
            className="w-full border rounded-lg p-2 focus:ring focus:ring-green-400"
            required
          ></textarea>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Upload image</label>
          <label
            htmlFor="imageUpload"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer inline-block"
          >
            📁 Choose File
          </label>
          <input
            id="imageUpload"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
            required
          ></input>

          {formData.image && (
            <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full shadow-sm">
              {formData.image.name}
              <button
                type="button"
                onClick={clearFile}
                className="leading-none text-green-700 hover:text-green-900"
                aria-label="Remove file"
              >
                ✕
              </button>
            </span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
}
