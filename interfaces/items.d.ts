import { SemanticICONS, SemanticCOLORS } from 'semantic-ui-react';

export interface LinkItem {
  icon?: SemanticICONS;
  color?: SemanticCOLORS;
  href: string;
}

export interface DataItem {
  title: string;
  links: LinkItem[];
  date?: string;
  description?: string;
}
