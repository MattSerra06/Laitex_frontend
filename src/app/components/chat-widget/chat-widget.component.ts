import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface ChatMessage {
  author: 'assistant' | 'user';
  text: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './chat-widget.component.html',
  styleUrl: './chat-widget.component.scss'
})
export class ChatWidgetComponent {
  protected readonly isOpen = signal(false);
  protected readonly isExpanded = signal(false);
  protected readonly draft = signal('');
  protected readonly messages = signal<ChatMessage[]>([
    {
      author: 'assistant',
      text: 'Hi! I can help you outline and compile your LaTeX project.',
      timestamp: new Date()
    }
  ]);

  protected readonly title = computed(() => (this.isExpanded() ? 'Conversation' : 'Chat with Laitex AI'));

  protected toggleOpen(): void {
    this.isOpen.update((value) => !value);
  }

  protected toggleExpanded(): void {
    this.isExpanded.update((value) => !value);
    this.isOpen.set(true);
  }

  protected send(): void {
    const content = this.draft().trim();
    if (!content) {
      return;
    }

    this.messages.update((history) => [
      ...history,
      { author: 'user', text: content, timestamp: new Date() },
      { author: 'assistant', text: 'This is a placeholder response from the assistant.', timestamp: new Date() }
    ]);
    this.draft.set('');
  }
}
