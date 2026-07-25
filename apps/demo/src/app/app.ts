import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RuiBreadcrumb } from '@all-the.rest/mat-extended/breadcrumb';
import { RuiOnThisPage } from '@all-the.rest/mat-extended/on-this-page';

interface NavGroup {
  label: string;
  items: NavItem[];
}

interface NavItem {
  label: string;
  route: string;
  icon?: string;
}

@Component({
  imports: [RouterModule, MatIconModule, MatTooltipModule, RuiBreadcrumb, RuiOnThisPage],
  selector: 'rui-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected sidebarOpen = signal(false);

  protected navGroups: NavGroup[] = [
    {
      label: 'Components',
      items: [
        { label: 'Cropper', route: '/cropper', icon: 'crop' },
        { label: 'File Upload', route: '/file-upload', icon: 'upload_file' },
        { label: 'File Management', route: '/file-manager', icon: 'file_present' },
        { label: 'Toast', route: '/toast', icon: 'notifications' },
        { label: 'Data Table', route: '/data-table', icon: 'table_chart' },
        { label: 'Dialog', route: '/dialog', icon: 'open_in_new' },
        { label: 'Menu', route: '/menu', icon: 'menu' },
        { label: 'Breadcrumb', route: '/breadcrumb', icon: 'arrow_right_alt' },
        { label: 'Multi-Select', route: '/multi-select', icon: 'playlist_add_check' },
        { label: 'Autocomplete', route: '/autocomplete', icon: 'search' },
        { label: 'Date Input', route: '/date-input', icon: 'calendar_today' },
        { label: 'Navigation', route: '/navigation', icon: 'near_me' },
      ],
    },
    {
      label: 'Angular Material',
      items: [
        { label: 'Autocomplete', route: '/material/autocomplete', icon: 'search' },
        { label: 'Badge', route: '/material/badge', icon: 'verified' },
        { label: 'Bottom Sheet', route: '/material/bottom-sheet', icon: 'expand_less' },
        { label: 'Button Toggle', route: '/material/button-toggle', icon: 'toggle_off' },
        { label: 'Buttons', route: '/material/buttons', icon: 'touch_app' },
        { label: 'Cards', route: '/material/cards', icon: 'credit_card' },
        { label: 'Chips', route: '/material/chips', icon: 'label' },
        { label: 'Datepicker', route: '/material/datepicker', icon: 'calendar_today' },
        { label: 'Dialog', route: '/material/dialog', icon: 'open_in_new' },
        { label: 'Divider', route: '/material/divider', icon: 'horizontal_rule' },
        { label: 'Expansion Panel', route: '/material/expansion', icon: 'expand_more' },
        { label: 'Form Fields', route: '/material/form-fields', icon: 'text_fields' },
        { label: 'Grid List', route: '/material/grid-list', icon: 'grid_on' },
        { label: 'Icon', route: '/material/icon', icon: 'emoji_symbols' },
        { label: 'List', route: '/material/list', icon: 'list' },
        { label: 'Menu', route: '/material/menu', icon: 'menu' },
        { label: 'Paginator', route: '/material/paginator', icon: 'navigate_next' },
        { label: 'Progress', route: '/material/progress', icon: 'hourglass_top' },
        { label: 'Ripples', route: '/material/ripples', icon: 'water' },
        { label: 'Selection Controls', route: '/material/selection-controls', icon: 'check_box_outline_blank' },
        { label: 'Select & Slider', route: '/material/select-slider', icon: 'tune' },
        { label: 'Sidenav', route: '/material/sidenav', icon: 'vertical_split' },
        { label: 'Snackbar', route: '/material/snackbar', icon: 'info' },
        { label: 'Sort Header', route: '/material/sort', icon: 'sort' },
        { label: 'Stepper', route: '/material/stepper', icon: 'steps' },
        { label: 'Table', route: '/material/table', icon: 'table_chart' },
        { label: 'Tabs', route: '/material/tabs', icon: 'tab' },
        { label: 'Timepicker', route: '/material/timepicker', icon: 'schedule' },
        { label: 'Toolbar', route: '/material/toolbar', icon: 'web_asset' },
        { label: 'Tooltip', route: '/material/tooltip', icon: 'chat' },
        { label: 'Tree', route: '/material/tree', icon: 'account_tree' },
      ],
    },
  ];
}
