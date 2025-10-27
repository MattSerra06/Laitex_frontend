import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { ProjectStructureComponent } from './components/project-structure/project-structure.component';
import { LatexEditorComponent } from './components/latex-editor/latex-editor.component';
import { LatexPreviewComponent } from './components/latex-preview/latex-preview.component';
import { ChatWidgetComponent } from './components/chat-widget/chat-widget.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    ProjectStructureComponent,
    LatexEditorComponent,
    LatexPreviewComponent,
    ChatWidgetComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly themeService = inject(ThemeService);
  protected readonly isHandset = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(map((result) => result.matches)),
    { initialValue: false }
  );
  protected readonly drawerOpen = signal(false);
  protected readonly themeMode = this.themeService.mode;

  protected readonly sidenavMode = computed(() => (this.isHandset() ? 'over' : 'side'));

  protected toggleDrawer(): void {
    if (this.isHandset()) {
      this.drawerOpen.update((value) => !value);
    }
  }

  protected toggleTheme(): void {
    this.themeService.toggle();
  }
}
