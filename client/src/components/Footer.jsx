// src/components/Footer.jsx
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaTimes,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 pt-10">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-white text-xl font-semibold">
              Subscribe For a Newsletter
            </h2>
            <p className="text-sm mt-1">
              Want to be notified when we launch a new template or an update?
              Sign up and we'll send you a notification by email.
            </p>
          </div>

          <div className="flex mt-4 md:mt-0 w-full md:w-auto">
            <input
              type="email"
              placeholder="Your Email"
              className="px-4 py-2 rounded-l bg-gray-800 border border-gray-600 text-white w-full md:w-72"
            />
            <button className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-r text-white font-semibold">
              SEND
            </button>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          {/* About */}
          <div>
            <h1 className="text-2xl font-bold text-white mb-4">CARSTATE</h1>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              in pulvinar neque. Nulla finibus lobortis pulvinar.
            </p>
            <div className="flex gap-3 mt-4">
              <button className="bg-green-600 p-2 rounded">
                <FaFacebookF />
              </button>
              <button className="bg-green-600 p-2 rounded">
                <FaTimes />
              </button>
              <button className="bg-green-600 p-2 rounded">
                <FaInstagram />
              </button>
              <button className="bg-green-600 p-2 rounded">
                <FaTiktok />
              </button>
              <button className="bg-green-600 p-2 rounded">
                <FaYoutube />
              </button>
            </div>
          </div>

          {/* Helpful Links */}
          <div>
            <h3 className="text-white font-bold mb-4">HELPFUL LINKS</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-green-500">OUR LAST NEWS</li>
              <li className="hover:text-green-500">PRICING PLANS</li>
              <li className="hover:text-green-500">CONTACTS</li>
              <li className="hover:text-green-500">HELP CENTER</li>
              <li className="hover:text-green-500">PRIVACY POLICY</li>
            </ul>
          </div>

          {/* Our Contacts */}
          <div>
            <h3 className="text-white font-bold mb-4">OUR CONTACTS</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <strong>MAIL:</strong> admin@gmail.com
              </li>
              <li>
                <strong>ADRESS:</strong>XYZ
              </li>
              <li>
                <strong>PHONE:</strong>+9123445556666
              </li>
            </ul>
            <button className="mt-4 border border-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm">
              Get in Touch
            </button>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-4 pb-6 text-sm text-gray-500 flex justify-between items-center">
          <p>
            © <span className="text-white font-semibold">2025</span>. ALL RIGHTS
            RESERVED.
          </p>
          <div className="flex gap-6 text-white">
            <a href="#">TERMS OF USE</a>
            <a href="#">PRIVACY POLICY</a>
            <a href="#">BLOG</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
