import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  "tutorialSidebar": [
    {
      "type": "category",
      "label": "Getting Started",
      "items": [
        "introduction",
        "overview",
        "installation",
        "guide/migrating",
        "faq"
      ]
    },
    {
      "type": "category",
      "label": "Core Guides",
      "items": [
        "guide/data",
        "guide/column-defs",
        "guide/tables",
        "guide/row-models",
        "guide/rows",
        "guide/cells",
        "guide/header-groups",
        "guide/headers",
        "guide/columns"
      ]
    },
    {
      "type": "category",
      "label": "Feature Guides",
      "items": [
        "guide/column-ordering",
        "guide/column-pinning",
        "guide/column-sizing",
        "guide/column-visibility",
        "guide/column-filtering",
        "guide/global-filtering",
        "guide/fuzzy-filtering",
        "guide/column-faceting",
        "guide/global-faceting",
        "guide/grouping",
        "guide/expanding",
        "guide/pagination",
        "guide/row-pinning",
        "guide/row-selection",
        "guide/sorting",
        "guide/virtualization",
        "guide/custom-features"
      ]
    },
    {
      "type": "category",
      "label": "Core APIs",
      "items": [
        "api/core/column-def",
        "api/core/table",
        "api/core/column",
        "api/core/header-group",
        "api/core/header",
        "api/core/row",
        "api/core/cell"
      ]
    },
    {
      "type": "category",
      "label": "Feature APIs",
      "items": [
        "api/features/column-filtering",
        "api/features/column-faceting",
        "api/features/column-ordering",
        "api/features/column-pinning",
        "api/features/column-sizing",
        "api/features/column-visibility",
        "api/features/global-faceting",
        "api/features/global-filtering",
        "api/features/sorting",
        "api/features/grouping",
        "api/features/expanding",
        "api/features/pagination",
        "api/features/row-pinning",
        "api/features/row-selection"
      ]
    },
    {
      "type": "category",
      "label": "Enterprise",
      "items": [
        "enterprise/ag-grid"
      ]
    }
  ]
};

export default sidebars;
