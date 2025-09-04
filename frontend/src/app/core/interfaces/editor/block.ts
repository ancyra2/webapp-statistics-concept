export interface BlockBase {
  id: string;
  type: string;
}

export type Block =
  | HeaderBlock
  | ParagraphBlock
  | ImageBlock
  | ListBlock;

export interface HeaderBlock extends BlockBase {
  type: 'header';
  data: {
    text: string;
    level: 1 | 2 | 3 | 4 | 5 | 6;
  };
}

export interface ParagraphBlock extends BlockBase {
  type: 'paragraph';
  data: {
    content: TextNode[];
  };
}

export interface ImageBlock extends BlockBase {
  type: 'image';
  data: {
    url: string;
    alt?: string;
    caption?: string;
  };
}

export interface ListBlock extends BlockBase {
  type: 'list';
  data: {
    style: 'ordered' | 'unordered';
    items: string[];
  };
}

export interface TextNode {
  value: string;
  location: {start: number | null; end: number | null;};
  style?: TextStyle;
}

export interface TextStyle {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
  fontSize?: number;
}
