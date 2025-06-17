export interface SourceItem {
  id: string;
  name: string;
  level: 1 | 2 | 3;
  parentId?: string;
  children?: SourceItem[];
}

export interface SourceConfig {
  maxSources: number;
  sources: SourceItem[];
}