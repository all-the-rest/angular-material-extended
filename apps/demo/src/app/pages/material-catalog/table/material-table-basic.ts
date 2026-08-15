import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ShowcaseCode } from '../../../shared/showcase-code';

interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'rui-material-table-basic',
  standalone: true,
  imports: [MatTableModule, ShowcaseCode],
  template: `
    <section id="table-basic" class="rui-mb-8">
      <h2 id="table-basic" class="rui-font-bold rui-text-on-surface rui-mb-1">Basic Table</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">mat-table displaying periodic elements with static data.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface rui-p-5">
        <div class="rui-overflow-x-auto">
          <table mat-table [dataSource]="dataSource" class="rui-w-full">

            <ng-container matColumnDef="position">
              <th mat-header-cell *matHeaderCellDef class="rui-font-medium">No.</th>
              <td mat-cell *matCellDef="let e">{{ e.position }}</td>
            </ng-container>

            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef class="rui-font-medium">Name</th>
              <td mat-cell *matCellDef="let e">{{ e.name }}</td>
            </ng-container>

            <ng-container matColumnDef="weight">
              <th mat-header-cell *matHeaderCellDef class="rui-font-medium">Weight</th>
              <td mat-cell *matCellDef="let e">{{ e.weight }}</td>
            </ng-container>

            <ng-container matColumnDef="symbol">
              <th mat-header-cell *matHeaderCellDef class="rui-font-medium">Symbol</th>
              <td mat-cell *matCellDef="let e">{{ e.symbol }}</td>
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
export class MaterialTableBasic {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];

  protected codeHtml = `<table mat-table [dataSource]="dataSource" class="rui-w-full">
  <ng-container matColumnDef="position">
    <th mat-header-cell *matHeaderCellDef>No.</th>
    <td mat-cell *matCellDef="let e">{{ e.position }}</td>
  </ng-container>
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef>Name</th>
    <td mat-cell *matCellDef="let e">{{ e.name }}</td>
  </ng-container>
  <ng-container matColumnDef="weight">
    <th mat-header-cell *matHeaderCellDef>Weight</th>
    <td mat-cell *matCellDef="let e">{{ e.weight }}</td>
  </ng-container>
  <ng-container matColumnDef="symbol">
    <th mat-header-cell *matHeaderCellDef>Symbol</th>
    <td mat-cell *matCellDef="let e">{{ e.symbol }}</td>
  </ng-container>
  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let r; columns: displayedColumns;"></tr>
</table>`;

  protected codeTs = `import { MatTableModule } from '@angular/material/table';

interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

export class MyComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    // ...
  ];
}`;
}
