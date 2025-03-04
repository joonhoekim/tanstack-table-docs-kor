"use strict";(self.webpackChunktanstack_table_kor=self.webpackChunktanstack_table_kor||[]).push([[5113],{7457:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>o,contentTitle:()=>d,default:()=>u,frontMatter:()=>t,metadata:()=>l,toc:()=>r});const l=JSON.parse('{"id":"guide/column-visibility","title":"\uc5f4 \uac00\uc2dc\uc131 \uac00\uc774\ub4dc","description":"\uc608\uc81c","source":"@site/docs/guide/column-visibility.md","sourceDirName":"guide","slug":"/guide/column-visibility","permalink":"/tanstack-table-docs-kor/guide/column-visibility","draft":false,"unlisted":false,"editUrl":"https://github.com/joonhoekim/tanstack-table-docs-kor/tree/main/docs/guide/column-visibility.md","tags":[],"version":"current","frontMatter":{"title":"\uc5f4 \uac00\uc2dc\uc131 \uac00\uc774\ub4dc"},"sidebar":"tutorialSidebar","previous":{"title":"\uc5f4 \ud06c\uae30 \uc870\uc815 \uac00\uc774\ub4dc","permalink":"/tanstack-table-docs-kor/guide/column-sizing"},"next":{"title":"\uc5f4 \uac00\uc774\ub4dc","permalink":"/tanstack-table-docs-kor/guide/columns"}}');var s=i(4848),c=i(8453);const t={title:"\uc5f4 \uac00\uc2dc\uc131 \uac00\uc774\ub4dc"},d=void 0,o={},r=[{value:"\uc608\uc81c",id:"\uc608\uc81c",level:2},{value:"\ub2e4\ub978 \uc608\uc81c",id:"\ub2e4\ub978-\uc608\uc81c",level:3},{value:"API",id:"api",level:2},{value:"\uc5f4 \uac00\uc2dc\uc131 \uac00\uc774\ub4dc",id:"\uc5f4-\uac00\uc2dc\uc131-\uac00\uc774\ub4dc",level:2},{value:"\uc5f4 \uac00\uc2dc\uc131 \uc0c1\ud0dc",id:"\uc5f4-\uac00\uc2dc\uc131-\uc0c1\ud0dc",level:3},{value:"\uc5f4 \uc228\uae30\uae30 \ube44\ud65c\uc131\ud654",id:"\uc5f4-\uc228\uae30\uae30-\ube44\ud65c\uc131\ud654",level:3},{value:"\uc5f4 \uac00\uc2dc\uc131 \ud1a0\uae00 API",id:"\uc5f4-\uac00\uc2dc\uc131-\ud1a0\uae00-api",level:3},{value:"\uc5f4 \uac00\uc2dc\uc131\uc744 \uace0\ub824\ud55c \ud14c\uc774\ube14 API",id:"\uc5f4-\uac00\uc2dc\uc131\uc744-\uace0\ub824\ud55c-\ud14c\uc774\ube14-api",level:3}];function a(e){const n={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,c.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h2,{id:"\uc608\uc81c",children:"\uc608\uc81c"}),"\n",(0,s.jsx)(n.p,{children:"\uad6c\ud604\uc73c\ub85c \ubc14\ub85c \uac00\uace0 \uc2f6\uc73c\uc2e0\uac00\uc694? \ub2e4\uc74c \uc608\uc81c\ub97c \ud655\uc778\ud558\uc138\uc694:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"../../framework/react/examples/column-visibility",children:"column-visibility"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"../../framework/react/examples/column-ordering",children:"column-ordering"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"../../framework/react/examples/column-pinning-sticky",children:"sticky-column-pinning"})}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"\ub2e4\ub978-\uc608\uc81c",children:"\ub2e4\ub978 \uc608\uc81c"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"../../framework/solid/examples/column-visibility",children:"SolidJS column-visibility"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"../../framework/svelte/examples/column-visibility",children:"Svelte column-visibility"})}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"api",children:"API"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"../../api/features/column-visibility",children:"\uc5f4 \uac00\uc2dc\uc131 API"})}),"\n",(0,s.jsx)(n.h2,{id:"\uc5f4-\uac00\uc2dc\uc131-\uac00\uc774\ub4dc",children:"\uc5f4 \uac00\uc2dc\uc131 \uac00\uc774\ub4dc"}),"\n",(0,s.jsxs)(n.p,{children:["\uc5f4 \uac00\uc2dc\uc131 \uae30\ub2a5\uc744 \uc0ac\uc6a9\ud558\uba74 \ud14c\uc774\ube14 \uc5f4\uc744 \ub3d9\uc801\uc73c\ub85c \uc228\uae30\uac70\ub098 \ud45c\uc2dc\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \uc774\uc804 \ubc84\uc804\uc758 react-table\uc5d0\uc11c\ub294 \uc774 \uae30\ub2a5\uc774 \uc5f4\uc758 \uc815\uc801 \uc18d\uc131\uc774\uc5c8\uc9c0\ub9cc, v8\uc5d0\uc11c\ub294 \uc5f4 \uac00\uc2dc\uc131\uc744 \ub3d9\uc801\uc73c\ub85c \uad00\ub9ac\ud558\uae30 \uc704\ud55c \uc804\uc6a9 ",(0,s.jsx)(n.code,{children:"columnVisibility"})," \uc0c1\ud0dc\uc640 API\uac00 \uc788\uc2b5\ub2c8\ub2e4."]}),"\n",(0,s.jsx)(n.h3,{id:"\uc5f4-\uac00\uc2dc\uc131-\uc0c1\ud0dc",children:"\uc5f4 \uac00\uc2dc\uc131 \uc0c1\ud0dc"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"columnVisibility"})," \uc0c1\ud0dc\ub294 \uc5f4 ID\ub97c \ubd88\ub9ac\uc5b8 \uac12\uc5d0 \ub9e4\ud551\ud55c \uac83\uc785\ub2c8\ub2e4. \uc5f4 ID\uac00 \ub9f5\uc5d0 \uc874\uc7ac\ud558\uace0 \uac12\uc774 ",(0,s.jsx)(n.code,{children:"false"}),"\uc778 \uacbd\uc6b0 \uc5f4\uc774 \uc228\uaca8\uc9d1\ub2c8\ub2e4. \uc5f4 ID\uac00 \ub9f5\uc5d0 \uc5c6\uac70\ub098 \uac12\uc774 ",(0,s.jsx)(n.code,{children:"true"}),"\uc778 \uacbd\uc6b0 \uc5f4\uc774 \ud45c\uc2dc\ub429\ub2c8\ub2e4."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:"const [columnVisibility, setColumnVisibility] = useState({\n  columnId1: true,\n  columnId2: false, // \uc774 \uc5f4\uc744 \uae30\ubcf8\uc801\uc73c\ub85c \uc228\uae30\uae30\n  columnId3: true,\n});\n\nconst table = useReactTable({\n  //...\n  state: {\n    columnVisibility,\n    //...\n  },\n  onColumnVisibilityChange: setColumnVisibility,\n});\n"})}),"\n",(0,s.jsxs)(n.p,{children:["\ub300\uc548\uc73c\ub85c, \ud14c\uc774\ube14 \uc678\ubd80\uc5d0\uc11c \uc5f4 \uac00\uc2dc\uc131 \uc0c1\ud0dc\ub97c \uad00\ub9ac\ud560 \ud544\uc694\uac00 \uc5c6\ub2e4\uba74, ",(0,s.jsx)(n.code,{children:"initialState"})," \uc635\uc158\uc744 \uc0ac\uc6a9\ud558\uc5ec \ucd08\uae30 \uae30\ubcf8 \uc5f4 \uac00\uc2dc\uc131 \uc0c1\ud0dc\ub97c \uc124\uc815\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."]}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"\ucc38\uace0"}),": ",(0,s.jsx)(n.code,{children:"columnVisibility"}),"\uac00 ",(0,s.jsx)(n.code,{children:"initialState"}),"\uc640 ",(0,s.jsx)(n.code,{children:"state"})," \ubaa8\ub450\uc5d0 \uc81c\uacf5\ub41c \uacbd\uc6b0, ",(0,s.jsx)(n.code,{children:"state"})," \ucd08\uae30\ud654\uac00 \uc6b0\uc120\ud558\uba70 ",(0,s.jsx)(n.code,{children:"initialState"}),"\ub294 \ubb34\uc2dc\ub429\ub2c8\ub2e4. ",(0,s.jsx)(n.code,{children:"columnVisibility"}),"\ub97c ",(0,s.jsx)(n.code,{children:"initialState"}),"\uc640 ",(0,s.jsx)(n.code,{children:"state"})," \ubaa8\ub450\uc5d0 \uc81c\uacf5\ud558\uc9c0 \ub9d0\uace0, \ub458 \uc911 \ud558\ub098\uc5d0\ub9cc \uc81c\uacf5\ud558\uc138\uc694."]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:"const table = useReactTable({\n  //...\n  initialState: {\n    columnVisibility: {\n      columnId1: true,\n      columnId2: false, // \uc774 \uc5f4\uc744 \uae30\ubcf8\uc801\uc73c\ub85c \uc228\uae30\uae30\n      columnId3: true,\n    },\n    //...\n  },\n});\n"})}),"\n",(0,s.jsx)(n.h3,{id:"\uc5f4-\uc228\uae30\uae30-\ube44\ud65c\uc131\ud654",children:"\uc5f4 \uc228\uae30\uae30 \ube44\ud65c\uc131\ud654"}),"\n",(0,s.jsxs)(n.p,{children:["\uae30\ubcf8\uc801\uc73c\ub85c \ubaa8\ub4e0 \uc5f4\uc740 \uc228\uae30\uac70\ub098 \ud45c\uc2dc\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \ud2b9\uc815 \uc5f4\uc774 \uc228\uaca8\uc9c0\uc9c0 \uc54a\ub3c4\ub85d \ud558\ub824\uba74, \ud574\ub2f9 \uc5f4\uc5d0 \ub300\ud574 ",(0,s.jsx)(n.code,{children:"enableHiding"})," \uc5f4 \uc635\uc158\uc744 ",(0,s.jsx)(n.code,{children:"false"}),"\ub85c \uc124\uc815\ud558\uc138\uc694."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:"const columns = [\n  {\n    header: 'ID',\n    accessorKey: 'id',\n    enableHiding: false, // \uc774 \uc5f4\uc5d0 \ub300\ud574 \uc228\uae30\uae30 \ube44\ud65c\uc131\ud654\n  },\n  {\n    header: 'Name',\n    accessor: 'name', // \uc228\uae38 \uc218 \uc788\uc74c\n  },\n];\n"})}),"\n",(0,s.jsx)(n.h3,{id:"\uc5f4-\uac00\uc2dc\uc131-\ud1a0\uae00-api",children:"\uc5f4 \uac00\uc2dc\uc131 \ud1a0\uae00 API"}),"\n",(0,s.jsx)(n.p,{children:"UI\uc5d0\uc11c \uc5f4 \uac00\uc2dc\uc131 \ud1a0\uae00\uc744 \ub80c\ub354\ub9c1\ud558\ub294 \ub370 \uc720\uc6a9\ud55c \uc5ec\ub7ec \uc5f4 API \uba54\uc11c\ub4dc\uac00 \uc788\uc2b5\ub2c8\ub2e4."}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"column.getCanHide"})," - ",(0,s.jsx)(n.code,{children:"enableHiding"}),"\uc774 ",(0,s.jsx)(n.code,{children:"false"}),"\ub85c \uc124\uc815\ub41c \uc5f4\uc5d0 \ub300\ud574 \uac00\uc2dc\uc131 \ud1a0\uae00\uc744 \ube44\ud65c\uc131\ud654\ud558\ub294 \ub370 \uc720\uc6a9\ud569\ub2c8\ub2e4."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"column.getIsVisible"})," - \uac00\uc2dc\uc131 \ud1a0\uae00\uc758 \ucd08\uae30 \uc0c1\ud0dc\ub97c \uc124\uc815\ud558\ub294 \ub370 \uc720\uc6a9\ud569\ub2c8\ub2e4."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"column.toggleVisibility"})," - \uc5f4\uc758 \uac00\uc2dc\uc131\uc744 \ud1a0\uae00\ud558\ub294 \ub370 \uc720\uc6a9\ud569\ub2c8\ub2e4."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"column.getToggleVisibilityHandler"})," - ",(0,s.jsx)(n.code,{children:"column.toggleVisibility"})," \uba54\uc11c\ub4dc\ub97c UI \uc774\ubca4\ud2b8 \ud578\ub4e4\ub7ec\uc5d0 \uc5f0\uacb0\ud558\ub294 \ub2e8\ucd95\ud0a4\uc785\ub2c8\ub2e4."]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:'{table.getAllColumns().map((column) => (\n  <label key={column.id}>\n    <input\n      checked={column.getIsVisible()}\n      disabled={!column.getCanHide()}\n      onChange={column.getToggleVisibilityHandler()}\n      type="checkbox"\n    />\n    {column.columnDef.header}\n  </label>\n))}\n'})}),"\n",(0,s.jsx)(n.h3,{id:"\uc5f4-\uac00\uc2dc\uc131\uc744-\uace0\ub824\ud55c-\ud14c\uc774\ube14-api",children:"\uc5f4 \uac00\uc2dc\uc131\uc744 \uace0\ub824\ud55c \ud14c\uc774\ube14 API"}),"\n",(0,s.jsxs)(n.p,{children:["\ud5e4\ub354, \ubcf8\ubb38, \ud478\ud130 \uc140\uc744 \ub80c\ub354\ub9c1\ud560 \ub54c \uc0ac\uc6a9\ud560 \uc218 \uc788\ub294 \ub9ce\uc740 API \uc635\uc158\uc774 \uc788\uc2b5\ub2c8\ub2e4. ",(0,s.jsx)(n.code,{children:"table.getAllLeafColumns"})," \ubc0f ",(0,s.jsx)(n.code,{children:"row.getAllCells"}),"\uc640 \uac19\uc740 API\ub97c \ubcfc \uc218 \uc788\uc9c0\ub9cc, \uc774\ub7ec\ud55c API\ub97c \uc0ac\uc6a9\ud558\uba74 \uc5f4 \uac00\uc2dc\uc131\uc744 \uace0\ub824\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4. \ub300\uc2e0, ",(0,s.jsx)(n.code,{children:"table.getVisibleLeafColumns"})," \ubc0f ",(0,s.jsx)(n.code,{children:"row.getVisibleCells"}),'\uc640 \uac19\uc740 "visible" \ubcc0\ud615 API\ub97c \uc0ac\uc6a9\ud574\uc57c \ud569\ub2c8\ub2e4.']}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:"<table>\n  <thead>\n    <tr>\n      {table.getVisibleLeafColumns().map((column) => ( // \uc5f4 \uac00\uc2dc\uc131\uc744 \uace0\ub824\ud568\n        //\n      ))}\n    </tr>\n  </thead>\n  <tbody>\n    {table.getRowModel().rows.map((row) => (\n      <tr key={row.id}>\n        {row.getVisibleCells().map((cell) => ( // \uc5f4 \uac00\uc2dc\uc131\uc744 \uace0\ub824\ud568\n          //\n        ))}\n      </tr>\n    ))}\n  </tbody>\n</table>\n"})}),"\n",(0,s.jsx)(n.p,{children:"\ud5e4\ub354 \uadf8\ub8f9 API\ub97c \uc0ac\uc6a9\ud558\ub294 \uacbd\uc6b0, \uc774\ubbf8 \uc5f4 \uac00\uc2dc\uc131\uc744 \uace0\ub824\ud569\ub2c8\ub2e4."})]})}function u(e={}){const{wrapper:n}={...(0,c.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>t,x:()=>d});var l=i(6540);const s={},c=l.createContext(s);function t(e){const n=l.useContext(c);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:t(e.components),l.createElement(c.Provider,{value:n},e.children)}}}]);