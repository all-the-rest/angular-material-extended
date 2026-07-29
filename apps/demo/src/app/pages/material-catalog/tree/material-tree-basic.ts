import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ShowcaseCode } from '../../../shared/showcase-code';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'rui-material-tree-basic',
  standalone: true,
  imports: [MatTreeModule, MatIconModule, MatButtonModule, ShowcaseCode],
  template: `
    <section id="tree-basic" class="rui-mb-8">
      <h2 id="tree-basic" class="rui-font-bold rui-text-on-surface rui-mb-1">Basic Tree</h2>
      <p class="rui-text-sm rui-text-on-surface-variant rui-mb-4">mat-tree with flat data source and expand/collapse toggle.</p>

      <div class="rui-rounded-lg rui-border rui-border-outline-variant rui-bg-surface rui-p-5">
        <mat-tree [dataSource]="dataSource" [treeControl]="treeControl">
          <mat-tree-node *matTreeNodeDef="let node" matTreeNodePadding>
            <button mat-icon-button disabled aria-hidden="true"></button>
            {{ node.name }}
          </mat-tree-node>
          <mat-tree-node *matTreeNodeDef="let node; when: hasChild" matTreeNodePadding>
            <button mat-icon-button matTreeNodeToggle aria-label="Toggle node">
              <mat-icon class="mat-icon-rtl-mirror">
                {{ treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right' }}
              </mat-icon>
            </button>
            {{ node.name }}
          </mat-tree-node>
        </mat-tree>
      </div>

      <rui-showcase-code [html]="htmlCode" [ts]="tsCode" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialTreeBasic {
  protected htmlCode = `<mat-tree [dataSource]="dataSource" [treeControl]="treeControl">
  <mat-tree-node *matTreeNodeDef="let node" matTreeNodePadding>
    <button mat-icon-button disabled></button>
    {{ node.name }}
  </mat-tree-node>
  <mat-tree-node *matTreeNodeDef="let node; when: hasChild" matTreeNodePadding>
    <button mat-icon-button matTreeNodeToggle aria-label="Toggle node">
      <mat-icon class="mat-icon-rtl-mirror">
        {{ treeControl.isExpanded(node) ? "expand_more" : "chevron_right" }}
      </mat-icon>
    </button>
    {{ node.name }}
  </mat-tree-node>
</mat-tree>`;

  protected tsCode = `interface FoodNode {
  name: string;
  children?: FoodNode[];
}

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

const TREE_DATA: FoodNode[] = [
  {
    name: "Fruits",
    children: [{ name: "Apple" }, { name: "Banana" }],
  },
  {
    name: "Vegetables",
    children: [{ name: "Carrot" }, { name: "Broccoli" }],
  },
  {
    name: "Dairy",
    children: [{ name: "Milk" }, { name: "Cheese" }],
  },
];

treeControl = new FlatTreeControl<FlatNode>(
  (node) => node.level,
  (node) => node.expandable,
);

treeFlattener = new MatTreeFlattener(
  (node: FoodNode, level: number): FlatNode => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level,
  }),
  (node) => node.level,
  (node) => node.expandable,
  (node) => node.children ?? [],
);

dataSource = new MatTreeFlatDataSource(treeControl, treeFlattener);
dataSource.data = TREE_DATA;

hasChild = (_: number, node: FlatNode) => node.expandable;

import { FlatTreeControl } from "@angular/cdk/tree";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";`;

  private readonly _transformer = (node: FoodNode, level: number): FlatNode => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level,
  });

  readonly treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.expandable,
  );

  readonly treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children ?? [],
  );

  readonly dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  readonly hasChild = (_: number, node: FlatNode) => node.expandable;

  constructor() {
    this.dataSource.data = TREE_DATA;
  }
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruits',
    children: [{ name: 'Apple' }, { name: 'Banana' }],
  },
  {
    name: 'Vegetables',
    children: [{ name: 'Carrot' }, { name: 'Broccoli' }],
  },
  {
    name: 'Dairy',
    children: [{ name: 'Milk' }, { name: 'Cheese' }],
  },
];
