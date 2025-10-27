import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

interface WorkspaceNode {
  name: string;
  type: 'folder' | 'file';
  icon?: string;
  children?: WorkspaceNode[];
}

const WORKSPACE_STRUCTURE: WorkspaceNode[] = [
  {
    name: 'main.tex',
    type: 'file',
    icon: 'description'
  },
  {
    name: 'chapters',
    type: 'folder',
    children: [
      { name: 'introduction.tex', type: 'file', icon: 'description' },
      { name: 'related-work.tex', type: 'file', icon: 'description' },
      { name: 'conclusion.tex', type: 'file', icon: 'description' }
    ]
  },
  {
    name: 'figures',
    type: 'folder',
    children: [
      { name: 'diagram.pdf', type: 'file', icon: 'picture_as_pdf' },
      { name: 'architecture.drawio', type: 'file', icon: 'image' }
    ]
  },
  {
    name: 'bibliography.bib',
    type: 'file',
    icon: 'book'
  },
  {
    name: 'build',
    type: 'folder',
    children: [
      { name: 'output.pdf', type: 'file', icon: 'picture_as_pdf' }
    ]
  }
];

@Component({
  selector: 'app-file-tree',
  standalone: true,
  imports: [CommonModule, MatTreeModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './file-tree.component.html',
  styleUrl: './file-tree.component.scss'
})
export class FileTreeComponent {
  protected readonly treeControl = new NestedTreeControl<WorkspaceNode>((node) => node.children ?? []);
  protected readonly dataSource = new MatTreeNestedDataSource<WorkspaceNode>();

  constructor() {
    this.dataSource.data = WORKSPACE_STRUCTURE;
  }

  protected hasChild = (_: number, node: WorkspaceNode): boolean => !!node.children?.length;

  protected expandAll(): void {
    this.treeControl.expandAll();
  }

  protected collapseAll(): void {
    this.treeControl.collapseAll();
  }
}
