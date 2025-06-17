import React, { useState } from 'react';
import { Plus, Trash2, Edit3, ChevronRight, ChevronDown, Save, X, Settings } from 'lucide-react';
import { SourceItem } from '../types';

interface SourceEditorProps {
  sources: SourceItem[];
  maxSources: number;
  onSourcesChange: (sources: SourceItem[]) => void;
  onMaxSourcesChange: (max: number) => void;
}

const SourceEditor: React.FC<SourceEditorProps> = ({
  sources,
  maxSources,
  onSourcesChange,
  onMaxSourcesChange,
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const generateId = () => `source-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const addSource = (parentId?: string, level: 1 | 2 | 3 = 1) => {
    const newSource: SourceItem = {
      id: generateId(),
      name: `New Source L${level}`,
      level,
      parentId,
      children: [],
    };

    if (parentId) {
      const updateChildren = (items: SourceItem[]): SourceItem[] => {
        return items.map(item => {
          if (item.id === parentId) {
            return {
              ...item,
              children: [...(item.children || []), newSource],
            };
          }
          if (item.children && item.children.length > 0) {
            return {
              ...item,
              children: updateChildren(item.children),
            };
          }
          return item;
        });
      };
      onSourcesChange(updateChildren(sources));
      setExpandedItems(prev => new Set([...prev, parentId]));
    } else {
      onSourcesChange([...sources, newSource]);
    }
  };

  const deleteSource = (id: string) => {
    const deleteFromTree = (items: SourceItem[]): SourceItem[] => {
      return items.filter(item => item.id !== id).map(item => ({
        ...item,
        children: item.children ? deleteFromTree(item.children) : [],
      }));
    };
    onSourcesChange(deleteFromTree(sources));
  };

  const startEditing = (id: string, currentName: string) => {
    setEditingItem(id);
    setEditingName(currentName);
  };

  const saveEdit = () => {
    if (!editingItem || !editingName.trim()) return;

    const updateName = (items: SourceItem[]): SourceItem[] => {
      return items.map(item => {
        if (item.id === editingItem) {
          return { ...item, name: editingName.trim() };
        }
        if (item.children && item.children.length > 0) {
          return { ...item, children: updateName(item.children) };
        }
        return item;
      });
    };

    onSourcesChange(updateName(sources));
    setEditingItem(null);
    setEditingName('');
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setEditingName('');
  };

  const renderSourceItem = (item: SourceItem, depth: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const isEditing = editingItem === item.id;
    const canAddChild = item.level < 3;
    const paddingLeft = depth * 20;

    return (
      <div key={item.id} className="border-l-2 border-gray-100">
        <div
          className="flex items-center justify-between p-4 hover:bg-gray-50 group transition-colors border-b border-gray-50"
          style={{ paddingLeft: `${paddingLeft + 16}px` }}
        >
          <div className="flex items-center space-x-3 flex-1">
            {hasChildren && (
              <button
                onClick={() => toggleExpanded(item.id)}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            )}
            
            {isEditing ? (
              <div className="flex items-center space-x-2 flex-1">
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEdit();
                    if (e.key === 'Escape') cancelEdit();
                  }}
                  className="flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  onClick={saveEdit}
                  className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <Save size={16} />
                </button>
                <button
                  onClick={cancelEdit}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 flex-1">
                {!hasChildren && <div className="w-6"></div>}
                <span className="font-semibold text-gray-800">{item.name}</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  L{item.level}
                </span>
              </div>
            )}
          </div>

          {!isEditing && (
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {canAddChild && (
                <button
                  onClick={() => addSource(item.id, (item.level + 1) as 2 | 3)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                  title="Add child source"
                >
                  <Plus size={16} />
                </button>
              )}
              <button
                onClick={() => startEditing(item.id, item.name)}
                className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                title="Edit source name"
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={() => deleteSource(item.id)}
                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                title="Delete source"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="ml-4">
            {item.children!.map((child) => renderSourceItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const totalSources = sources.length;

  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col h-full shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center space-x-3 mb-4">
          <Settings className="text-blue-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Source Filter Editor</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Maximum Sources
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={maxSources}
              onChange={(e) => onMaxSourcesChange(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 font-medium">
              {totalSources} / {maxSources} sources configured
            </span>
            <button
              onClick={() => addSource()}
              disabled={totalSources >= maxSources}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <Plus size={16} />
              <span>Add L1</span>
            </button>
          </div>
        </div>
      </div>

      {/* Source List */}
      <div className="flex-1 overflow-y-auto">
        {sources.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="text-gray-400" size={24} />
            </div>
            <p className="text-gray-500 mb-6">No sources configured yet.</p>
            <button
              onClick={() => addSource()}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto font-medium"
            >
              <Plus size={16} />
              <span>Add Your First Source</span>
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {sources.map((source) => renderSourceItem(source))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span className="font-medium">Hierarchy: L1 → L2 → L3</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Live Preview</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceEditor;