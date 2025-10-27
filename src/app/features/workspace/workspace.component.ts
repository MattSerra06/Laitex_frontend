import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { ThemeService } from '../../core/services/theme.service';
import { FileTreeComponent } from './file-tree/file-tree.component';
import { ChatWidgetComponent } from '../chat/chat-widget.component';

const DEFAULT_LATEX = `\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{graphicx}

\\title{A Gentle Introduction to Fluid Notation}
\\author{Ada Lovelace}
\\date{\\today}

\\begin{document}
\\maketitle

\\begin{abstract}
This short note demonstrates how a collaborative LaTeX workspace can feel lightweight while remaining expressive.
\\end{abstract}

\\section{Motivation}
Writing mathematics should feel as natural as thinking it. Our goal is to keep the tooling out of your way.

\\subsection{Key features}
\\begin{itemize}
  \\item Real-time preview of the rendered document.
  \\item Project structure inspired by Overleaf.
  \\item Built-in assistant for productive collaboration.
\\end{itemize}

\\section{Conclusion}
Reimagining authoring tools means balancing focus, clarity, and speed. This workspace is a step in that direction.

\\end{document}`;

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    CdkScrollableModule,
    FileTreeComponent,
    ChatWidgetComponent
  ],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspaceComponent {
  private readonly themeService = inject(ThemeService);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly latexSource = signal(DEFAULT_LATEX);
  protected readonly renderedLatex = signal(DEFAULT_LATEX);
  protected readonly lastRenderedAt = signal<Date | null>(null);

  protected readonly themeIcon = computed(() => (this.themeService.isDarkTheme() ? 'light_mode' : 'dark_mode'));
  protected readonly themeTooltip = computed(() =>
    this.themeService.isDarkTheme() ? 'Switch to light theme' : 'Switch to dark theme'
  );
  protected readonly renderStatus = computed(() => {
    const timestamp = this.lastRenderedAt();
    if (!timestamp) {
      return 'Preview is waiting for the first render.';
    }

    return `Last rendered ${timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  });

  protected onSourceChange(value: string): void {
    this.latexSource.set(value);
  }

  protected renderDocument(): void {
    this.renderedLatex.set(this.latexSource());
    const now = new Date();
    this.lastRenderedAt.set(now);
    this.snackBar.open('Preview updated', undefined, { duration: 1800 });
  }

  protected exportPdf(): void {
    this.snackBar.open('Export started. We will notify you when the PDF is ready.', undefined, {
      duration: 2400
    });
  }

  protected toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
