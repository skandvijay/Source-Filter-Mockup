import React from 'react';
import { Home, Compass, Clock, Bookmark, Scissors, Mail } from 'lucide-react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Compass, label: 'Discover' },
    { icon: Clock, label: 'Recent' },
    { icon: Bookmark, label: 'Saved' },
    { icon: Scissors, label: 'Shortcuts' },
    { icon: Mail, label: 'Shared' },
  ];

  return (
    <div className="w-72 bg-blue-900 text-white flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-blue-800">
        <div className="flex items-center space-x-3">
          <div className="text-2xl font-bold">capacity</div>
          <div className="text-xs bg-blue-800 px-2 py-1 rounded">®</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 px-6 py-3 cursor-pointer transition-colors ${
              item.active 
                ? 'bg-blue-800 border-r-2 border-blue-400' 
                : 'hover:bg-blue-800'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </nav>

      {/* Collapse Button */}
      <div className="p-4 border-t border-blue-800">
        <button className="w-full flex items-center justify-center p-2 hover:bg-blue-800 rounded transition-colors">
          <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </button>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-blue-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold">SV</span>
          </div>
          <div>
            <div className="font-medium text-sm">Skand Vijay</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;