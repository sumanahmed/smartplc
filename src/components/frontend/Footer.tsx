const Footer: React.FC = () => {
    return (
      <footer className="bg-gray-800 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <button
                  className="hover:text-blue-400 transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  className="hover:text-blue-400 transition"
                >
                  Order Tracking
                </button>
              </li>
            </ul>
          </div>
  
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="/contact" className="hover:text-blue-400 transition">Contact Us</a>
              </li>
              <li>
                <a href="/faq" className="hover:text-blue-400 transition">FAQ</a>
              </li>
              <li>
                <a href="/returns" className="hover:text-blue-400 transition">Returns & Refunds</a>
              </li>
              <li>
                <a href="/shipping" className="hover:text-blue-400 transition">Shipping Info</a>
              </li>
            </ul>
          </div>
  
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="mb-2">Email: smartplcbd@gmail.com</p>
            <p className="mb-2">Phone: +880 1810 447906</p>
            <p className="mb-2">Address: Ko-27/A Rosulbag, Mohakhali, Dhaka-1212</p>
            <div className="flex space-x-4 mt-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 10-11 10V14H9v-2h2V9.5A3.5 3.5 0 0115.5 6H18v2h-2a1.5 1.5 0 00-1.5 1.5V12h3l-1 2h-2v8a10 10 0 0010-10z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.4.5.6.2 1.1.5 1.6 1 .5.5.8 1 1 1.6.2.5.4 1.2.5 2.4.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.5 2.4-.2.6-.5 1.1-1 1.6-.5.5-1 .8-1.6 1-.5.2-1.2.4-2.4.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.4-.5-.6-.2-1.1-.5-1.6-1-.5-.5-.8-1-1-1.6-.2-.5-.4-1.2-.5-2.4-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.3-1.9.5-2.4.2-.6.5-1.1 1-1.6.5-.5 1-.8 1.6-1 .5-.2 1.2-.4 2.4-.5 1.3-.1 1.7-.1 Newark, NJ 07102 USA4.9-.1zm0 2.2c-3.1 0-3.5 0-4.8.1-1.1.1-1.7.3-2.1.5-.5.2-.9.5-1.3.9-.4.4-.7.8-.9 1.3-.2.4-.4 1-.5 2.1-.1 1.3-.1 1.7-.1 4.8s0 3.5.1 4.8c.1 1.1.3 1.7.5 2.1.2.5.5.9.9 1.3.4.4.8.7 1.3.9.4.2 1 .4 2.1.5 1.3.1 1.7.1 4.8.1s3.5 0 4.8-.1c1.1-.1 1.7-.3 2.1-.5.5-.2.9-.5 1.3-.9.4-.4.7-.8.9-1.3.2-.4.4-1 .5-2.1.1-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c-.1-1.1-.3-1.7-.5-2.1-.2-.5-.5-.9-.9-1.3-.4-.4-.8-.7-1.3-.9-.4-.2-1-.4-2.1-.5-1.3-.1-1.7-.1-4.8-.1zm0 3.6a6 6 0 100 12 6 6 0 000-12zm0 10a4 4 0 110-8 4 4 0 010 8zm4.7-10.5a1.4 1.4 0 11-2.8 0 1.4 1.4 0 012.8 0z" />
                </svg>
              </a>
            </div>
          </div>
  
          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to get the latest offers and updates.</p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded-md text-gray-800"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
  
        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} NextGen IT Park. All rights reserved.</p>
        </div>
      </footer>
    );
  };

  export default Footer;