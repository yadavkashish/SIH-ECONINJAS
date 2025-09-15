import { Link } from "react-router-dom";
import { FaLeaf, FaUsers, FaMapMarkedAlt, FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <div className="bg-white text-gray-800 font-sans">

      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/photos/green-community.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Empowering Communities for a Greener Tomorrow
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-2xl">
            A collaborative platform for sustainable waste management.
          </p>
          <div className="flex space-x-4">
            <Link
              to="/signup"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition"
            >
              Join Now
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white font-bold py-3 px-6 rounded-full hover:bg-white hover:text-green-600 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-800">Why EcoWaste?</h2>
            <p className="text-lg text-gray-700 mt-4">
              We provide the tools and incentives to make a real impact.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <div className="p-4 bg-green-100 rounded-full inline-block mb-4">
                <FaLeaf className="text-green-600" size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Promote Sustainability</h3>
              <p className="text-gray-600">
                Engage in eco-friendly practices and contribute to a circular economy.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <div className="p-4 bg-blue-100 rounded-full inline-block mb-4">
                <FaUsers className="text-blue-600" size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Foster Community</h3>
              <p className="text-gray-600">
                Connect with local communities, participate in events, and work together.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <div className="p-4 bg-purple-100 rounded-full inline-block mb-4">
                <FaMapMarkedAlt className="text-purple-600" size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Visualize Impact</h3>
              <p className="text-gray-600">
                See the collective impact of your community’s efforts on interactive maps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-green-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-800">
              Simple Steps to a Greener Lifestyle
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <div className="flex items-center gap-6">
              <div className="text-5xl font-extrabold text-green-500">01</div>
              <div>
                <h3 className="text-2xl font-bold">Register & Join</h3>
                <p className="text-gray-700">
                  Create an account and become part of a local community.
                </p>
              </div>
            </div>
            <FaArrowRight className="text-4xl text-green-400 hidden md:block" />
            <div className="flex items-center gap-6">
              <div className="text-5xl font-extrabold text-green-500">02</div>
              <div>
                <h3 className="text-2xl font-bold">Track & Participate</h3>
                <p className="text-gray-700">
                  Log your waste, join events, and complete challenges.
                </p>
              </div>
            </div>
            <FaArrowRight className="text-4xl text-green-400 hidden md:block" />
            <div className="flex items-center gap-6">
              <div className="text-5xl font-extrabold text-green-500">03</div>
              <div>
                <h3 className="text-2xl font-bold">Earn & Redeem</h3>
                <p className="text-gray-700">
                  Gain points for your actions and redeem rewards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 text-green-950 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-lg mb-8">
            Join the EcoWaste movement today and be a catalyst for change.
          </p>
          <Link
            to="/pledge"
            className="bg-white text-green-600 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition shadow"
          >
            Take the Pledge
          </Link>
        </div>
      </section>

    </div>
  );
}
