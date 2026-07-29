import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

interface MaterialSection {
  route: string;
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'rui-material-overview',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  template: `
<div class="rui-p-4 rui-md:p-6 rui-space-y-6">
  <div class="rui-text-center rui-mb-6">
    <h1 class="rui-font-bold rui-text-on-surface">Angular Material Components</h1>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mt-1 rui-max-w-xl rui-mx-auto">
      Explore each Angular Material component in detail. Click a section to see live examples.
    </p>
  </div>

  <div class="rui-grid rui-grid-cols-1 rui-sm:grid-cols-2 rui-lg:grid-cols-3 rui-gap-4">
    @for (section of sections; track section.route) {
      <a
        [routerLink]="section.route"
        class="rui-block rui-p-5 rui-rounded-xl rui-border rui-border-outline-variant rui-bg-surface rui-no-underline"
        style="transition:all 0.15s;"
      >
        <div class="rui-flex rui-items-center rui-gap-3 rui-mb-2">
          <mat-icon style="transition:color 0.15s;">{{ section.icon }}</mat-icon>
          <h2 [id]="section.route + '-section'" class="rui-text-base rui-font-semibold rui-text-on-surface" style="transition:color 0.15s;">{{ section.title }}</h2>
        </div>
        <p class="rui-text-xs rui-text-on-surface-variant rui-leading-relaxed">{{ section.description }}</p>
      </a>
    }
  </div>
</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialOverview {
  protected sections: MaterialSection[] = [
    { route: '../autocomplete', icon: 'shortcut', title: 'Autocomplete', description: 'mat-autocomplete with keyboard navigation and filtering' },
    { route: '../badge', icon: 'badge', title: 'Badge', description: 'matBadge for notification counts and status indicators' },
    { route: '../bottom-sheet', icon: 'expand_less', title: 'Bottom Sheet', description: 'mat-bottom-sheet for mobile-friendly action sheets' },
    { route: '../button-toggle', icon: 'toggle_off', title: 'Button Toggle', description: 'mat-button-toggle-group for single and multi selection toggles' },
    { route: '../buttons', icon: 'touch_app', title: 'Buttons', description: 'mat-button, mat-raised-button, mat-stroked-button, mat-flat-button, mat-fab, mat-mini-fab, mat-icon-button' },
    { route: '../cards', icon: 'credit_card', title: 'Cards', description: 'mat-card with header, image, content, actions, and footer sections' },
    { route: '../chips', icon: 'label', title: 'Chips', description: 'mat-chip-set, mat-chip with and without icons, disabled state' },
    { route: '../datepicker', icon: 'calendar_today', title: 'Datepicker', description: 'mat-datepicker with single date and range selection' },
    { route: '../dialog', icon: 'dialog', title: 'Dialog', description: 'MatDialog service for modal dialogs with components and templates' },
    { route: '../divider', icon: 'horizontal_rule', title: 'Divider', description: 'mat-divider for horizontal and vertical visual separation' },
    { route: '../expansion', icon: 'expand_more', title: 'Expansion Panel', description: 'mat-expansion-panel in accordion and multi-panel layouts' },
    { route: '../form-fields', icon: 'text_fields', title: 'Form Fields & Inputs', description: 'mat-form-field with outline and fill appearances, matInput, mat-icon prefix/suffix' },
    { route: '../grid-list', icon: 'grid_view', title: 'Grid List', description: 'mat-grid-list with tile layouts (deprecated - CSS Grid recommended)' },
    { route: '../icon', icon: 'emoji_symbols', title: 'Icon', description: 'mat-icon with Material Icons font, colors, and sizes' },
    { route: '../list', icon: 'list', title: 'List', description: 'mat-list with single and multi-line items, icons, and avatars' },
    { route: '../menu', icon: 'menu', title: 'Menu', description: 'mat-menu with text items, icons, and keyboard navigation' },
    { route: '../paginator', icon: 'navigate_next', title: 'Paginator', description: 'mat-paginator with configurable page sizes and first/last navigation buttons' },
    { route: '../progress', icon: 'hourglass_top', title: 'Progress', description: 'mat-progress-bar (determinate + indeterminate), mat-spinner (various sizes)' },
    { route: '../ripples', icon: 'water', title: 'Ripples', description: 'matRipple directive for Material Design click feedback on any element' },
    { route: '../selection-controls', icon: 'check_box_outline_blank', title: 'Selection Controls', description: 'mat-checkbox, mat-radio-button, mat-slide-toggle with various states' },
    { route: '../select-slider', icon: 'tune', title: 'Select & Slider', description: 'mat-select (single + multi), mat-option, mat-slider with thumb' },
    { route: '../sidenav', icon: 'vertical_split', title: 'Sidenav', description: 'mat-drawer-container with side navigation panel' },
    { route: '../snackbar', icon: 'info', title: 'Snackbar', description: 'MatSnackBar service with action buttons and duration control' },
    { route: '../sort', icon: 'sort', title: 'Sort Header', description: 'mat-sort-header for column-based table sorting' },
    { route: '../stepper', icon: 'steps', title: 'Stepper', description: 'mat-stepper with linear and non-linear horizontal/vertical wizard workflows' },
    { route: '../table', icon: 'table_chart', title: 'Table', description: 'mat-table with static, sortable, and paginated data views' },
    { route: '../tabs', icon: 'tab', title: 'Tabs', description: 'mat-tab-group with mat-tab, including disabled tab state' },
    { route: '../timepicker', icon: 'schedule', title: 'Timepicker', description: 'input type="time" with matInput and mat-form-field integration' },
    { route: '../toolbar', icon: 'toolbar', title: 'Toolbar', description: 'mat-toolbar with single and multi-row app bar layouts' },
    { route: '../tooltip', icon: 'chat', title: 'Tooltip', description: 'matTooltip with positions, show/hide delay configuration' },
    { route: '../tree', icon: 'account_tree', title: 'Tree', description: 'mat-tree with flat data source and checkbox selection' },
  ];
}
