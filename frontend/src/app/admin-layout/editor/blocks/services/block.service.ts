import { ElementRef, Injectable, signal } from '@angular/core';
import { Block, ParagraphBlock, TextNode, TextStyle } from '../../../../core/interfaces/editor/block';
import { v4 as uuidv4 } from 'uuid';
import { TextNodeTree } from '../../../../core/models/text-node-tree.models';
import { Queue } from '../../../../core/models/queue.collection'; 

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  constructor() { }

  blocks = signal<Block[]>([]);
  activeBlock = signal<Block | null>(null);
  activeElementRef = signal<ElementRef | null>(null);
  activeTextNodeTree = signal<TextNodeTree | null>(null);
  currentLevel = 0;

  addParagraphBlock(): void {
    this.blocks.update(block => [
      ...block,
      {
        id: uuidv4(),
        type: 'paragraph',
        data: {
          content: [{ value: '' }]
        }
      } as ParagraphBlock
    ])
  }

  applyStyle({block, style}: {block: Block | null; style?: TextStyle;}) {

    block = this.activeBlock();
    const tree = this.activeTextNodeTree();
    
    const selection = window.getSelection();
    const el = this.activeElementRef()?.nativeElement as HTMLElement;
    const text = el.textContent?.trim() ?? '';
    const textLength = text.length;
    
    if (tree){
      tree.setTextNode(0, {value: text, location: {start: 0, end: textLength}});
    }
    
    if (!selection || selection.isCollapsed) return;

    const anchorNode = selection.anchorNode;
    const focusNode = selection.focusNode;

    if (!anchorNode || !focusNode) return;

    const startOffset = Math.min(selection.anchorOffset, selection.focusOffset);
    const endOffset = Math.max(selection.anchorOffset, selection.focusOffset);

    if (block?.type === 'paragraph' && tree) {
      const textNodeHeight = tree!.getHeight();

      if(textNodeHeight === 0 && tree){

        const beforeText = text.slice(0, startOffset);
        const selectedText = text.slice(startOffset, endOffset);
        const afterText = text.slice(endOffset);

        tree.addNode({value: beforeText, location: {start: 0, end: endOffset}});
        tree.addNode({value: selectedText, location: {start: startOffset, end: endOffset}});
        tree.addNode({value: afterText, location: {start: endOffset, end: textLength}});
        
        this.currentLevel = 1;

      }
      else{
        this.currentLevel += 1;
        
        const nodeLength = tree.getLength();
        const nextBoundary = 3 * (Math.pow(3,this.currentLevel) - 1) / 2;  

        for(let i = nodeLength ; i <= nextBoundary; i++){
          tree.addNode({value: '', location : {start: 0, end: 0}});
        }

      }
      console.log(tree);
    }
  }

}
