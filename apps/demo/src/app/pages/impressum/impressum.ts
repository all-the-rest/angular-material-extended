import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

interface ImpressumEntry {
  label: string;
  value: string;
  href?: string;
}

@Component({
  selector: 'rui-impressum',
  standalone: true,
  imports: [MatCardModule],
  template: `
<div class="rui-max-w-4xl rui-mx-auto rui-p-4 rui-md:p-6 rui-space-y-8">
  <h1 class="rui-font-bold">Impressum</h1>

  <section>
    <p class="rui-text-sm rui-text-on-surface-variant rui-mb-3">
      Angaben gem&auml;&szlig; &sect; 5 ECG (E-Commerce-Gesetz) und &sect; 25 MedienG.
    </p>
    <mat-card>
      <mat-card-content class="rui-pt-4">
        <div class="rui-space-y-3">
          @for (entry of entries; track entry.label) {
            <div class="rui-flex rui-flex-col rui-sm:flex-row rui-gap-1 rui-sm:gap-4">
              <dt class="rui-text-sm rui-font-semibold rui-text-on-surface-variant rui-w-40 rui-shrink-0">{{ entry.label }}</dt>
              <dd class="rui-text-sm rui-text-on-surface">
                @if (entry.href) {
                  <a [href]="entry.href" target="_blank" rel="noopener" class="rui-no-underline rui-text-primary">{{ entry.value }}</a>
                } @else {
                  {{ entry.value }}
                }
              </dd>
            </div>
          }
        </div>
      </mat-card-content>
    </mat-card>
  </section>

  <section>
    <h2 id="impressum-haftungsausschluss" class="rui-text-xl rui-font-semibold rui-mb-2">Haftungsausschluss</h2>
    <p class="rui-text-sm rui-text-on-surface-variant rui-leading-relaxed">
      Dies ist eine private, nicht-kommerzielle Website einer Privatperson. Die Inhalte werden mit
      gr&ouml;&szlig;tm&ouml;glicher Sorgfalt erstellt. F&uuml;r die Richtigkeit, Vollst&auml;ndigkeit und
      Aktualit&auml;t der Inhalte wird jedoch keine Gew&auml;hr &uuml;bernommen.
    </p>
  </section>
</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Impressum {
  protected entries: ImpressumEntry[] = [
    { label: 'Name', value: 'Florian Reisinger' },
    { label: 'Anschrift', value: 'Robert-Stolz-Stra\u00dfe 8, 4020 Linz' },
    { label: 'E-Mail', value: 'hello@all-the.rest', href: 'mailto:hello@all-the.rest' },
    { label: 'Datenschutz', value: 'all-the.rest/datenschutz', href: 'https://all-the.rest/datenschutz' },
    { label: 'Rechtsform', value: 'Privatperson' },
  ];
}
