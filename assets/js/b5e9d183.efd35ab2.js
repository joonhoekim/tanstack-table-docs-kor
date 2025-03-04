"use strict";(self.webpackChunktanstack_table_kor=self.webpackChunktanstack_table_kor||[]).push([[6944],{2845:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>s,contentTitle:()=>i,default:()=>g,frontMatter:()=>c,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"guide/global-faceting","title":"Global Faceting Guide","description":"\uc608\uc81c","source":"@site/docs/guide/global-faceting.md","sourceDirName":"guide","slug":"/guide/global-faceting","permalink":"/tanstack-table-docs-kor/guide/global-faceting","draft":false,"unlisted":false,"editUrl":"https://github.com/joonhoekim/tanstack-table-docs-kor/tree/main/docs/guide/global-faceting.md","tags":[],"version":"current","frontMatter":{"title":"Global Faceting Guide"},"sidebar":"tutorialSidebar","previous":{"title":"Fuzzy Filtering Guide","permalink":"/tanstack-table-docs-kor/guide/fuzzy-filtering"},"next":{"title":"Global Filtering Guide","permalink":"/tanstack-table-docs-kor/guide/global-filtering"}}');var l=n(4848),o=n(8453);const c={title:"Global Faceting Guide"},i=void 0,s={},d=[{value:"\uc608\uc81c",id:"\uc608\uc81c",level:2},{value:"API",id:"api",level:2},{value:"Global Faceting \uac00\uc774\ub4dc",id:"global-faceting-\uac00\uc774\ub4dc",level:2},{value:"Global Faceting Row Models",id:"global-faceting-row-models",level:3},{value:"Global Faceted Row Models \uc0ac\uc6a9\ud558\uae30",id:"global-faceted-row-models-\uc0ac\uc6a9\ud558\uae30",level:3},{value:"Custom Global (Server-Side) Faceting",id:"custom-global-server-side-faceting",level:3}];function r(e){const a={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(a.h2,{id:"\uc608\uc81c",children:"\uc608\uc81c"}),"\n",(0,l.jsx)(a.p,{children:"\uad6c\ud604\uc73c\ub85c \ubc14\ub85c \uac00\uace0 \uc2f6\uc73c\uc2e0\uac00\uc694? \ub2e4\uc74c \uc608\uc81c\ub97c \ud655\uc778\ud574\ubcf4\uc138\uc694:"}),"\n",(0,l.jsxs)(a.ul,{children:["\n",(0,l.jsx)(a.li,{children:(0,l.jsx)(a.a,{href:"../../framework/react/examples/filters",children:"filters-faceted"})}),"\n"]}),"\n",(0,l.jsx)(a.h2,{id:"api",children:"API"}),"\n",(0,l.jsx)(a.p,{children:(0,l.jsx)(a.a,{href:"../../api/features/global-faceting",children:"Global Faceting API"})}),"\n",(0,l.jsx)(a.h2,{id:"global-faceting-\uac00\uc774\ub4dc",children:"Global Faceting \uac00\uc774\ub4dc"}),"\n",(0,l.jsx)(a.p,{children:"Global Faceting\uc744 \uc0ac\uc6a9\ud558\uba74 \ud14c\uc774\ube14\uc758 \ub370\uc774\ud130\uc5d0\uc11c \ubaa8\ub4e0 \uc5f4\uc758 \uac12 \ubaa9\ub85d\uc744 \uc0dd\uc131\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \uc608\ub97c \ub4e4\uc5b4, \ud14c\uc774\ube14\uc758 \ubaa8\ub4e0 \ud589\uacfc \uc5f4\uc5d0\uc11c \uace0\uc720\ud55c \uac12 \ubaa9\ub85d\uc744 \uc0dd\uc131\ud558\uc5ec \uc790\ub3d9 \uc644\uc131 \ud544\ud130 \uad6c\uc131 \uc694\uc18c\uc5d0\uc11c \uac80\uc0c9 \uc81c\uc548\uc73c\ub85c \uc0ac\uc6a9\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \ub610\ub294, \uc22b\uc790 \ud14c\uc774\ube14\uc5d0\uc11c \ucd5c\uc18c\uac12\uacfc \ucd5c\ub300\uac12\uc758 \ud29c\ud50c\uc744 \uc0dd\uc131\ud558\uc5ec \ubc94\uc704 \uc2ac\ub77c\uc774\ub354 \ud544\ud130 \uad6c\uc131 \uc694\uc18c\uc758 \ubc94\uc704\ub85c \uc0ac\uc6a9\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."}),"\n",(0,l.jsx)(a.h3,{id:"global-faceting-row-models",children:"Global Faceting Row Models"}),"\n",(0,l.jsx)(a.p,{children:"\uc5b4\ub5a4 Global Faceting \uae30\ub2a5\uc744 \uc0ac\uc6a9\ud558\ub824\uba74 \ud14c\uc774\ube14 \uc635\uc158\uc5d0 \uc801\uc808\ud55c row model\uc744 \ud3ec\ud568\ud574\uc57c \ud569\ub2c8\ub2e4."}),"\n",(0,l.jsx)(a.pre,{children:(0,l.jsx)(a.code,{className:"language-ts",children:"// \ud544\uc694\ud55c row model\ub9cc \uac00\uc838\uc624\uae30\nimport {\n  getCoreRowModel,\n  getFacetedRowModel,\n  getFacetedMinMaxValues, // getFacetedRowModel\uc5d0 \uc758\uc874\n  getFacetedUniqueValues, // getFacetedRowModel\uc5d0 \uc758\uc874\n} from '@tanstack/react-table'\n//...\nconst table = useReactTable({\n  // \ub2e4\ub978 \uc635\uc158...\n  getCoreRowModel: getCoreRowModel(),\n  getFacetedRowModel: getFacetedRowModel(), // \ud074\ub77c\uc774\uc5b8\ud2b8 \uce21 faceting\uc744 \uc704\ud55c Faceting model (\ub2e4\ub978 faceting \ubc29\ubc95\uc740 \uc774 \ubaa8\ub378\uc5d0 \uc758\uc874)\n  getFacetedMinMaxValues: getFacetedMinMaxValues(), // \ucd5c\uc18c/\ucd5c\ub300 \uac12\uc774 \ud544\uc694\ud560 \uacbd\uc6b0\n  getFacetedUniqueValues: getFacetedUniqueValues(), // \uace0\uc720 \uac12 \ubaa9\ub85d\uc774 \ud544\uc694\ud560 \uacbd\uc6b0\n  //...\n})\n"})}),"\n",(0,l.jsx)(a.h3,{id:"global-faceted-row-models-\uc0ac\uc6a9\ud558\uae30",children:"Global Faceted Row Models \uc0ac\uc6a9\ud558\uae30"}),"\n",(0,l.jsx)(a.p,{children:"\ud14c\uc774\ube14 \uc635\uc158\uc5d0 \uc801\uc808\ud55c row model\uc744 \ud3ec\ud568\ud55c \ud6c4\uc5d0\ub294 faceting table \uc778\uc2a4\ud134\uc2a4 API\ub97c \uc0ac\uc6a9\ud558\uc5ec faceted row model\uc774 \uc0dd\uc131\ud55c \uac12 \ubaa9\ub85d\uc5d0 \uc811\uadfc\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."}),"\n",(0,l.jsx)(a.pre,{children:(0,l.jsx)(a.code,{className:"language-ts",children:"// \uc790\ub3d9 \uc644\uc131 \ud544\ud130\ub97c \uc704\ud55c \uace0\uc720 \uac12 \ubaa9\ub85d\nconst autoCompleteSuggestions =\n Array.from(table.getGlobalFacetedUniqueValues().keys())\n  .sort()\n  .slice(0, 5000);\n"})}),"\n",(0,l.jsx)(a.pre,{children:(0,l.jsx)(a.code,{className:"language-ts",children:"// \ubc94\uc704 \ud544\ud130\ub97c \uc704\ud55c \ucd5c\uc18c \ubc0f \ucd5c\ub300 \uac12\uc758 \ud29c\ud50c\nconst [min, max] = table.getGlobalFacetedMinMaxValues() ?? [0, 1];\n"})}),"\n",(0,l.jsx)(a.h3,{id:"custom-global-server-side-faceting",children:"Custom Global (Server-Side) Faceting"}),"\n",(0,l.jsx)(a.p,{children:"\ub0b4\uc7a5\ub41c \ud074\ub77c\uc774\uc5b8\ud2b8 \uce21 faceting \uae30\ub2a5 \ub300\uc2e0, \uc11c\ubc84 \uce21\uc5d0\uc11c \uc790\uccb4 faceting \ub85c\uc9c1\uc744 \uad6c\ud604\ud558\uace0 faceted \uac12\uc744 \ud074\ub77c\uc774\uc5b8\ud2b8 \uce21\uc5d0 \uc804\ub2ec\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. getGlobalFacetedUniqueValues \ubc0f getGlobalFacetedMinMaxValues \ud14c\uc774\ube14 \uc635\uc158\uc744 \uc0ac\uc6a9\ud558\uc5ec \uc11c\ubc84 \uce21\uc5d0\uc11c faceted \uac12\uc744 \ud574\uacb0\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."}),"\n",(0,l.jsx)(a.pre,{children:(0,l.jsx)(a.code,{className:"language-ts",children:"const facetingQuery = useQuery(\n  'faceting',\n  async () => {\n    const response = await fetch('/api/faceting');\n    return response.json();\n  },\n  {\n    onSuccess: (data) => {\n      table.getGlobalFacetedUniqueValues = () => data.uniqueValues;\n      table.getGlobalFacetedMinMaxValues = () => data.minMaxValues;\n    },\n  }\n);\n"})}),"\n",(0,l.jsxs)(a.p,{children:["\uc774 \uc608\uc81c\uc5d0\uc11c\ub294 ",(0,l.jsx)(a.code,{children:"react-query"}),"\uc758 ",(0,l.jsx)(a.code,{children:"useQuery"})," \ud6c5\uc744 \uc0ac\uc6a9\ud558\uc5ec \uc11c\ubc84\uc5d0\uc11c faceting \ub370\uc774\ud130\ub97c \uac00\uc838\uc635\ub2c8\ub2e4. \ub370\uc774\ud130\ub97c \uac00\uc838\uc628 \ud6c4, ",(0,l.jsx)(a.code,{children:"getGlobalFacetedUniqueValues"})," \ubc0f ",(0,l.jsx)(a.code,{children:"getGlobalFacetedMinMaxValues"})," \ud14c\uc774\ube14 \uc635\uc158\uc744 \uc11c\ubc84 \uc751\ub2f5\uc5d0\uc11c faceted \uac12\uc744 \ubc18\ud658\ud558\ub3c4\ub85d \uc124\uc815\ud569\ub2c8\ub2e4. \uc774\ub97c \ud1b5\ud574 \ud14c\uc774\ube14\uc740 \uc790\ub3d9 \uc644\uc131 \uc81c\uc548 \ubc0f \ubc94\uc704 \ud544\ud130\ub97c \uc0dd\uc131\ud558\uae30 \uc704\ud574 \uc11c\ubc84 \uce21 faceting \ub370\uc774\ud130\ub97c \uc0ac\uc6a9\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."]})]})}function g(e={}){const{wrapper:a}={...(0,o.R)(),...e.components};return a?(0,l.jsx)(a,{...e,children:(0,l.jsx)(r,{...e})}):r(e)}},8453:(e,a,n)=>{n.d(a,{R:()=>c,x:()=>i});var t=n(6540);const l={},o=t.createContext(l);function c(e){const a=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function i(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:c(e.components),t.createElement(o.Provider,{value:a},e.children)}}}]);