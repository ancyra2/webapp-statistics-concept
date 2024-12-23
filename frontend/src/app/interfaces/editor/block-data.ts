export type BlockData = ParagraphData | HeaderData | ImageData | ListData;

export interface HeaderData {
    text: string,
    level: 1 | 2 | 3 | 4 | 5 | 6;
  }

export interface ParagraphData {
    content: TextPart[];
  }

export interface ImageData {
    url: string;
    alt?: string; 
    caption?: string; 
  }
  
export interface ListData {
    style: 'ordered' | 'unordered';
    items: string[];
  }

export interface TextPart {
    text: string; 
    style?: TextStyle;
  }
  
export interface TextStyle {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    color?: string; 
    fontSize?: number;
  }