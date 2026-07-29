import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./overview').then((m) => m.Overview),
  },
  {
    path: 'cropper',
    data: { title: 'Cropper' },
    loadComponent: () =>
      import('./pages/cropper-demo/cropper-demo').then((m) => m.CropperDemo),
  },
  {
    path: 'file-upload',
    data: { title: 'File Upload' },
    loadComponent: () =>
      import('./pages/file-upload-demo/file-upload-demo').then(
        (m) => m.FileUploadDemo,
      ),
  },
  {
    path: 'file-manager',
    data: { title: 'File Manager' },
    loadComponent: () =>
      import('./pages/file-manager-demo/file-manager-demo').then(
        (m) => m.FileManagerDemo,
      ),
  },
  {
    path: 'toast',
    data: { title: 'Toast' },
    loadComponent: () =>
      import('./pages/toast-demo/toast-demo').then((m) => m.ToastDemo),
  },
  {
    path: 'data-table',
    data: { title: 'Data Table' },
    loadComponent: () =>
      import('./pages/data-table-demo/data-table-demo').then(
        (m) => m.DataTableDemo,
      ),
  },
  {
    path: 'dialog',
    data: { title: 'Dialog' },
    loadComponent: () =>
      import('./pages/dialog-demo/dialog-demo').then((m) => m.DialogDemo),
  },
  {
    path: 'menu',
    data: { title: 'Menu' },
    loadComponent: () =>
      import('./pages/menu-demo/menu-demo').then((m) => m.MenuDemo),
  },
  {
    path: 'breadcrumb',
    data: { title: 'Breadcrumb' },
    loadComponent: () =>
      import('./pages/breadcrumb-demo/breadcrumb-demo').then((m) => m.BreadcrumbDemo),
  },
  {
    path: 'material',
    data: { title: 'Material Catalog' },
    loadComponent: () =>
      import('./pages/material-catalog/material-catalog').then((m) => m.MaterialCatalog),
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'autocomplete',
        data: { title: 'Autocomplete' },
        loadComponent: () =>
          import('./pages/material-catalog/material-autocomplete').then((m) => m.MaterialAutocomplete),
      },
      {
        path: 'badge',
        data: { title: 'Badge' },
        loadComponent: () =>
          import('./pages/material-catalog/material-badge').then((m) => m.MaterialBadge),
      },
      {
        path: 'bottom-sheet',
        data: { title: 'Bottom Sheet' },
        loadComponent: () =>
          import('./pages/material-catalog/material-bottom-sheet').then((m) => m.MaterialBottomSheet),
      },
      {
        path: 'button-toggle',
        data: { title: 'Button Toggle' },
        loadComponent: () =>
          import('./pages/material-catalog/material-button-toggle').then((m) => m.MaterialButtonToggle),
      },
      {
        path: 'buttons',
        data: { title: 'Buttons' },
        loadComponent: () =>
          import('./pages/material-catalog/material-buttons').then((m) => m.MaterialButtons),
      },
      {
        path: 'cards',
        data: { title: 'Cards' },
        loadComponent: () =>
          import('./pages/material-catalog/material-cards-section').then((m) => m.MaterialCardsSection),
      },
      {
        path: 'chips',
        data: { title: 'Chips' },
        loadComponent: () =>
          import('./pages/material-catalog/material-chips').then((m) => m.MaterialChips),
      },
      {
        path: 'datepicker',
        data: { title: 'Datepicker' },
        loadComponent: () =>
          import('./pages/material-catalog/material-datepicker').then((m) => m.MaterialDatepicker),
      },
      {
        path: 'dialog',
        data: { title: 'Dialog' },
        loadComponent: () =>
          import('./pages/material-catalog/material-dialog').then((m) => m.MaterialDialog),
      },
      {
        path: 'divider',
        data: { title: 'Divider' },
        loadComponent: () =>
          import('./pages/material-catalog/material-divider').then((m) => m.MaterialDivider),
      },
      {
        path: 'expansion',
        data: { title: 'Expansion Panel' },
        loadComponent: () =>
          import('./pages/material-catalog/material-expansion').then((m) => m.MaterialExpansion),
      },
      {
        path: 'form-fields',
        data: { title: 'Form Fields' },
        loadComponent: () =>
          import('./pages/material-catalog/material-form-fields').then((m) => m.MaterialFormFields),
      },
      {
        path: 'grid-list',
        data: { title: 'Grid List' },
        loadComponent: () =>
          import('./pages/material-catalog/material-grid-list').then((m) => m.MaterialGridList),
      },
      {
        path: 'icon',
        data: { title: 'Icon' },
        loadComponent: () =>
          import('./pages/material-catalog/material-icon').then((m) => m.MaterialIcon),
      },
      {
        path: 'list',
        data: { title: 'List' },
        loadComponent: () =>
          import('./pages/material-catalog/material-list').then((m) => m.MaterialList),
      },
      {
        path: 'menu',
        data: { title: 'Menu' },
        loadComponent: () =>
          import('./pages/material-catalog/material-menu').then((m) => m.MaterialMenu),
      },
      {
        path: 'overview',
        data: { title: 'Overview' },
        loadComponent: () =>
          import('./pages/material-catalog/material-overview').then((m) => m.MaterialOverview),
      },
      {
        path: 'paginator',
        data: { title: 'Paginator' },
        loadComponent: () =>
          import('./pages/material-catalog/material-paginator').then((m) => m.MaterialPaginator),
      },
      {
        path: 'progress',
        data: { title: 'Progress' },
        loadComponent: () =>
          import('./pages/material-catalog/material-progress').then((m) => m.MaterialProgress),
      },
      {
        path: 'ripples',
        data: { title: 'Ripples' },
        loadComponent: () =>
          import('./pages/material-catalog/material-ripples').then((m) => m.MaterialRipples),
      },
      {
        path: 'selection-controls',
        data: { title: 'Selection Controls' },
        loadComponent: () =>
          import('./pages/material-catalog/material-selection-controls').then((m) => m.MaterialSelectionControls),
      },
      {
        path: 'select-slider',
        data: { title: 'Select & Slider' },
        loadComponent: () =>
          import('./pages/material-catalog/material-select-slider').then((m) => m.MaterialSelectSlider),
      },
      {
        path: 'sidenav',
        data: { title: 'Sidenav' },
        loadComponent: () =>
          import('./pages/material-catalog/material-sidenav').then((m) => m.MaterialSidenav),
      },
      {
        path: 'snackbar',
        data: { title: 'Snackbar' },
        loadComponent: () =>
          import('./pages/material-catalog/material-snackbar').then((m) => m.MaterialSnackbar),
      },
      {
        path: 'sort',
        data: { title: 'Sort Header' },
        loadComponent: () =>
          import('./pages/material-catalog/material-sort').then((m) => m.MaterialSort),
      },
      {
        path: 'stepper',
        data: { title: 'Stepper' },
        loadComponent: () =>
          import('./pages/material-catalog/material-stepper').then((m) => m.MaterialStepper),
      },
      {
        path: 'table',
        data: { title: 'Table' },
        loadComponent: () =>
          import('./pages/material-catalog/material-table').then((m) => m.MaterialTable),
      },
      {
        path: 'tabs',
        data: { title: 'Tabs' },
        loadComponent: () =>
          import('./pages/material-catalog/material-tabs').then((m) => m.MaterialTabs),
      },
      {
        path: 'timepicker',
        data: { title: 'Timepicker' },
        loadComponent: () =>
          import('./pages/material-catalog/material-timepicker').then((m) => m.MaterialTimepicker),
      },
      {
        path: 'toolbar',
        data: { title: 'Toolbar' },
        loadComponent: () =>
          import('./pages/material-catalog/material-toolbar').then((m) => m.MaterialToolbar),
      },
      {
        path: 'tooltip',
        data: { title: 'Tooltip' },
        loadComponent: () =>
          import('./pages/material-catalog/material-tooltip').then((m) => m.MaterialTooltip),
      },
      {
        path: 'tree',
        data: { title: 'Tree' },
        loadComponent: () =>
          import('./pages/material-catalog/material-tree').then((m) => m.MaterialTree),
      },
    ],
  },
  {
    path: 'multi-select',
    data: { title: 'Multi-Select' },
    loadComponent: () =>
      import('./pages/multi-select-demo/multi-select-demo').then((m) => m.MultiSelectDemo),
  },
  {
    path: 'date-input',
    data: { title: 'Date Input' },
    loadComponent: () =>
      import('./pages/date-input-demo/date-input-demo').then((m) => m.DateInputDemo),
  },
  {
    path: 'navigation',
    data: { title: 'Navigation' },
    loadComponent: () =>
      import('./pages/navigation-demo/navigation-demo').then((m) => m.NavigationDemo),
  },
];
