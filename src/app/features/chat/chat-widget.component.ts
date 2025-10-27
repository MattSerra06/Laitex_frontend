import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

interface ChatMessage {
  author: 'You' | 'Assistant';
  text: string;
  timestamp: string;
}

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule
  ],
  templateUrl: './chat-widget.component.html',
  styleUrl: './chat-widget.component.scss'
})
export class ChatWidgetComponent {
  private readonly initialMessages: ChatMessage[] = [
    {
      author: 'Assistant',
      text: 'Hello there! Ready to help you refine your document whenever you need.',
      timestamp: '09:12'
    },
    {
      author: 'You',
      text: "Could you review the introduction when I'm done?",
      timestamp: '09:14'
    },
    {
      author: 'Assistant',
      text: 'Of course! Ping me once the render is ready.',
      timestamp: '09:15'
    }
  ];

  protected readonly isOpen = signal(false);
  protected readonly isExpanded = signal(false);
  protected readonly draft = signal('');
  protected readonly messages = signal<ChatMessage[]>([...this.initialMessages]);
  protected readonly title = computed(() => (this.isExpanded() ? 'Assistant' : 'Ask Laitex AI'));

  protected openChat(): void {
    this.isOpen.set(true);
  }

  protected closeChat(): void {
    this.isOpen.set(false);
    this.isExpanded.set(false);
  }

  protected toggleExpanded(): void {
    this.isExpanded.update((value) => !value);
  }

  protected sendMessage(): void {
    const trimmed = this.draft().trim();
    if (!trimmed) {
      return;
    }

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    this.messages.update((messages) => [
      ...messages,
      {
        author: 'You',
        text: trimmed,
        timestamp: time
      }
    ]);

    this.draft.set('');
  }

  protected onDraftChange(value: string): void {
    this.draft.set(value);
  }
}
