import { SpeciesTypes, TaxonomyOptions } from '../../../utils/constants';

export interface TreeOption {
  expanded?: boolean;
  someChildrenSelected?: boolean;
  checked?: boolean;
  [key: string]: any;
}

const childrenKeyToTaxonomyType = {
  kingdoms: TaxonomyOptions.KINGDOM,
  phylums: TaxonomyOptions.PHYLUM,
  species: TaxonomyOptions.SPECIES,
  classes: TaxonomyOptions.CLASS,
};

export type KeyTypes = 'kingdoms' | 'phylums' | 'species' | 'classes';

const childrenKeyByTaxonomyType = {
  options: 'kingdoms',
  [TaxonomyOptions.KINGDOM]: 'phylums',
  [TaxonomyOptions.PHYLUM]: 'classes',
  [TaxonomyOptions.CLASS]: 'species',
};

export class TaxonomyTree {
  private _parent?: TaxonomyTree;
  private _children?: TaxonomyTree[];
  private _typeItems?: TaxonomyTree[];
  private _visibleItems?: TaxonomyTree[];
  private _node?: any;
  private _callbacks: {
    [name: string]: any[];
  } = {};

  selected = false;
  keyType?: string;
  expanded = false;
  intermediate = false;

  constructor(data) {
    this._node = data;
    this.keyType = data.keyType;

    this._setChildren(data, childrenKeyByTaxonomyType[data.keyType]);
    this._setParent(data.parent);
    this._typeItems = this._children;
    this._visibleItems = this._children;

    this._on('item-expanded', (value: boolean) => {
      this.expanded = value;
    });
    this._on('item-selected', (value: boolean) => {
      this.selected = value;
      this.intermediate = false;
    });

    this._on(`toggle-item-${this._node.id}-${this.keyType}`, (data) => {
      this.toggleSelected();
      if (data && data.expand) {
        this._emit('item-expanded', true, true);
      }
    });

    this._on('show-all-items', () => {
      this._visibleItems = this._children;
    });
    this._on('item-check-intermediate', () => {
      const allSelected = this._typeItems?.every((i) => i.selected);
      const anySelected = this._typeItems?.some((i) => i.selected || i.intermediate);

      if (this.id !== 'any') {
        if (allSelected) {
          this.intermediate = false;
          this.selected = true;
        } else if (anySelected) {
          this.intermediate = true;
          this.selected = false;
        } else {
          this.intermediate = false;
          this.selected = false;
        }
      }
    });

    if (data.selectedOptions && data.selectedOptions.length) {
      data.selectedOptions.map((i) => {
        return this._broadcast(`toggle-item-${i.id}-${i.taxonomy}`, {
          expand: true,
        });
      });
    }
  }

  type(speciesTypes?: SpeciesTypes[]) {
    this._typeItems = this._children;

    let childType = '';
    this._typeItems =
      this._children?.filter((i) => {
        const hasType = i.type(speciesTypes);

        if (hasType) {
          childType = hasType;
        }

        return !!hasType;
      }) || [];

    this._visibleItems = this._typeItems;

    const hasType = speciesTypes?.find((type) => type === this._node?.type) || childType;

    if (this.selected) {
      if (hasType) {
        this._broadcast('item-selected', this.selected, true);
      } else {
        this.selected = false;
      }
    }

    if (this.intermediate) {
      if (hasType) {
        this.intermediate = this._typeItems?.some((i) => i.selected || i.intermediate);
      } else {
        this.intermediate = false;
      }
    }

    return hasType;
  }

  search(value = '') {
    this._visibleItems = this._typeItems;

    value = value.toLowerCase();

    if (!value) {
      this._emit('item-expanded', false);
    }

    this._visibleItems =
      this._typeItems?.filter((i) => {
        return i.search(value);
      }) || [];

    const hasSynonym =
      this._node?.synonyms && this._node?.synonyms.some((synonym) => synonym.includes(value));

    const hasItem = this.nameLowerCased.includes(value);

    const itemExist = hasItem || hasSynonym;

    if (value && itemExist) {
      this._emit('item-expanded', true, true);
    }

    return itemExist || this._visibleItems.length > 0;
  }

  toJson() {
    if (this.selected) {
      return [
        {
          id: this._node?.id,
          taxonomy: this._node.keyType,
          type: this._node.type,
          name: this.name,
        },
      ];
    }

    return (
      this._typeItems?.reduce((acc: Array<any>, c: any) => {
        return [...acc, ...c.toJson()];
      }, []) || []
    );
  }

  get items() {
    return this._visibleItems || [];
  }

  get name() {
    return `${this._node?.name} (lot. ${this._node.nameLatin})` || '';
  }

  get id() {
    return this._node?.id || 'any';
  }

  get nameLowerCased() {
    return `${this._node?.name} (lot. ${this._node.nameLatin})`.toLowerCase() || '';
  }

  toggleItem(id: number | string, keyType: string) {
    this._broadcast(`toggle-item-${id}-${keyType}`, {}, true);
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
    if (!this.expanded) {
      this._broadcast('item-expanded', this.expanded, true);
    }
  }

  toggleSelected() {
    this.selected = !this.selected;
    if (this.intermediate) {
      this.selected = true;
      this.intermediate = false;
    }

    this._broadcast('item-selected', this.selected, true);
    this._emit('item-check-intermediate', {}, true);
  }

  private _setChildren(node = {}, key) {
    this._children = [];

    if (!node || !node[key]) return;

    this._children = node[key].map(
      (i) =>
        new TaxonomyTree({
          ...i,
          parent: this,
          keyType: childrenKeyToTaxonomyType[key || ''],
        }),
    );

    this.search();
  }

  private _setParent(node) {
    this._parent = node;
  }

  private _on(name: string, cb: any) {
    this._callbacks[name] = this._callbacks[name] || [];
    this._callbacks[name].push(cb);
  }

  private _triggerCallbacks(name: string, data?: any) {
    if (!this._callbacks[name] || !this._callbacks[name].length) return;

    this._callbacks[name].map((i) => i(data));
  }

  private _broadcast(name: string, data?: any, skipTrigger = false) {
    if (!skipTrigger) {
      this._triggerCallbacks(name, data);
    }

    this._typeItems?.forEach((i) => {
      i._broadcast(name, data);
    });
  }

  private _emit(name: string, data?: any, skipTrigger = false) {
    if (!skipTrigger) {
      this._triggerCallbacks(name, data);
    }

    this._parent?._emit(name, data);
  }
}
