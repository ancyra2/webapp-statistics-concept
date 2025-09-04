import { TextNode } from "../interfaces/editor/block";

export class TextNodeTree{
    private nodes: TextNode[] = [];

    constructor(rootNode?: TextNode) {
    if (rootNode) {
      this.nodes.push(rootNode);
    }
  }

  setTextNode(index: number, textNode: TextNode) {
    this.nodes[index] = textNode;
  }
  
  createFirstNode(textNode: TextNode) {
    this.nodes.push(textNode);
  }

  getChildrenIndices(parentIndex: number): number[] {
    const base = 3 * parentIndex + 1;
    return [base, base + 1, base + 2].filter(i => i < this.nodes.length);
  }

   getParentIndex(childIndex: number): number | null {
    if (childIndex === 0) return null; 
    return Math.floor((childIndex - 1) / 3);
  }

  getNode(index: number | null): TextNode | null {
    if(index) return this.nodes[index];
    
    return null;
  }

  hasChild(parentIndex: number): boolean {
    const children = this.getChildrenIndices(parentIndex);
    return children.some(i => this.nodes[i]);
  }
  
  addNode(node: TextNode): void {
    this.nodes.push(node);  
  }

  dfs(index: number = 0, callback: (node: TextNode, index: number) => void): void {
    if (index >= this.nodes.length) return;
    const node = this.nodes[index];
    if (!node || node.value === '') return;

    callback(node, index);

    const children = this.getChildrenIndices(index);
    for (const childIndex of children) {
      this.dfs(childIndex, callback);
    }
  }

  getLength(){
    return this.nodes.length;
  }

  getHeight(index: number = 0): number {
  if (index >= this.nodes.length) return 0;
  const node = this.nodes[index];

  if (!node) return 0;

  const childrenIndices = this.getChildrenIndices(index);

  if (childrenIndices.length === 0) return 0;
  
  const childHeights = childrenIndices.map(childIndex => this.getHeight(childIndex));
  return 1 + Math.max(...childHeights);

}


  findNodeByLocation(index: number = 0, start: number, end: number): {textNode: TextNode, index: number} | null {
    if (index >= this.nodes.length) return null;

    const node = this.nodes[index];
    if (!node) return null;

    const { start: nodeStart, end: nodeEnd } = node.location;

    if (
        typeof nodeStart === 'number' &&
        typeof nodeEnd === 'number' &&
        start >= nodeStart &&
        nodeEnd <= end &&
        !this.hasChild(index)
       ) {
          return {textNode: node, index: index};
       }

    const childrenIndices = this.getChildrenIndices(index);
    for (const childIndex of childrenIndices) {
      const found = this.findNodeByLocation(childIndex, start, end);
      if(found !== null) return found;
    }

    return null;

  }

  findFirstNodeByLocation(index: number = 0, start: number): number | null {
    
    const childrenIndices = this.getChildrenIndices(index);

    for (const childIndex of childrenIndices) {
      
    const node = this.nodes[childIndex];
    const { start: nodeStart, end: nodeEnd } = node.location;
     
      if (
        typeof nodeStart === 'number' &&
        typeof nodeEnd === 'number' &&
        start >= nodeStart &&
        start <= nodeEnd
       ) {
          return childIndex;
       }

    }

    return null;

  }

  spreadDown(locationIndex: number, value: string){
    const nodeLength = this.getLength();
    
    this.dfs(locationIndex, ()=>{
      
    })
  }

}