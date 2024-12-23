import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Query, QueryList, ViewChild, ViewChildren, viewChildren} from '@angular/core';
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
import { Block } from '../../interfaces/editor/block';
import { BlockData, HeaderData, ParagraphData} from '../../interfaces/editor/block-data';
import { ContentEditableModelDirective } from './content-editable-model.directive';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    MatTableModule, MatButtonModule, CommonModule,
    MatFormFieldModule, ReactiveFormsModule, MatInputModule,
    MatIconModule, MatToolbarModule, MatCheckboxModule, DialogModule,
    MatDialogModule, MatProgressSpinnerModule, MatPaginatorModule, MatMenuModule, MatSelectModule,
    ContentEditableModelDirective
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {

  blocks: Block<BlockData>[] = [];
  selectionStart!: number ;
  selectionEnd!: number ;
  _activeBlockIndex!: number;
  _activeBlockMicroIndex!: number;
  _caretPos! : number;
  @ViewChild('BlockElements') blockElements! : ElementRef;
  
  addBlock(block: Block<BlockData>) {
    this.blocks.push(block);
    console.log(this.blocks);
  }
  
  get blocksArr(){
    return this.blocks;
  }

  get activeBlockIndex(){
    return this._activeBlockIndex;
  }

  set activeBlockIndex(index: number){
    this._activeBlockIndex = index;
  } 

  get activeBlockMicroIndex(){
    return this._activeBlockMicroIndex
  }

  set activeBlockMicroIndex(index: number){
    this._activeBlockMicroIndex = index;
  }

  get caretPos(){
    return this._caretPos;
  }

  set caretPos(position: number){
    this._caretPos = position;
  }

  updateContentValue(event: string, block: Block<BlockData>, index: number): void {
    const inputValue = event;
    if (block.type === 'paragraph' && this.isParagraphData(block.data)) {
      block.data.content[index].text = inputValue;
      this.activeBlockMicroIndex = index;
    }else if (block.type === 'header' && this.isHeaderData(block.data)) {
      block.data.text = inputValue;
    }
  }

  getSelectedTextIndexes(): number[]{
    const selection = window.getSelection();
    
    const selectionArr = [];
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      const selectionStartIndex = range.startOffset;
      const seletionEndIndex = range.endOffset;

      selectionArr.push(selectionStartIndex);
      selectionArr.push(seletionEndIndex);
    }
    return selectionArr;
  }

  setSelectedTextIndexes(){
    const selections = this.getSelectedTextIndexes()
    this.selectionStart = selections[0];
    this.selectionEnd = selections[1]; 
    
  }

  splitIntoChunks(block: Block<BlockData>){
    
    const selectionStartIndex = this.selectionStart;
    const selectionEndIndex = this.selectionEnd;
    const activeBlockIndex = this.activeBlockIndex;
    const activeBlockMicroIndex = this.activeBlockMicroIndex;

    if(this.isParagraphData(block.data)){

      const activeBlockContent = block.data.content;
     
      const contentTextLength = activeBlockContent[activeBlockMicroIndex].text.length;
      const beforePart = activeBlockContent[activeBlockMicroIndex].text.slice(0, selectionStartIndex);
      const mainPart = activeBlockContent[activeBlockMicroIndex].text.slice(selectionStartIndex, selectionEndIndex);
      const afterPart = activeBlockContent[activeBlockMicroIndex].text.slice(selectionEndIndex, contentTextLength);
     
      if(beforePart === ''){
        const splitedContent = [
          {text: mainPart, style: {bold: true} },
          {text: afterPart}
        ];
    
        block.data.content.splice(
          activeBlockMicroIndex,
          1,
          ...splitedContent
        );

      }else if(afterPart === ''){
        const splitedContent = [
          {text: beforePart},
          {text: mainPart, style: {bold: true} },
        ];

        block.data.content.splice(
          activeBlockMicroIndex,
          1,
          ...splitedContent
        );
      }
      else{
        const splitedContent = [
          {text: beforePart},
          {text: mainPart, style: {bold: true} },
          {text: afterPart}
        ];

        block.data.content.splice(
          activeBlockMicroIndex,
          1,
          ...splitedContent
        );
      }
     
    }

  }

  controlCaret(event: KeyboardEvent, activeIndex: number, activeMicroIndex: number){
    const element = event.target as HTMLSpanElement;
    const blocks = this.blockElements.nativeElement.querySelectorAll('.editor-input-wrapper');
    const selection = window.getSelection();

    const caretPos = selection?.anchorOffset;
    const textLength = element.textContent?.length;

    if(event.key === "ArrowRight" && caretPos === textLength){
      const nextBlock = blocks[activeMicroIndex + 1];
      if(nextBlock){
        nextBlock.focus();
      }
    }else if(event.key === "ArrowLeft" && caretPos === 0){
      const prevBlock = blocks[activeMicroIndex - 1];
      if (prevBlock) {
        prevBlock.focus();
        this.setCaretPosition(prevBlock, "end");
      }
    }
  }

  setCaretPosition(element: HTMLElement, position: 'start' | 'end') {
    const selection = window.getSelection();
    const range = document.createRange();
  
    if (position === 'start') {
      range.setStart(element.childNodes[0] || element, 0);
      range.setEnd(element.childNodes[0] || element, 0);
    } else if (position === 'end') {
      const textLength = element.textContent?.length || 0;
      range.setStart(element.childNodes[0] || element, textLength);
      range.setEnd(element.childNodes[0] || element, textLength);
    }
  
    selection?.removeAllRanges();
    selection?.addRange(range);
  }

  deleteMicroBlock(event: KeyboardEvent, activeIndex: number, activeMicroIndex: number){
    const blocks = this.blockElements.nativeElement.querySelectorAll('.editor-input-wrapper');
    const block = this.blocksArr[activeIndex];
    const prevBlock = blocks[activeMicroIndex - 1];
    const afterBlock = blocks[activeMicroIndex + 1];
    
    if(this.isParagraphData(block.data)){
      
      const microBlock = block.data.content[activeMicroIndex];

      if(event.key === 'Backspace' && (microBlock.text === '\n' || microBlock.text === '')){
        if(block.data.content.length === 1) return;
        block.data.content.splice(activeMicroIndex, 1);
        if(prevBlock){
          prevBlock.focus();
          this.setCaretPosition(prevBlock, "end");
        }else if(afterBlock){
          afterBlock.focus();
          this.setCaretPosition(afterBlock, "start");
        } 
      }
    }
    
  }

  isHeaderData(data: BlockData): data is HeaderData {
    return (data as HeaderData).text !== undefined && (data as HeaderData).level !== undefined;
  }

  isParagraphData(data: BlockData): data is ParagraphData {
    return (data as ParagraphData).content !== undefined;
  }

}