import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { SourceItem } from '../types';

interface SourceDropdownProps {
  sources: SourceItem[];
  selectedSource: string;
  onSourceSelect: (sourceId: string, sourceName: string) => void;
}

const SourceDropdown: React.FC<SourceDropdownProps> = ({
  sources,
  selectedSource,
  onSourceSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getSelectedSourceName = () => {
    if (!selectedSource) return 'Source';
    
    const findSourceName = (items: SourceItem[]): string => {
      for (const item of items) {
        if (item.id === selectedSource) return item.name;
        if (item.children) {
          const childResult = findSourceName(item.children);
          if (childResult) return childResult;
        }
      }
      return '';
    };
    const sourceName = findSourceName(sources);
    return sourceName || 'Source';
  };

  const renderSourceItem = (item: SourceItem, depth: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const paddingLeft = depth * 20 + 16;

    return (
      <div key={item.id}>
        <div
          className={`flex items-center justify-between px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors ${
            selectedSource === item.id ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
          }`}
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={() => {
            onSourceSelect(item.id, item.name);
            setIsOpen(false);
          }}
        >
          <div className="flex items-center space-x-2">
            {hasChildren && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpanded(item.id);
                }}
                className="p-1 hover:bg-gray-200 rounded"
              >
                {isExpanded ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </button>
            )}
            <span className={`${!hasChildren ? 'ml-6' : ''} font-medium`}>
              {item.name}
            </span>
          </div>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            L{item.level}
          </span>
        </div>
        {hasChildren && isExpanded && (
          <div>
            {item.children!.map((child) => renderSourceItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-6 py-3 text-left bg-white border border-gray-200 rounded-xl shadow-sm hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-w-[160px]"
      >
        <span className="text-gray-700 font-medium">{getSelectedSourceName()}</span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transform transition-transform ml-4 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full min-w-[300px] mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto">
          {/* Default "All Sources" option */}
          <div
            className={`flex items-center justify-between px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors ${
              !selectedSource ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
            }`}
            onClick={() => {
              onSourceSelect('', 'Source');
              setIsOpen(false);
            }}
          >
            <span className="font-medium">All Sources</span>
          </div>
          
          {sources.length === 0 ? (
            <div className="px-4 py-6 text-sm text-gray-500 text-center border-t border-gray-100">
              No sources configured
            </div>
          ) : (
            <div className="border-t border-gray-100">
              {sources.map((source) => renderSourceItem(source))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SourceDropdown;