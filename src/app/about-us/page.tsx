"use client";
import React from "react";
import { Cpu, Cog, Zap, Layers, Monitor, Cable } from "lucide-react";
import Link from "next/link";

export default function AboutUsPage() {
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
            About Us
          </li>
        </ol>
      </nav>
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">About Smart PLC BD</h1>
        <p className="text-gray-600 mt-2">
          Your trusted partner for Industrial Automation & Electrical Solutions in Bangladesh.
        </p>
      </div>

      {/* Company Overview */}
      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Who We Are</h2>
        <p className="text-gray-700 leading-relaxed">
          Smart PLC BD is a leading online store specializing in industrial automation 
          products including PLC, HMI, Sensors, Drives, Servo Motors, Encoders, Timers, 
          Power Supplies, and industrial cables.  
          <br /><br />
          We deliver authentic components at competitive prices with fast delivery across Bangladesh.
          Our goal is to support engineers, technicians, factories, and industries by providing reliable 
          automation parts that keep production running smoothly.
        </p>
      </div>

      {/* Product Categories */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Product Categories</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <CategoryItem title="PLC" Icon={Cpu} />
          <CategoryItem title="HMI" Icon={Monitor} />
          <CategoryItem title="Sensor" Icon={Zap} />
          <CategoryItem title="Drive" Icon={Cog} />
          <CategoryItem title="Servo Motor / Drive" Icon={Layers} />
          <CategoryItem title="Cables" Icon={Cable} />
        </div>
      </div>

      {/* Vision */}
      <div className="bg-blue-50 p-6 rounded-lg shadow mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Vision</h2>
        <p className="text-gray-700 leading-relaxed">
          To become Bangladesh’s most reliable and efficient online automation component supplier, 
          empowering industries with high-quality products and professional support.
        </p>
      </div>

      {/* Why Choose Us */}
      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Smart PLC BD?</h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>100% authentic products</li>
          <li>Competitive wholesale price</li>
          <li>Fast delivery across Bangladesh</li>
          <li>Industrial-grade quality components</li>
          <li>Dedicated customer support</li>
          <li>Trusted by engineers, factories & industries</li>
        </ul>
      </div>
    </div>
  );
}

/* COMPONENT */
function CategoryItem({ title, Icon }: any) {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition">
      <Icon className="h-8 w-8 text-blue-600 mb-2" />
      <p className="font-medium text-gray-800 text-sm">{title}</p>
    </div>
  );
}
