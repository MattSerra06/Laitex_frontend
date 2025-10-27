import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
}

const SAMPLE_DATA: FileNode[] = [
  {
    name: 'main.tex',
    type: 'file'
  },
  {
    name: 'chapters',
    type: 'folder',
    children: [
      { name: 'chapter-01.tex', type: 'file' },
      { name: 'chapter-02.tex', type: 'file' },
      { name: 'appendix.tex', type: 'file' }
    ]
  },
  {
    name: 'figures',
    type: 'folder',
    children: [
      { name: 'diagram.pdf', type: 'file' },
      { name: 'logo.svg', type: 'file' }
    ]
  },
  {
    name: 'bibliography.bib',
    type: 'file'
  }
];

@Component({
  selector: 'app-project-structure',
  standalone: true,
  imports: [CommonModule, MatTreeModule, MatIconModule, MatButtonModule],
  templateUrl: './project-structure.component.html',
  styleUrl: './project-structure.component.scss'
})
export class ProjectStructureComponent {
  protected readonly treeControl = new NestedTreeControl<FileNode>((node: FileNode) => node.children ?? []);
  protected readonly dataSource = new MatTreeNestedDataSource<FileNode>();
  protected readonly activeFile = signal('main.tex');

  constructor() {
    this.dataSource.data = SAMPLE_DATA;
  }

  protected hasChild = (_: number, node: FileNode) => node.type === 'folder';

  protected openNode(node: FileNode): void {
    if (node.type === 'file') {
      this.activeFile.set(node.name);
    } else {
      this.treeControl.toggle(node);
    }
  }
}
