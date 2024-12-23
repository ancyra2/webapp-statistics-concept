import { BlockData } from "./block-data";

export interface Block <T = BlockData>{
    type: BlockType;
    data: T;
}

export type BlockType = 'header' | 'paragraph' | 'image' | 'list';