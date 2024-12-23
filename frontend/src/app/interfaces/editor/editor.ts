import { BlockData } from "./block-data";
import { Block } from "./block";

export interface Editor{
    blocks: Block<BlockData>[];
}