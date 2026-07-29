import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'rui-material-catalog',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="rui-flex-1 rui-overflow-auto rui-bg-surface-container-low">
      <router-outlet></router-outlet>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialCatalog {}
