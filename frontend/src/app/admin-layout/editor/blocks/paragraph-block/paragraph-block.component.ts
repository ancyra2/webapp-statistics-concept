import { AfterViewInit, Component, ElementRef, Input, OnInit, signal, Signal, ViewChild} from '@angular/core';
import { Block, TextNode } from '../../../../core/interfaces/editor/block';
import { BlockService } from '../services/block.service';
import { TextNodeTree } from '../../../../core/models/text-node-tree.models';

@Component({
  selector: 'app-paragraph-block',
  standalone: true,
  imports: [],
  templateUrl: './paragraph-block.component.html',
  styleUrl: './paragraph-block.component.scss'
})
export class ParagraphBlockComponent implements AfterViewInit, OnInit{
  @Input() content: TextNode[] = [];
  @Input() block!: Block | null;
  
  textNodeTree: Signal<TextNodeTree>;
  blocks!: Signal<Block[]>;
  activeBlock!: Signal<Block | null>;
  
  @ViewChild('editable', {static: true}) paragraphRef!: ElementRef<HTMLParagraphElement>;
  

  ngAfterViewInit(): void {}

  constructor(private blockService: BlockService){
    this.textNodeTree = signal<TextNodeTree>(new TextNodeTree({value: '',location: {start: 0, end: 0}}));
  }

  ngOnInit(): void {
    this.blocks = this.blockService.blocks;
    this.activeBlock = this.blockService.activeBlock;
  }

  setActiveBlock(){
    this.blockService.activeBlock.set(this.block);
    this.blockService.activeElementRef.set(this.paragraphRef);
    this.blockService.activeTextNodeTree.set(this.textNodeTree());
    
  }

  spreadTextToNodes(event: Event){

    const tree = this.textNodeTree();

    const selection = window.getSelection();
     if (!selection || !selection.anchorNode) return;

    const anchorNode = selection.anchorNode;
    const focusNode = selection.focusNode;

    if (!anchorNode || !focusNode) return;

    const startOffset = Math.min(selection.anchorOffset, selection.focusOffset);
    //const el = this.blockService.activeElementRef()?.nativeElement as HTMLElement;

    const inputElement = event.target as HTMLElement;
    const char = inputElement.textContent?.trim().slice(startOffset - 1, startOffset) ?? '';
    

    const locationIndex = tree.findFirstNodeByLocation(0, startOffset - 1);
    console.log(locationIndex);
    const node = tree.getNode(locationIndex);
    
    /*if (locationIndex !== null) {
      let j = 0;

      tree.dfs(0, (node, currentIndex) => {
        if (currentIndex >= locationIndex) {
          if (node.location.start != null && node.location.end != null) {
            if (j === 0) {
              node.location.end += 1;
              node.value += char;
            } else {
              node.location.start += 1;
              node.location.end += 1;
            }
            j++;
          }
        }
      });
    }*/
    
    if(locationIndex){
      tree.spreadDown(locationIndex, char);
    }

    console.log(tree);
  
  }
  
}
