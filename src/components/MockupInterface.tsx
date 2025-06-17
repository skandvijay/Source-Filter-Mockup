import React from 'react';
import { Search, Filter } from 'lucide-react';
import { SourceItem } from '../types';
import SourceDropdown from './SourceDropdown';

interface MockupInterfaceProps {
  sources: SourceItem[];
  selectedSource: string;
  onSourceSelect: (sourceId: string, sourceName: string) => void;
}

const MockupInterface: React.FC<MockupInterfaceProps> = ({
  sources,
  selectedSource,
  onSourceSelect,
}) => {
  return (
    <div className="h-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-600 rounded"></div>
            </div>
            <h1 className="text-2xl font-bold text-white">capacity</h1>
          </div>
          
          <div className="bg-blue-800 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full opacity-90"></div>
              </div>
              <div>
                <p className="text-white text-sm">
                  <span className="font-semibold">Welcome back User.</span> Ask me a question or click on one of your recent questions to see what we can find today!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Interface */}
        <div className="bg-blue-800 rounded-2xl p-6 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for anything..."
                className="w-full pl-12 pr-4 py-3 bg-white rounded-lg border-0 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
              <span>Ask Capacity</span>
              <Search size={18} />
            </button>
            <button className="bg-blue-700 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors">
              <Filter size={18} />
            </button>
          </div>

          {/* Filter Controls */}
          <div className="flex items-center space-x-4">
            <SourceDropdown
              sources={sources}
              selectedSource={selectedSource}
              onSourceSelect={onSourceSelect}
            />
            
            <button className="flex items-center justify-between px-4 py-3 text-left bg-white border border-gray-200 rounded-lg shadow-sm hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
              <span className="text-gray-700 font-medium">Date</span>
              <Search size={16} className="text-gray-400 ml-8" />
            </button>

            <button className="flex items-center justify-between px-4 py-3 text-left bg-white border border-gray-200 rounded-lg shadow-sm hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
              <span className="text-gray-700 font-medium">Type</span>
              <Search size={16} className="text-gray-400 ml-8" />
            </button>
          </div>
        </div>

        {/* Welcome Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Welcome To Capacity</h2>
              <p className="text-gray-600 mb-4">
                This is a Capacity testing instance, with access to select Capacity documents.
              </p>
              <p className="text-gray-600 mb-6">
                Ask Capacity anything, and discover the right answer at the right time, no matter where it exists. Dive in and let Answer Engine help you find exactly what you're looking for!
              </p>
              <div className="space-y-2">
                <p className="text-gray-800 font-medium">Learn More About Capacity</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="ml-6">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl opacity-80"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockupInterface;