'use client';

import { useState } from 'react';
import { Save, RefreshCw } from 'lucide-react';

const FormsPage = () => {
  const [formData, setFormData] = useState({
    textInput: '',
    email: '',
    password: '',
    number: '',
    tel: '',
    url: '',
    search: '',
    textarea: '',
    select: '',
    multiSelect: [] as string[],
    radio: '',
    checkbox: false,
    date: '',
    datetime: '',
    time: '',
    month: '',
    week: '',
    color: '#000000',
    range: 50,
    file: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).files?.[0] || null
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({
      ...prev,
      multiSelect: selectedOptions
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Form submitted! Check console for data.');
  };

  const handleReset = () => {
    setFormData({
      textInput: '',
      email: '',
      password: '',
      number: '',
      tel: '',
      url: '',
      search: '',
      textarea: '',
      select: '',
      multiSelect: [],
      radio: '',
      checkbox: false,
      date: '',
      datetime: '',
      time: '',
      month: '',
      week: '',
      color: '#000000',
      range: 50,
      file: null,
    });
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Comprehensive Form Example</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Text Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Input
              </label>
              <input
                type="text"
                name="textInput"
                value={formData.textInput}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter text here"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email address"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>

            {/* Number Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number
              </label>
              <input
                type="number"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a number"
              />
            </div>

            {/* Telephone Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="tel"
                value={formData.tel}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
              />
            </div>

            {/* URL Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com"
              />
            </div>

            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="search"
                name="search"
                value={formData.search}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search for something"
              />
            </div>

            {/* Textarea */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Textarea
              </label>
              <textarea
                name="textarea"
                value={formData.textarea}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your message here"
              />
            </div>

            {/* Select Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Option
              </label>
              <select
                name="select"
                value={formData.select}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>

            {/* Multi-Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Multi-Select
              </label>
              <select
                name="multiSelect"
                multiple
                value={formData.multiSelect}
                onChange={handleMultiSelectChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                <option value="option4">Option 4</option>
              </select>
              <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple options</p>
            </div>

            {/* Radio Buttons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Radio Buttons
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="radio"
                    value="radio1"
                    checked={formData.radio === 'radio1'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Radio Option 1
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="radio"
                    value="radio2"
                    checked={formData.radio === 'radio2'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Radio Option 2
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="radio"
                    value="radio3"
                    checked={formData.radio === 'radio3'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Radio Option 3
                </label>
              </div>
            </div>

            {/* Checkbox */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="checkbox"
                  checked={formData.checkbox}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">I agree to the terms and conditions</span>
              </label>
            </div>

            {/* Date Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* DateTime Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date and Time
              </label>
              <input
                type="datetime-local"
                name="datetime"
                value={formData.datetime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Time Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Month Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Month
              </label>
              <input
                type="month"
                name="month"
                value={formData.month}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Week Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Week
              </label>
              <input
                type="week"
                name="week"
                value={formData.week}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Color Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Picker
              </label>
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="w-20 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Range Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Range Slider: {formData.range}
              </label>
              <input
                type="range"
                name="range"
                min="0"
                max="100"
                value={formData.range}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>

            {/* File Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                File Upload
              </label>
              <input
                type="file"
                name="file"
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formData.file && (
                <p className="text-sm text-gray-600 mt-1">Selected: {formData.file.name}</p>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex space-x-4 pt-6">
              <button
                type="submit"
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Save size={20} className="mr-2" />
                Submit Form
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <RefreshCw size={20} className="mr-2" />
                Reset Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormsPage;
