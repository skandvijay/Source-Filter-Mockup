import React, { useState } from 'react';
import { SourceItem } from './types';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import SourceEditor from './components/SourceEditor';

const initialSources: SourceItem[] = [
  {
    id: 'source-1',
    name: 'Documentation',
    level: 1,
    children: [
      {
        id: 'source-1-1',
        name: 'API Docs',
        level: 2,
        parentId: 'source-1',
        children: [
          {
            id: 'source-1-1-1',
            name: 'REST API',
            level: 3,
            parentId: 'source-1-1',
            children: [],
          },
          {
            id: 'source-1-1-2',
            name: 'GraphQL API',
            level: 3,
            parentId: 'source-1-1',
            children: [],
          },
        ],
      },
      {
        id: 'source-1-2',
        name: 'User Guides',
        level: 2,
        parentId: 'source-1',
        children: [],
      },
    ],
  },
  {
    id: 'source-2',
    name: 'Knowledge Base',
    level: 1,
    children: [
      {
        id: 'source-2-1',
        name: 'FAQs',
        level: 2,
        parentId: 'source-2',
        children: [],
      },
      {
        id: 'source-2-2',
        name: 'Troubleshooting',
        level: 2,
        parentId: 'source-2',
        children: [],
      },
    ],
  },
  {
    id: 'source-3',
    name: 'Support Tickets',
    level: 1,
    children: [],
  },
];

function App() {
  const [sources, setSources] = useState<SourceItem[]>(initialSources);
  const [maxSources, setMaxSources] = useState(10);
  const [selectedSource, setSelectedSource] = useState(''); // Start with empty selection

  const handleSourceSelect = (sourceId: string, sourceName: string) => {
    setSelectedSource(sourceId);
  };

  const handleSourcesChange = (newSources: SourceItem[]) => {
    setSources(newSources);
  };

  const handleMaxSourcesChange = (max: number) => {
    setMaxSources(max);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex">
        <MainContent
          sources={sources}
          selectedSource={selectedSource}
          onSourceSelect={handleSourceSelect}
        />

        {/* Source Editor Panel */}
        <SourceEditor
          sources={sources}
          maxSources={maxSources}
          onSourcesChange={handleSourcesChange}
          onMaxSourcesChange={handleMaxSourcesChange}
        />
      </div>
    </div>
  );
}

export default App;