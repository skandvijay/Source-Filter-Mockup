import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { SourceItem } from '../types';
import SourceDropdown from './SourceDropdown';

interface MainContentProps {
  sources: SourceItem[];
  selectedSource: string;
  onSourceSelect: (sourceId: string, sourceName: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  sources,
  selectedSource,
  onSourceSelect,
}) => {
  return (
    <div className="flex-1 bg-gray-100 overflow-auto">
      {/* Header with Today indicator */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex justify-end">
          <span className="text-sm text-gray-500">Today</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <div className="bg-blue-900 rounded-2xl p-6 text-white relative overflow-hidden">
            {/* Capacity Logo Circle */}
            <div className="absolute left-6 top-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <div className="text-2xl font-bold text-white">C</div>
              </div>
            </div>
            
            <div className="ml-24">
              <p className="text-lg">
                <span className="font-semibold">Welcome back Skand</span>. Ask me a question or click on one of your recent questions to see what we can find today!
              </p>
            </div>
          </div>
        </div>

        {/* Search Interface */}
        <div className="bg-blue-900 rounded-2xl p-8 mb-8">
          {/* Main Search Bar */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder=""
                className="w-full px-6 py-4 bg-white rounded-xl border-0 text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold transition-colors flex items-center space-x-2">
              <span>Ask Capacity</span>
              <Search size={20} />
            </button>
            <button className="bg-blue-800 hover:bg-blue-700 text-white p-4 rounded-xl transition-colors">
              <Filter size={20} />
            </button>
          </div>

          {/* Filter Controls */}
          <div className="flex items-center space-x-4">
            <SourceDropdown
              sources={sources}
              selectedSource={selectedSource}
              onSourceSelect={onSourceSelect}
            />
            
            <button className="flex items-center justify-between px-6 py-3 text-left bg-white border border-gray-200 rounded-xl shadow-sm hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-w-[120px]">
              <span className="text-gray-700 font-medium">Date</span>
              <div className="w-4 h-4 border border-gray-400 rounded ml-4"></div>
            </button>

            <button className="flex items-center justify-between px-6 py-3 text-left bg-white border border-gray-200 rounded-xl shadow-sm hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-w-[120px]">
              <span className="text-gray-700 font-medium">Type</span>
              <div className="w-4 h-4 border border-gray-400 rounded ml-4"></div>
            </button>
          </div>
        </div>

        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
          <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
          
          <div className="p-8">
            <div className="flex items-start">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome To Capacity</h2>
                <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                  This is a Capacity testing instance, with access to select Capacity documents.
                </p>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  Ask Capacity anything, and discover the right answer at the right time, no matter where it exists. Dive in and let Answer Engine help you find exactly what you're looking for!
                </p>
                
                <div className="space-y-4">
                  <p className="text-gray-900 font-semibold text-lg">Learn More About Capacity</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
              
              {/* Decorative Element */}
              <div className="ml-8 relative">
                <div className="w-32 h-32 relative">
                  {/* Curved lines decoration */}
                  <svg className="w-full h-full" viewBox="0 0 128 128" fill="none">
                    <path d="M20 20 Q60 10, 100 30 Q110 50, 90 80 Q70 100, 40 90 Q20 70, 30 40" 
                          stroke="url(#gradient1)" strokeWidth="2" fill="none"/>
                    <path d="M30 30 Q70 20, 110 40 Q120 60, 100 90 Q80 110, 50 100 Q30 80, 40 50" 
                          stroke="url(#gradient2)" strokeWidth="2" fill="none"/>
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#EF4444" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Topics Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">MY TOPICS</h3>
            <button className="text-blue-600 hover:text-blue-700 font-semibold">
              See All →
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Topic cards would go here */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="h-32 bg-gray-100 rounded-lg mb-4"></div>
              <h4 className="font-semibold text-gray-900 mb-2">Sample Topic</h4>
              <p className="text-gray-600 text-sm">Topic description would appear here...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;