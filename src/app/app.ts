import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { DatePipe, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, WritableSignal, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TextFieldModule } from '@angular/cdk/text-field';

type ThemeMode = 'light' | 'dark';

interface ProjectNode {
  readonly name: string;
  readonly type: 'folder' | 'file';
  readonly children?: ProjectNode[];
}

interface ChatMessage {
  readonly author: 'assistant' | 'user';
  readonly content: string;
  readonly timestamp: Date;
}

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NgIf,
    NgFor,
    NgClass,
    NgTemplateOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
    DragDropModule,
    DatePipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    '[class.theme-light]': 'theme() === "light"',
    '[class.theme-dark]': 'theme() === "dark"'
  }
})
export class App {
  protected readonly title = signal('Laitex Studio');

  readonly theme: WritableSignal<ThemeMode> = signal('light');
  readonly isSidenavOpen = signal(true);
  readonly isChatOpen = signal(false);
  readonly isChatFullscreen = signal(false);

  readonly latexSource = signal(`\\documentclass{article}
\\usepackage{amsmath}
\\begin{document}
\\section*{Welcome}
This collaborative workspace renders your LaTeX in real time.
\\[ e^{i\\pi} + 1 = 0 \\\]
\\end{document}`);

  readonly projectStructure = signal<readonly ProjectNode[]>([
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
      name: 'assets',
      type: 'folder',
      children: [
        { name: 'figures', type: 'folder', children: [{ name: 'diagram.pdf', type: 'file' }] },
        { name: 'bibliography.bib', type: 'file' }
      ]
    }
  ]);

  readonly activeNode = signal('main.tex');

  readonly chatMessages = signal<readonly ChatMessage[]>([
    {
      author: 'assistant',
      content: 'Hi! I can help you refine your LaTeX and keep the project tidy.',
      timestamp: new Date()
    }
  ]);

  readonly draftMessage = signal('');

  readonly chatHeaderTitle = computed(() =>
    this.isChatFullscreen() ? 'Assistant · Conversation' : 'Assistant'
  );

  toggleTheme(): void {
    this.theme.update((current) => (current === 'light' ? 'dark' : 'light'));
  }

  toggleSidenav(): void {
    this.isSidenavOpen.update((opened) => !opened);
  }

  setActiveNode(nodeName: string): void {
    this.activeNode.set(nodeName);
  }

  updateLatex(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.latexSource.set(value);
  }

  openChat(): void {
    this.isChatOpen.set(true);
  }

  closeChat(): void {
    this.isChatFullscreen.set(false);
    this.isChatOpen.set(false);
  }

  toggleChatFullscreen(): void {
    this.isChatFullscreen.update((state) => !state);
  }

  sendMessage(event: Event): void {
    event.preventDefault();
    const trimmed = this.draftMessage().trim();
    if (!trimmed) {
      return;
    }

    this.chatMessages.update((messages) => [
      ...messages,
      { author: 'user', content: trimmed, timestamp: new Date() },
      {
        author: 'assistant',
        content: 'Thanks! I will analyze your input and suggest improvements shortly.',
        timestamp: new Date()
      }
    ]);

    this.draftMessage.set('');
  }
}
