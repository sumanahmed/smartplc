"use client";
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function ContactUsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Breadcrumb */}
      <nav className="text-sm mb-6 text-gray-600" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1">
          <li>
            <Link 
              href="/" 
              className="hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </Link>
          </li>
          <li className="mx-1 text-gray-400">/</li>
          <li className="text-gray-800 font-semibold">
            Contact Us
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
        <p className="text-gray-600 mt-2">
          We’re here to help with any questions regarding products, orders, or support.
        </p>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* Email */}
        <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
          <Mail className="h-8 w-8 text-blue-600 mb-2" />
          <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
          <p className="text-gray-700">smartplcbd@gmail.com</p>
        </div>

        {/* Phone */}
        <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
          <Phone className="h-8 w-8 text-blue-600 mb-2" />
          <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
          <p className="text-gray-700">+880 1810 447906</p>
        </div>

        {/* Address */}
        <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
          <MapPin className="h-8 w-8 text-blue-600 mb-2" />
          <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
          <p className="text-gray-700 text-center">
            Ko-27/A Rosulbag, Mohakhali, Dhaka-1212, Bangladesh
          </p>
        </div>
      </div>

      {/* Google Map */}
      <div className="rounded-lg overflow-hidden shadow mb-10">
        <iframe
          src="https://www.google.com/maps?q=Mohakhali+Dhaka+1212&output=embed"
          width="100%"
          height="350"
          loading="lazy"
        ></iframe>
      </div>

      {/* Contact Form */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Send Us a Message</h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border p-3 rounded w-full" placeholder="Your Name" />
          <input className="border p-3 rounded w-full" placeholder="Your Email" />
          <input className="border p-3 rounded w-full" placeholder="Phone Number" />
          <input className="border p-3 rounded w-full" placeholder="Subject" />

          <textarea
            rows={5}
            className="border p-3 rounded w-full md:col-span-2"
            placeholder="Your Message"
          ></textarea>

          <button className="mt-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded md:col-span-2 hover:bg-blue-700 transition">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
