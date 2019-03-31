import { SemanticICONS, SemanticCOLORS } from 'semantic-ui-react';

/**
 * @member icon
 * @member color
 * @member href
 */
export interface LinkItem {
  icon?: SemanticICONS;
  color?: SemanticCOLORS;
  href: string;
}

/**
 * @member title
 * @member links
 * @member date
 * @member description
 */
export interface DataItem {
  title: string;
  links: LinkItem[];
  date?: string;
  description?: string;
}
