import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-latex-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TextFieldModule
  ],
  templateUrl: './latex-editor.component.html',
  styleUrl: './latex-editor.component.scss'
})
export class LatexEditorComponent {
  protected readonly content = signal<string>(
    `\\documentclass{article}
\\begin{document}
\\section{Introduction}
Welcome to your collaborative LaTeX studio. Start writing your document here.\\\n\\end{document}`
  );

  protected clear(): void {
    this.content.set('');
  }
}
