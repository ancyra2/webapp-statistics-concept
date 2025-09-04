import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, Signal} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Block, TextNode, TextStyle} from '../../core/interfaces/editor/block';
import { v4 as uuidv4 } from 'uuid';
import { ParagraphBlockComponent } from './blocks/paragraph-block/paragraph-block.component';
import { BlockService } from './blocks/services/block.service';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    MatTableModule, MatButtonModule, CommonModule,
    MatFormFieldModule, ReactiveFormsModule, MatInputModule,
    MatIconModule, MatToolbarModule, MatCheckboxModule, DialogModule,
    MatDialogModule, MatProgressSpinnerModule, MatPaginatorModule, MatMenuModule, MatSelectModule,
    ParagraphBlockComponent
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit {
  blocks!: Signal<Block[]>;
  activeBlock!: Signal<Block | null>;
  activeElementRef!: Signal<ElementRef | null>;

  constructor(private blockService: BlockService){
    
  }
  ngOnInit(): void {
    this.blocks = this.blockService.blocks;
    this.activeBlock = this.blockService.activeBlock;
    this.activeElementRef = this.blockService.activeElementRef;
  }


  addParagraphBlock(): void{
    this.blockService.addParagraphBlock();
  }

  getParagraphContent(block: Block): TextNode[] {
  if (block.type === 'paragraph') {
    return block.data.content;
  }
  return [];
  }

  
  addStyle(style: TextStyle){
    const block = this.activeBlock();
    const activeParagraphTree = this.blockService.activeTextNodeTree();

    if(!block){
      throw new Error('block value is null');
    }

    this.blockService.applyStyle({block, style: style });  
    
  }


}