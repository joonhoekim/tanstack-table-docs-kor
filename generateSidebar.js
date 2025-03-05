const fs = require('node:fs');
const path = require('node:path');

// Path to your config.json
const configPath = path.join(__dirname, 'docs/config.json');
// Path to your sidebars.ts
const sidebarsPath = path.join(__dirname, 'sidebars.ts');

// Read and parse the config.json
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

// Function to generate sidebar items from config.json
function generateSidebarItems(sections) {
  return sections.map(section => {
    // Skip the "Examples" category
    if (section.label === "Examples") {
      return null;
    }
    if (section.children) {
      return {
        type: 'category',
        label: section.label,
        items: generateSidebarItems(section.children),
      };
    }
    return section.to;
  }).filter(Boolean); // Remove null entries
}

// Generate the sidebar configuration
const sidebarConfig = {
  tutorialSidebar: generateSidebarItems(config.sections),
};

// Write the sidebar configuration to sidebars.ts
const sidebarContent = `import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = ${JSON.stringify(sidebarConfig, null, 2)};

export default sidebars;
`;

fs.writeFileSync(sidebarsPath, sidebarContent, 'utf-8');

console.log('Sidebar configuration generated successfully.');