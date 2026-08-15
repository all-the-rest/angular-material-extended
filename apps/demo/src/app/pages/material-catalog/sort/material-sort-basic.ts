import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ShowcaseCode } from '../../../shared/showcase-code';

interface Dessert {
  name: string;
  calories: number;
  fat: string;
  carbs: string;
  protein: string;
}

@Component({
  selector: 'rui-material-sort-basic',
  standalone: true,
  imports: [MatSortModule, MatTableModule, ShowcaseCode],
  template: `
    <section id="sort-basic" class="rui-mb-8">
      <h2 id="sort-basic" class="rui-font-bold rui-text-on-surface rui-mb-1">Basic Sort Header</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">Sortable table columns using mat-sort-header with matSort directive.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface rui-p-5">
        <div class="rui-overflow-x-auto">
          <table mat-table [dataSource]="dataSource" matSort class="rui-w-full">

            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
              <td mat-cell *matCellDef="let d">{{ d.name }}</td>
            </ng-container>

            <ng-container matColumnDef="calories">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Calories</th>
              <td mat-cell *matCellDef="let d">{{ d.calories }}</td>
            </ng-container>

            <ng-container matColumnDef="fat">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Fat (g)</th>
              <td mat-cell *matCellDef="let d">{{ d.fat }}</td>
            </ng-container>

            <ng-container matColumnDef="carbs">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Carbs (g)</th>
              <td mat-cell *matCellDef="let d">{{ d.carbs }}</td>
            </ng-container>

            <ng-container matColumnDef="protein">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Protein (g)</th>
              <td mat-cell *matCellDef="let d">{{ d.protein }}</td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let r; columns: displayedColumns;"></tr>
          </table>
        </div>
      </div>

      <rui-showcase-code [html]="codeHtml" [ts]="codeTs" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialSortBasic {
  displayedColumns: string[] = ['name', 'calories', 'fat', 'carbs', 'protein'];
  dataSource: Dessert[] = [
    { name: 'Frozen yogurt', calories: 159, fat: '6.0', carbs: '24', protein: '4.0' },
    { name: 'Ice cream sandwich', calories: 237, fat: '9.0', carbs: '37', protein: '4.3' },
    { name: 'Eclair', calories: 262, fat: '16.0', carbs: '24', protein: '6.0' },
    { name: 'Cupcake', calories: 305, fat: '3.7', carbs: '67', protein: '4.3' },
    { name: 'Gingerbread', calories: 356, fat: '16.0', carbs: '49', protein: '3.9' },
  ];

  protected codeHtml = `<table mat-table [dataSource]="dataSource" matSort>
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
    <td mat-cell *matCellDef="let d">{{ d.name }}</td>
  </ng-container>
  <ng-container matColumnDef="calories">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>Calories</th>
    <td mat-cell *matCellDef="let d">{{ d.calories }}</td>
  </ng-container>
  <!-- ... additional columns ... -->
  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let r; columns: displayedColumns;"></tr>
</table>`;

  protected codeTs = `import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

interface Dessert {
  name: string;
  calories: number;
  fat: string;
  carbs: string;
  protein: string;
}

export class MyComponent {
  displayedColumns: string[] = ['name', 'calories', 'fat', 'carbs', 'protein'];
  dataSource: Dessert[] = [
    { name: 'Frozen yogurt', calories: 159, fat: '6.0', carbs: '24', protein: '4.0' },
    { name: 'Ice cream sandwich', calories: 237, fat: '9.0', carbs: '37', protein: '4.3' },
    { name: 'Eclair', calories: 262, fat: '16.0', carbs: '24', protein: '6.0' },
  ];
}`;
}
