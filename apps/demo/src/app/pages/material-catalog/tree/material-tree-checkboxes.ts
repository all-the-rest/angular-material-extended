import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { ShowcaseCode } from '../../../shared/showcase-code';

interface CheckboxNode {
  name: string;
  children?: CheckboxNode[];
}

interface FlatCheckboxNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'rui-material-tree-checkboxes',
  standalone: true,
  imports: [MatTreeModule, MatCheckboxModule, MatIconModule, MatButtonModule, FormsModule, ShowcaseCode],
  template: `
    <section id="tree-checkboxes" class="mb-8">
      <h2 id="tree-checkboxes" class="font-bold text-[var(--mat-sys-on-surface)] mb-1">Tree with Checkboxes</h2>
      <p class="text-sm text-[var(--mat-sys-on-surface-variant)] mb-4">mat-tree with checkbox selection on each node.</p>

      <div class="rounded-lg border border-[var(--mat-sys-outline-variant)] bg-[var(--mat-sys-surface)] p-5">
        <mat-tree [dataSource]="dataSource" [treeControl]="treeControl">
          <mat-tree-node *matTreeNodeDef="let node" matTreeNodePadding>
            <button mat-icon-button disabled aria-hidden="true"></button>
            <mat-checkbox
              [checked]="checklistSelection.isSelected(node)"
              (change)="checklistSelection.toggle(node)"
              (click)="$event.stopPropagation()">
              {{ node.name }}
            </mat-checkbox>
          </mat-tree-node>
          <mat-tree-node *matTreeNodeDef="let node; when: hasChild" matTreeNodePadding>
            <button mat-icon-button matTreeNodeToggle aria-label="Toggle node">
              <mat-icon class="mat-icon-rtl-mirror">
                {{ treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right' }}
              </mat-icon>
            </button>
            <mat-checkbox
              [checked]="descendantsAllSelected(node)"
              [indeterminate]="descendantsPartiallySelected(node)"
              (change)="itemSelectionToggle(node)">
              {{ node.name }}
            </mat-checkbox>
          </mat-tree-node>
        </mat-tree>
      </div>

      <rui-showcase-code [html]="htmlCode" [ts]="tsCode" />
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialTreeCheckboxes {
  protected htmlCode = `<mat-tree [dataSource]="dataSource" [treeControl]="treeControl">
  <mat-tree-node *matTreeNodeDef="let node" matTreeNodePadding>
    <button mat-icon-button disabled></button>
    <mat-checkbox
      [checked]="checklistSelection.isSelected(node)"
      (change)="checklistSelection.toggle(node)"
      (click)="$event.stopPropagation()">
      {{ node.name }}
    </mat-checkbox>
  </mat-tree-node>
  <mat-tree-node *matTreeNodeDef="let node; when: hasChild" matTreeNodePadding>
    <button mat-icon-button matTreeNodeToggle aria-label="Toggle node">
      <mat-icon>
        {{ treeControl.isExpanded(node) ? "expand_more" : "chevron_right" }}
      </mat-icon>
    </button>
    <mat-checkbox
      [checked]="descendantsAllSelected(node)"
      [indeterminate]="descendantsPartiallySelected(node)"
      (change)="itemSelectionToggle(node)">
      {{ node.name }}
    </mat-checkbox>
  </mat-tree-node>
</mat-tree>`;

  protected tsCode = `interface CheckboxNode {
  name: string;
  children?: CheckboxNode[];
}

interface FlatCheckboxNode {
  expandable: boolean;
  name: string;
  level: number;
}

const TREE_DATA: CheckboxNode[] = [
  { name: "Fruits", children: [{ name: "Apple" }, { name: "Banana" }] },
  { name: "Vegetables", children: [{ name: "Carrot" }, { name: "Broccoli" }] },
  { name: "Dairy", children: [{ name: "Milk" }, { name: "Cheese" }] },
];

// FlatTreeControl, MatTreeFlattener, MatTreeFlatDataSource, SelectionModel
// See full implementation in component code for all helper methods`;

  private readonly _transformer = (node: CheckboxNode, level: number): FlatCheckboxNode => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level,
  });

  readonly treeControl = new FlatTreeControl<FlatCheckboxNode>(
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

  readonly checklistSelection = new SelectionModel<FlatCheckboxNode>(true);

  readonly hasChild = (_: number, node: FlatCheckboxNode) => node.expandable;

  constructor() {
    this.dataSource.data = TREE_CHECKBOX_DATA;
  }

  itemSelectionToggle(node: FlatCheckboxNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    if (this.checklistSelection.isSelected(node)) {
      this.checklistSelection.select(...descendants);
    } else {
      this.checklistSelection.deselect(...descendants);
    }
    descendants.forEach((child) => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  descendantsAllSelected(node: FlatCheckboxNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.length > 0 && descendants.every((child) => this.checklistSelection.isSelected(child));
  }

  descendantsPartiallySelected(node: FlatCheckboxNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some((child) => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  private checkAllParentsSelection(node: FlatCheckboxNode): void {
    let parent: FlatCheckboxNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  private getParentNode(node: FlatCheckboxNode): FlatCheckboxNode | null {
    const currentLevel = node.level;
    if (currentLevel < 1) return null;
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (currentNode && currentNode.level === currentLevel - 1) return currentNode;
    }
    return null;
  }

  private checkRootNodeSelection(node: FlatCheckboxNode): void {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every((child) => this.checklistSelection.isSelected(child));
    if (descAllSelected) {
      this.checklistSelection.select(node);
    } else {
      this.checklistSelection.deselect(node);
    }
  }
}

const TREE_CHECKBOX_DATA: CheckboxNode[] = [
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
