"use strict";(self.webpackChunktanstack_table_kor=self.webpackChunktanstack_table_kor||[]).push([[2163],{2941:(e,n,c)=>{c.r(n),c.d(n,{assets:()=>i,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>l,toc:()=>t});const l=JSON.parse('{"id":"guide/migrating","title":"V8\ub85c\uc758 \ub9c8\uc774\uadf8\ub808\uc774\uc158 \uac00\uc774\ub4dc","description":"V8\ub85c\uc758 \ub9c8\uc774\uadf8\ub808\uc774\uc158","source":"@site/docs/guide/migrating.md","sourceDirName":"guide","slug":"/guide/migrating","permalink":"/tanstack-table-docs-kor/guide/migrating","draft":false,"unlisted":false,"editUrl":"https://github.com/joonhoekim/tanstack-table-docs-kor/tree/main/docs/guide/migrating.md","tags":[],"version":"current","frontMatter":{"title":"V8\ub85c\uc758 \ub9c8\uc774\uadf8\ub808\uc774\uc158 \uac00\uc774\ub4dc"},"sidebar":"tutorialSidebar","previous":{"title":"\ud5e4\ub354 \uac00\uc774\ub4dc","permalink":"/tanstack-table-docs-kor/guide/headers"},"next":{"title":"Pagination Guide","permalink":"/tanstack-table-docs-kor/guide/pagination"}}');var d=c(4848),s=c(8453);const o={title:"V8\ub85c\uc758 \ub9c8\uc774\uadf8\ub808\uc774\uc158 \uac00\uc774\ub4dc"},r=void 0,i={},t=[{value:"V8\ub85c\uc758 \ub9c8\uc774\uadf8\ub808\uc774\uc158",id:"v8\ub85c\uc758-\ub9c8\uc774\uadf8\ub808\uc774\uc158",level:2},{value:"\uc8fc\ubaa9\ud560 \ub9cc\ud55c \ubcc0\uacbd \uc0ac\ud56d",id:"\uc8fc\ubaa9\ud560-\ub9cc\ud55c-\ubcc0\uacbd-\uc0ac\ud56d",level:3},{value:"\uc0c8 \ubc84\uc804 \uc124\uce58",id:"\uc0c8-\ubc84\uc804-\uc124\uce58",level:3},{value:"\ud14c\uc774\ube14 \uc635\uc158 \uc5c5\ub370\uc774\ud2b8",id:"\ud14c\uc774\ube14-\uc635\uc158-\uc5c5\ub370\uc774\ud2b8",level:3},{value:"\uc5f4 \uc815\uc758 \uc5c5\ub370\uc774\ud2b8",id:"\uc5f4-\uc815\uc758-\uc5c5\ub370\uc774\ud2b8",level:3},{value:"\ud14c\uc774\ube14 \ub9c8\ud06c\uc5c5 \ub9c8\uc774\uadf8\ub808\uc774\uc158",id:"\ud14c\uc774\ube14-\ub9c8\ud06c\uc5c5-\ub9c8\uc774\uadf8\ub808\uc774\uc158",level:3},{value:"\uae30\ud0c0 \ubcc0\uacbd \uc0ac\ud56d",id:"\uae30\ud0c0-\ubcc0\uacbd-\uc0ac\ud56d",level:3}];function a(e){const n={blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.h2,{id:"v8\ub85c\uc758-\ub9c8\uc774\uadf8\ub808\uc774\uc158",children:"V8\ub85c\uc758 \ub9c8\uc774\uadf8\ub808\uc774\uc158"}),"\n",(0,d.jsx)(n.p,{children:"TanStack Table V8\uc740 React Table v7\uc744 TypeScript\ub85c \uc644\uc804\ud788 \uc0c8\ub85c \uc791\uc131\ud55c \uac83\uc785\ub2c8\ub2e4. \ub9c8\ud06c\uc5c5\uacfc CSS\uc758 \uc804\uccb4 \uad6c\uc870/\uc870\uc9c1\uc740 \ud06c\uac8c \ubcc0\ud558\uc9c0 \uc54a\uc9c0\ub9cc, \ub9ce\uc740 API\uac00 \uc774\ub984\uc774 \ubcc0\uacbd\ub418\uac70\ub098 \ub300\uccb4\ub418\uc5c8\uc2b5\ub2c8\ub2e4."}),"\n",(0,d.jsx)(n.h3,{id:"\uc8fc\ubaa9\ud560-\ub9cc\ud55c-\ubcc0\uacbd-\uc0ac\ud56d",children:"\uc8fc\ubaa9\ud560 \ub9cc\ud55c \ubcc0\uacbd \uc0ac\ud56d"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:"\uae30\ubcf8 \ud328\ud0a4\uc9c0\uc5d0 \ud3ec\ud568\ub41c \ud0c0\uc785\uacfc \ud568\uaed8 TypeScript\ub85c \uc644\uc804\ud55c \uc7ac\uc791\uc131"}),"\n",(0,d.jsx)(n.li,{children:"\uc81c\uc5b4 \uc5ed\uc804\uc744 \uc120\ud638\ud558\uc5ec \ud50c\ub7ec\uadf8\uc778 \uc2dc\uc2a4\ud15c \uc81c\uac70"}),"\n",(0,d.jsx)(n.li,{children:"\ud6e8\uc52c \ub354 \ud06c\uace0 \uac1c\uc120\ub41c API (\ubc0f \uace0\uc815\uacfc \uac19\uc740 \uc0c8\ub85c\uc6b4 \uae30\ub2a5)"}),"\n",(0,d.jsx)(n.li,{children:"\ub354 \ub098\uc740 \uc81c\uc5b4 \uc0c1\ud0dc \uad00\ub9ac"}),"\n",(0,d.jsx)(n.li,{children:"\uc11c\ubc84 \uce21 \uc791\uc5c5\uc5d0 \ub300\ud55c \ub354 \ub098\uc740 \uc9c0\uc6d0"}),"\n",(0,d.jsx)(n.li,{children:"\uc644\uc804\ud55c (\ud558\uc9c0\ub9cc \uc120\ud0dd\uc801\uc778) \ub370\uc774\ud130 \ud30c\uc774\ud504\ub77c\uc778 \uc81c\uc5b4"}),"\n",(0,d.jsx)(n.li,{children:"React, Solid, Svelte, Vue \ubc0f \uc7a0\uc7ac\uc801\uc73c\ub85c \ub354 \ub9ce\uc740 \ud504\ub808\uc784\uc6cc\ud06c \uc5b4\ub311\ud130\ub97c \uac00\uc9c4 \ub3c5\ub9bd\uc801\uc778 \ucf54\uc5b4"}),"\n",(0,d.jsx)(n.li,{children:"\uc0c8\ub85c\uc6b4 \uac1c\ubc1c \ub3c4\uad6c"}),"\n"]}),"\n",(0,d.jsx)(n.h3,{id:"\uc0c8-\ubc84\uc804-\uc124\uce58",children:"\uc0c8 \ubc84\uc804 \uc124\uce58"}),"\n",(0,d.jsxs)(n.p,{children:["\uc0c8\ub85c\uc6b4 TanStack Table \ubc84\uc804\uc740 ",(0,d.jsx)(n.code,{children:"@tanstack"})," \ubc94\uc704\ub85c \uac8c\uc2dc\ub429\ub2c8\ub2e4. \uc120\ud638\ud558\ub294 \ud328\ud0a4\uc9c0 \uad00\ub9ac\uc790\ub97c \uc0ac\uc6a9\ud558\uc5ec \uc0c8 \ud328\ud0a4\uc9c0\ub97c \uc124\uce58\ud558\uc138\uc694:"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-bash",children:"npm uninstall react-table @types/react-table\nnpm install @tanstack/react-table\n"})}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-tsx",children:"- import { useTable } from 'react-table' // [!code --]\n+ import { useReactTable } from '@tanstack/react-table' // [!code ++]\n"})}),"\n",(0,d.jsxs)(n.p,{children:["\ud0c0\uc785\uc740 \uc774\uc81c \uae30\ubcf8 \ud328\ud0a4\uc9c0\uc5d0 \ud3ec\ud568\ub418\uc5b4 \uc788\uc73c\ubbc0\ub85c ",(0,d.jsx)(n.code,{children:"@types/react-table"})," \ud328\ud0a4\uc9c0\ub97c \uc81c\uac70\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."]}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:["\uc6d0\ud55c\ub2e4\uba74, \ucf54\ub4dc\ub97c \uc810\uc9c4\uc801\uc73c\ub85c \ub9c8\uc774\uadf8\ub808\uc774\uc158\ud560 \uc218 \uc788\ub3c4\ub85d \uc774\uc804 ",(0,d.jsx)(n.code,{children:"react-table"})," \ud328\ud0a4\uc9c0\ub97c \uc124\uce58\ub41c \uc0c1\ud0dc\ub85c \uc720\uc9c0\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \ubcc4\ub3c4\uc758 \ud14c\uc774\ube14\uc5d0 \ub300\ud574 \ub450 \ud328\ud0a4\uc9c0\ub97c \ub098\ub780\ud788 \uc0ac\uc6a9\ud560 \uc218 \uc788\uc5b4\uc57c \ud569\ub2c8\ub2e4."]}),"\n"]}),"\n",(0,d.jsx)(n.h3,{id:"\ud14c\uc774\ube14-\uc635\uc158-\uc5c5\ub370\uc774\ud2b8",children:"\ud14c\uc774\ube14 \uc635\uc158 \uc5c5\ub370\uc774\ud2b8"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"useTable"}),"\uc744 ",(0,d.jsx)(n.code,{children:"useReactTable"}),"\ub85c \uc774\ub984 \ubcc0\uacbd"]}),"\n",(0,d.jsx)(n.li,{children:"\uc774\uc804 \ud6c5 \ubc0f \ud50c\ub7ec\uadf8\uc778 \uc2dc\uc2a4\ud15c\uc740 \uc81c\uac70\ub418\uc5c8\uc9c0\ub9cc, \uac01 \uae30\ub2a5\uc5d0 \ub300\ud55c \ud2b8\ub9ac \uc250\uc774\ucee4\ube14 \ud589 \ubaa8\ub378 \uac00\uc838\uc624\uae30\ub85c \ub300\uccb4\ub418\uc5c8\uc2b5\ub2c8\ub2e4."}),"\n"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-tsx",children:"- import { useTable, usePagination, useSortBy } from 'react-table'; // [!code --]\n+ import { // [!code ++]\n+   useReactTable, // [!code ++]\n+   getCoreRowModel, // [!code ++]\n+   getPaginationRowModel, // [!code ++]\n+   getSortedRowModel // [!code ++]\n+ } from '@tanstack/react-table'; // [!code ++]\n\n// ...\n\n-   const tableInstance = useTable( // [!code --]\n-     { columns,  data }, // [!code --]\n-     useSortBy, // [!code --]\n-     usePagination, //order of hooks used to matter // [!code --]\n-     // etc. // [!code --]\n-   ); // [!code --]\n+   const tableInstance = useReactTable({ // [!code ++]\n+     columns, // [!code ++]\n+     data, // [!code ++]\n+     getCoreRowModel: getCoreRowModel(), // [!code ++]\n+     getPaginationRowModel: getPaginationRowModel(), // [!code ++]\n+     getSortedRowModel: getSortedRowModel(), //order doesn't matter anymore! // [!code ++]\n+     // etc. // [!code ++]\n+   }); // [!code ++]\n"})}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:["\ubaa8\ub4e0 ",(0,d.jsx)(n.code,{children:"disable*"})," \ud14c\uc774\ube14 \uc635\uc158\uc740 ",(0,d.jsx)(n.code,{children:"enable*"})," \ud14c\uc774\ube14 \uc635\uc158\uc73c\ub85c \uc774\ub984\uc774 \ubcc0\uacbd\ub418\uc5c8\uc2b5\ub2c8\ub2e4. (\uc608: ",(0,d.jsx)(n.code,{children:"disableSortBy"}),"\ub294 \uc774\uc81c ",(0,d.jsx)(n.code,{children:"enableSorting"}),", ",(0,d.jsx)(n.code,{children:"disableGroupBy"}),"\ub294 \uc774\uc81c ",(0,d.jsx)(n.code,{children:"enableGrouping"})," \ub4f1)"]}),"\n",(0,d.jsx)(n.li,{children:"..."}),"\n"]}),"\n",(0,d.jsx)(n.h3,{id:"\uc5f4-\uc815\uc758-\uc5c5\ub370\uc774\ud2b8",children:"\uc5f4 \uc815\uc758 \uc5c5\ub370\uc774\ud2b8"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:["accessor\ub294 ",(0,d.jsx)(n.code,{children:"accessorKey"})," \ub610\ub294 ",(0,d.jsx)(n.code,{children:"accessorFn"}),"\uc73c\ub85c \uc774\ub984\uc774 \ubcc0\uacbd\ub418\uc5c8\uc2b5\ub2c8\ub2e4 (\ubb38\uc790\uc5f4 \ub610\ub294 \ud568\uc218\ub97c \uc0ac\uc6a9\ud558\ub294\uc9c0\uc5d0 \ub530\ub77c \ub2e4\ub984)"]}),"\n",(0,d.jsx)(n.li,{children:"width, minWidth, maxWidth\ub294 size, minSize, maxSize\ub85c \uc774\ub984\uc774 \ubcc0\uacbd\ub418\uc5c8\uc2b5\ub2c8\ub2e4"}),"\n",(0,d.jsxs)(n.li,{children:["\uc120\ud0dd\uc801\uc73c\ub85c, \ub354 \ub098\uc740 TypeScript \ud78c\ud2b8\ub97c \uc704\ud574 \uac01 \uc5f4 \uc815\uc758 \uc8fc\uc704\uc5d0 \uc0c8\ub85c\uc6b4 ",(0,d.jsx)(n.code,{children:"createColumnHelper"})," \ud568\uc218\ub97c \uc0ac\uc6a9\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. (\uc120\ud638\ud558\ub294 \uacbd\uc6b0 \uc5ec\uc804\ud788 \uc5f4 \uc815\uc758 \ubc30\uc5f4\uc744 \uc0ac\uc6a9\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.)","\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:"\uccab \ubc88\uc9f8 \ub9e4\uac1c\ubcc0\uc218\ub294 accessor \ud568\uc218 \ub610\ub294 accessor \ubb38\uc790\uc5f4\uc785\ub2c8\ub2e4."}),"\n",(0,d.jsx)(n.li,{children:"\ub450 \ubc88\uc9f8 \ub9e4\uac1c\ubcc0\uc218\ub294 \uc5f4 \uc635\uc158\uc758 \uac1d\uccb4\uc785\ub2c8\ub2e4."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-tsx",children:"const columns = [\n-  { // [!code --]\n-    accessor: 'firstName', // [!code --]\n-    Header: 'First Name', // [!code --]\n-  }, // [!code --]\n-  { // [!code --]\n-    accessor: row => row.lastName, // [!code --]\n-    Header: () => <span>Last Name</span>, // [!code --]\n-  }, // [!code --]\n\n// Best TypeScript experience, especially when using `cell.getValue()` later on\n+  columnHelper.accessor('firstName', { //accessorKey // [!code ++]\n+    header: 'First Name', // [!code ++]\n+  }), // [!code ++]\n+  columnHelper.accessor(row => row.lastName, { //accessorFn // [!code ++]\n+    header: () => <span>Last Name</span>, // [!code ++]\n+  }), // [!code ++]\n\n// OR (if you prefer)\n+ { // [!code ++]\n+   accessorKey: 'firstName', // [!code ++]\n+   header: 'First Name', // [!code ++]\n+ }, // [!code ++]\n+ { // [!code ++]\n+   accessorFn: row => row.lastName, // [!code ++]\n+   header: () => <span>Last Name</span>, // [!code ++]\n+ }, // [!code ++]\n]\n"})}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsxs)(n.p,{children:["\ucc38\uace0: \ucef4\ud3ec\ub10c\ud2b8 \ub0b4\uc5d0\uc11c \uc5f4\uc744 \uc815\uc758\ud558\ub294 \uacbd\uc6b0, \uc5ec\uc804\ud788 \uc5f4 \uc815\uc758\uc5d0 \uc548\uc815\uc801\uc778 ID\ub97c \ubd80\uc5ec\ud574\uc57c \ud569\ub2c8\ub2e4. \uc774\ub294 \uc131\ub2a5\uc5d0 \ub3c4\uc6c0\uc774 \ub418\uace0 \ubd88\ud544\uc694\ud55c \uc7ac\ub80c\ub354\ub9c1\uc744 \ubc29\uc9c0\ud569\ub2c8\ub2e4. \uc5f4 \uc815\uc758\ub97c ",(0,d.jsx)(n.code,{children:"useMemo"})," \ub610\ub294 ",(0,d.jsx)(n.code,{children:"useState"})," \ud6c5\uc5d0 \uc800\uc7a5\ud558\uc138\uc694."]}),"\n"]}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"\uc5f4 \uc635\uc158 \uc774\ub984 \ubcc0\uacbd"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"Header"}),"\ub294 ",(0,d.jsx)(n.code,{children:"header"}),"\ub85c \uc774\ub984\uc774 \ubcc0\uacbd\ub418\uc5c8\uc2b5\ub2c8\ub2e4"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"Cell"}),"\uc740 ",(0,d.jsx)(n.code,{children:"cell"}),"\ub85c \uc774\ub984\uc774 \ubcc0\uacbd\ub418\uc5c8\uc2b5\ub2c8\ub2e4 (\uc140 \ub80c\ub354 \ud568\uc218\ub3c4 \ubcc0\uacbd\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \uc544\ub798 \ucc38\uc870)"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"Footer"}),"\ub294 ",(0,d.jsx)(n.code,{children:"footer"}),"\ub85c \uc774\ub984\uc774 \ubcc0\uacbd\ub418\uc5c8\uc2b5\ub2c8\ub2e4"]}),"\n",(0,d.jsxs)(n.li,{children:["\ubaa8\ub4e0 ",(0,d.jsx)(n.code,{children:"disable*"})," \uc5f4 \uc635\uc158\uc740 ",(0,d.jsx)(n.code,{children:"enable*"})," \uc5f4 \uc635\uc158\uc73c\ub85c \uc774\ub984\uc774 \ubcc0\uacbd\ub418\uc5c8\uc2b5\ub2c8\ub2e4. (\uc608: ",(0,d.jsx)(n.code,{children:"disableSortBy"}),"\ub294 \uc774\uc81c ",(0,d.jsx)(n.code,{children:"enableSorting"}),", ",(0,d.jsx)(n.code,{children:"disableGroupBy"}),"\ub294 \uc774\uc81c ",(0,d.jsx)(n.code,{children:"enableGrouping"})," \ub4f1)"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"sortType"}),"\uc740 ",(0,d.jsx)(n.code,{children:"sortingFn"}),"\uc73c\ub85c \ubcc0\uacbd\ub418\uc5c8\uc2b5\ub2c8\ub2e4"]}),"\n",(0,d.jsx)(n.li,{children:"..."}),"\n"]}),"\n"]}),"\n",(0,d.jsxs)(n.li,{children:["\n",(0,d.jsx)(n.p,{children:"\uc0ac\uc6a9\uc790 \uc815\uc758 \uc140 \ub80c\ub354\ub7ec \ubcc0\uacbd \uc0ac\ud56d"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"value"}),"\ub294 ",(0,d.jsx)(n.code,{children:"getValue"}),"\ub85c \uc774\ub984\uc774 \ubcc0\uacbd\ub418\uc5c8\uc2b5\ub2c8\ub2e4 (\uc5c5\uadf8\ub808\uc774\ub4dc \uc804\ubc18\uc5d0 \uac78\uccd0, \uac12\uc744 \uc9c1\uc811 \uc81c\uacf5\ud558\ub294 \ub300\uc2e0, \uac12\uc744 \ud3c9\uac00\ud558\uae30 \uc704\ud55c \ud568\uc218 ",(0,d.jsx)(n.code,{children:"getValue"}),"\uac00 \ub178\ucd9c\ub429\ub2c8\ub2e4. \uc774 \ubcc0\uacbd\uc740 ",(0,d.jsx)(n.code,{children:"getValue()"}),"\uac00 \ud638\ucd9c\ub420 \ub54c\ub9cc \uac12\uc744 \ud3c9\uac00\ud558\uace0 \uce90\uc2dc\ud558\uc5ec \uc131\ub2a5\uc744 \ud5a5\uc0c1\uc2dc\ud0a4\uae30 \uc704\ud55c \uac83\uc785\ub2c8\ub2e4.)"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"cell: { isGrouped, isPlaceholder, isAggregated }"}),"\ub294 \uc774\uc81c ",(0,d.jsx)(n.code,{children:"cell: { getIsGrouped, getIsPlaceholder, getIsAggregated }"}),"\uc785\ub2c8\ub2e4"]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"column"}),": \uae30\ubcf8 \uc218\uc900\uc758 props\ub294 \uc774\uc81c RT \uc804\uc6a9\uc785\ub2c8\ub2e4. \uc815\uc758\ud560 \ub54c \uac1d\uccb4\uc5d0 \ucd94\uac00\ud55c \uac12\uc740 \uc774\uc81c ",(0,d.jsx)(n.code,{children:"columnDef"}),"\uc5d0\uc11c \ud55c \ub2e8\uacc4 \ub354 \uae4a\uc5b4\uc84c\uc2b5\ub2c8\ub2e4."]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"table"}),": ",(0,d.jsx)(n.code,{children:"useTable"})," \ud6c5\uc5d0 \uc804\ub2ec\ub41c props\ub294 \uc774\uc81c ",(0,d.jsx)(n.code,{children:"options"})," \uc544\ub798\uc5d0 \ub098\ud0c0\ub0a9\ub2c8\ub2e4."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(n.h3,{id:"\ud14c\uc774\ube14-\ub9c8\ud06c\uc5c5-\ub9c8\uc774\uadf8\ub808\uc774\uc158",children:"\ud14c\uc774\ube14 \ub9c8\ud06c\uc5c5 \ub9c8\uc774\uadf8\ub808\uc774\uc158"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"cell.render('Cell')"})," \ub610\ub294 ",(0,d.jsx)(n.code,{children:"column.render('Header')"})," \ub300\uc2e0 ",(0,d.jsx)(n.code,{children:"flexRender()"}),"\ub97c \uc0ac\uc6a9\ud558\uc138\uc694."]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"getHeaderProps"}),", ",(0,d.jsx)(n.code,{children:"getFooterProps"}),", ",(0,d.jsx)(n.code,{children:"getCellProps"}),", ",(0,d.jsx)(n.code,{children:"getRowProps"})," \ub4f1\uc740 \ubaa8\ub450 _deprecated_\ub418\uc5c8\uc2b5\ub2c8\ub2e4.","\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:["TanStack Table\uc740 \ub354 \uc774\uc0c1 ",(0,d.jsx)(n.code,{children:"style"})," \ub610\ub294 \uc811\uadfc\uc131 \uc18d\uc131(\uc608: ",(0,d.jsx)(n.code,{children:"role"}),")\uc744 \uae30\ubcf8\uc801\uc73c\ub85c \uc81c\uacf5\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4. \uc774\ub7ec\ud55c \uc18d\uc131\uc740 \uc5ec\uc804\ud788 \uc911\uc694\ud558\uc9c0\ub9cc, \ud504\ub808\uc784\uc6cc\ud06c \ub3c5\ub9bd\uc131\uc744 \uc9c0\uc6d0\ud558\uae30 \uc704\ud574 \uc81c\uac70\ud574\uc57c \ud588\uc2b5\ub2c8\ub2e4."]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"onClick"})," \ud578\ub4e4\ub7ec\ub97c \uc218\ub3d9\uc73c\ub85c \uc815\uc758\ud574\uc57c \ud558\uc9c0\ub9cc, \uc774\ub97c \uac04\ub2e8\ud558\uac8c \uc720\uc9c0\ud558\uae30 \uc704\ud55c \uc0c8\ub85c\uc6b4 ",(0,d.jsx)(n.code,{children:"get*Handler"})," \ub3c4\uc6b0\ubbf8\uac00 \uc788\uc2b5\ub2c8\ub2e4."]}),"\n",(0,d.jsxs)(n.li,{children:[(0,d.jsx)(n.code,{children:"key"})," props\ub97c \uc218\ub3d9\uc73c\ub85c \uc815\uc758\ud574\uc57c \ud569\ub2c8\ub2e4"]}),"\n",(0,d.jsxs)(n.li,{children:["\uadf8\ub8f9\ud654\ub41c \ud5e4\ub354, \uc9d1\uacc4 \ub4f1\uacfc \uac19\uc740 \uae30\ub2a5\uc744 \uc0ac\uc6a9\ud558\ub294 \uacbd\uc6b0 ",(0,d.jsx)(n.code,{children:"colSpan"})," props\ub97c \uc218\ub3d9\uc73c\ub85c \uc815\uc758\ud574\uc57c \ud569\ub2c8\ub2e4"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-tsx",children:"- <th {...header.getHeaderProps()}>{cell.render('Header')}</th> // [!code --]\n+ <th colSpan={header.colSpan} key={column.id}> // [!code ++]\n+   {flexRender( // [!code ++]\n+     header.column.columnDef.header, // [!code ++]\n+     header.getContext() // [!code ++]\n+   )} // [!code ++]\n+ </th> // [!code ++]\n"})}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-tsx",children:"- <td {...cell.getCellProps()}>{cell.render('Cell')}</td> // [!code --]\n+ <td key={cell.id}> // [!code ++]\n+   {flexRender( // [!code ++]\n+     cell.column.columnDef.cell, // [!code ++]\n+     cell.getContext() // [!code ++]\n+   )} // [!code ++]\n+ </td> // [!code ++]\n"})}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-tsx",children:'// in column definitions in this case\n- Header: ({ getToggleAllRowsSelectedProps }) => ( // [!code --]\n-   <input type="checkbox" {...getToggleAllRowsSelectedProps()} /> // [!code --]\n- ), // [!code --]\n- Cell: ({ row }) => ( // [!code --]\n-   <input type="checkbox" {...row.getToggleRowSelectedProps()} /> // [!code --]\n- ), // [!code --]\n+ header: ({ table }) => ( // [!code ++]\n+   <Checkbox // [!code ++]\n+     checked={table.getIsAllRowsSelected()} // [!code ++]\n+     indeterminate={table.getIsSomeRowsSelected()} // [!code ++]\n+     onChange={table.getToggleAllRowsSelectedHandler()} // [!code ++]\n+   /> // [!code ++]\n+ ), // [!code ++]\n+ cell: ({ row }) => ( // [!code ++]\n+   <Checkbox // [!code ++]\n+     checked={row.getIsSelected()} // [!code ++]\n+     disabled={!row.getCanSelect()} // [!code ++]\n+     indeterminate={row.getIsSomeSelected()} // [!code ++]\n+     onChange={row.getToggleSelectedHandler()} // [!code ++]\n+   /> // [!code ++]\n+ ), // [!code ++]\n'})}),"\n",(0,d.jsx)(n.h3,{id:"\uae30\ud0c0-\ubcc0\uacbd-\uc0ac\ud56d",children:"\uae30\ud0c0 \ubcc0\uacbd \uc0ac\ud56d"}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsxs)(n.li,{children:["\uc0ac\uc6a9\uc790 \uc815\uc758 ",(0,d.jsx)(n.code,{children:"filterTypes"})," (\uc774\uc81c ",(0,d.jsx)(n.code,{children:"filterFns"}),"\ub77c\uace0 \ud568)\ub294 \ud589\uc774 \ud3ec\ud568\ub418\uc5b4\uc57c \ud558\ub294\uc9c0 \uc5ec\ubd80\uc5d0 \ub300\ud55c \ubd80\uc6b8\ub9cc \ubc18\ud658\ud558\ub294 \uc0c8\ub85c\uc6b4 \ud568\uc218 \uc11c\uba85\uc744 \uac00\uc9d1\ub2c8\ub2e4."]}),"\n"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-tsx",children:"- (rows: Row[], id: string, filterValue: any) => Row[] // [!code --]\n+ (row: Row, id: string, filterValue: any) => boolean // [!code ++]\n"})}),"\n",(0,d.jsxs)(n.ul,{children:["\n",(0,d.jsx)(n.li,{children:"..."}),"\n"]}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsx)(n.p,{children:"\uc774 \uac00\uc774\ub4dc\ub294 \uc9c4\ud589 \uc911\uc778 \uc791\uc5c5\uc785\ub2c8\ub2e4. \uc2dc\uac04\uc774 \uc788\ub2e4\uba74 \uae30\uc5ec\ub97c \uace0\ub824\ud574 \uc8fc\uc138\uc694!"}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(a,{...e})}):a(e)}},8453:(e,n,c)=>{c.d(n,{R:()=>o,x:()=>r});var l=c(6540);const d={},s=l.createContext(d);function o(e){const n=l.useContext(s);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:o(e.components),l.createElement(s.Provider,{value:n},e.children)}}}]);