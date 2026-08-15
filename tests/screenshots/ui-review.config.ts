// UI-review route manifest — alle Demo-Routen (45), states filled (keine sinnvollen Empty-States).

export type UiReviewState = "filled" | "empty";
export type UiReviewViewport = "desktop" | "mobile";

export interface UiReviewRoute {
  name: string;
  path: string;
  states: UiReviewState[];
  viewports?: UiReviewViewport[];
  note?: string;
  /** Static <title> of the app — guards against capturing a foreign server on the port. */
  expectedTitle: string;
}

export interface UiReviewConfig {
  /** Must mirror `outputDir` in playwright.screenshots.config.ts. */
  outputDir: string;
  routes: UiReviewRoute[];
}

export const uiReviewConfig: UiReviewConfig = {
  outputDir: "test-results/ui-screenshots",
  routes: [
    {
      name: "home",
      path: "/",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "cropper",
      path: "/cropper",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "file-upload",
      path: "/file-upload",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "file-manager",
      path: "/file-manager",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "toast",
      path: "/toast",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "data-table",
      path: "/data-table",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "dialog",
      path: "/dialog",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "menu",
      path: "/menu",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "breadcrumb",
      path: "/breadcrumb",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "multi-select",
      path: "/multi-select",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "date-input",
      path: "/date-input",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "navigation",
      path: "/navigation",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "impressum",
      path: "/impressum",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-autocomplete",
      path: "/material/autocomplete",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-badge",
      path: "/material/badge",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-bottom-sheet",
      path: "/material/bottom-sheet",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-button-toggle",
      path: "/material/button-toggle",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-buttons",
      path: "/material/buttons",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-cards",
      path: "/material/cards",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-chips",
      path: "/material/chips",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-datepicker",
      path: "/material/datepicker",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-dialog",
      path: "/material/dialog",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-divider",
      path: "/material/divider",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-expansion",
      path: "/material/expansion",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-form-fields",
      path: "/material/form-fields",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-grid-list",
      path: "/material/grid-list",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-icon",
      path: "/material/icon",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-list",
      path: "/material/list",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-menu",
      path: "/material/menu",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-overview",
      path: "/material/overview",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-paginator",
      path: "/material/paginator",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-progress",
      path: "/material/progress",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-ripples",
      path: "/material/ripples",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-selection-controls",
      path: "/material/selection-controls",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-select-slider",
      path: "/material/select-slider",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-sidenav",
      path: "/material/sidenav",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-snackbar",
      path: "/material/snackbar",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-sort",
      path: "/material/sort",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-stepper",
      path: "/material/stepper",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-table",
      path: "/material/table",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-tabs",
      path: "/material/tabs",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-timepicker",
      path: "/material/timepicker",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-toolbar",
      path: "/material/toolbar",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-tooltip",
      path: "/material/tooltip",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
    {
      name: "mat-tree",
      path: "/material/tree",
      states: ["filled"],
      note: "Demo-Seite — kein sinnvoller Empty-State.",
      expectedTitle: "Angular Material Extended Demo",
    },
  ],
};

export const routes = uiReviewConfig.routes;
