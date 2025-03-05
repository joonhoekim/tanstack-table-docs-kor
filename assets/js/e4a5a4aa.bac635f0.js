"use strict";(self.webpackChunktanstack_table_kor=self.webpackChunktanstack_table_kor||[]).push([[2447],{8453:(e,l,i)=>{i.d(l,{R:()=>o,x:()=>c});var n=i(6540);const s={},t=n.createContext(s);function o(e){const l=n.useContext(t);return n.useMemo((function(){return"function"==typeof e?e(l):{...l,...e}}),[l,e])}function c(e){let l;return l=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),n.createElement(t.Provider,{value:l},e.children)}},8495:(e,l,i)=>{i.r(l),i.d(l,{assets:()=>d,contentTitle:()=>c,default:()=>u,frontMatter:()=>o,metadata:()=>n,toc:()=>a});const n=JSON.parse('{"id":"api/features/column-visibility","title":"Column Visibility API","description":"State","source":"@site/docs/api/features/column-visibility.md","sourceDirName":"api/features","slug":"/api/features/column-visibility","permalink":"/tanstack-table-docs-kor/api/features/column-visibility","draft":false,"unlisted":false,"editUrl":"https://github.com/joonhoekim/tanstack-table-docs-kor/tree/main/docs/api/features/column-visibility.md","tags":[],"version":"current","frontMatter":{"title":"Column Visibility API","id":"column-visibility"},"sidebar":"tutorialSidebar","previous":{"title":"Column Sizing API","permalink":"/tanstack-table-docs-kor/api/features/column-sizing"},"next":{"title":"Global Faceting APIs","permalink":"/tanstack-table-docs-kor/api/features/global-faceting"}}');var s=i(4848),t=i(8453);const o={title:"Column Visibility API",id:"column-visibility"},c=void 0,d={},a=[{value:"State",id:"state",level:2},{value:"Column Def Options",id:"column-def-options",level:2},{value:"<code>enableHiding</code>",id:"enablehiding",level:3},{value:"Column API",id:"column-api",level:2},{value:"<code>getCanHide</code>",id:"getcanhide",level:3},{value:"<code>getIsVisible</code>",id:"getisvisible",level:3},{value:"<code>toggleVisibility</code>",id:"togglevisibility",level:3},{value:"<code>getToggleVisibilityHandler</code>",id:"gettogglevisibilityhandler",level:3},{value:"Table Options",id:"table-options",level:2},{value:"<code>onColumnVisibilityChange</code>",id:"oncolumnvisibilitychange",level:3},{value:"<code>enableHiding</code>",id:"enablehiding-1",level:3},{value:"Table API",id:"table-api",level:2},{value:"<code>getVisibleFlatColumns</code>",id:"getvisibleflatcolumns",level:3},{value:"<code>getVisibleLeafColumns</code>",id:"getvisibleleafcolumns",level:3},{value:"<code>getLeftVisibleLeafColumns</code>",id:"getleftvisibleleafcolumns",level:3},{value:"<code>getRightVisibleLeafColumns</code>",id:"getrightvisibleleafcolumns",level:3},{value:"<code>getCenterVisibleLeafColumns</code>",id:"getcentervisibleleafcolumns",level:3},{value:"<code>setColumnVisibility</code>",id:"setcolumnvisibility",level:3},{value:"<code>resetColumnVisibility</code>",id:"resetcolumnvisibility",level:3},{value:"<code>toggleAllColumnsVisible</code>",id:"toggleallcolumnsvisible",level:3},{value:"<code>getIsAllColumnsVisible</code>",id:"getisallcolumnsvisible",level:3},{value:"<code>getIsSomeColumnsVisible</code>",id:"getissomecolumnsvisible",level:3},{value:"<code>getToggleAllColumnsVisibilityHandler</code>",id:"gettoggleallcolumnsvisibilityhandler",level:3},{value:"Row API",id:"row-api",level:2},{value:"<code>getVisibleCells</code>",id:"getvisiblecells",level:3}];function r(e){const l={code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(l.h2,{id:"state",children:"State"}),"\n",(0,s.jsx)(l.p,{children:"Column \uac00\uc2dc\uc131 \uc0c1\ud0dc\ub294 \ub2e4\uc74c\uacfc \uac19\uc740 \ud615\ud0dc\ub85c \ud14c\uc774\ube14\uc5d0 \uc800\uc7a5\ub429\ub2c8\ub2e4:"}),"\n",(0,s.jsx)(l.pre,{children:(0,s.jsx)(l.code,{className:"language-tsx",children:"export type VisibilityState = Record<string, boolean>\n\nexport type VisibilityTableState = {\n  columnVisibility: VisibilityState\n}\n"})}),"\n",(0,s.jsx)(l.h2,{id:"column-def-options",children:"Column Def Options"}),"\n",(0,s.jsx)(l.h3,{id:"enablehiding",children:(0,s.jsx)(l.code,{children:"enableHiding"})}),"\n",(0,s.jsx)(l.pre,{children:(0,s.jsx)(l.code,{className:"language-tsx",children:"enableHiding?: boolean\n"})}),"\n",(0,s.jsx)(l.p,{children:"column \uc228\uae30\uae30\ub97c \ud65c\uc131\ud654/\ube44\ud65c\uc131\ud654\ud569\ub2c8\ub2e4."}),"\n",(0,s.jsx)(l.h2,{id:"column-api",children:"Column API"}),"\n",(0,s.jsx)(l.h3,{id:"getcanhide",children:(0,s.jsx)(l.code,{children:"getCanHide"})}),"\n",(0,s.jsx)(l.pre,{children:(0,s.jsx)(l.code,{className:"language-tsx",children:"getCanHide: () => boolean\n"})}),"\n",(0,s.jsx)(l.p,{children:"column\uc744 \uc228\uae38 \uc218 \uc788\ub294\uc9c0 \uc5ec\ubd80\ub97c \ubc18\ud658\ud569\ub2c8\ub2e4."}),"\n",(0,s.jsx)(l.h3,{id:"getisvisible",children:(0,s.jsx)(l.code,{children:"getIsVisible"})}),"\n",(0,s.jsx)(l.pre,{children:(0,s.jsx)(l.code,{className:"language-tsx",children:"getIsVisible: () => boolean\n"})}),"\n",(0,s.jsx)(l.p,{children:"column\uc774 \ud45c\uc2dc\ub418\ub294\uc9c0 \uc5ec\ubd80\ub97c \ubc18\ud658\ud569\ub2c8\ub2e4."}),"\n",(0,s.jsx)(l.h3,{id:"togglevisibility",children:(0,s.jsx)(l.code,{children:"toggleVisibility"})}),"\n",(0,s.jsx)(l.pre,{children:(0,s.jsx)(l.code,{className:"language-tsx",children:"toggleVisibility: (value?: boolean) => void\n"})}),"\n",(0,s.jsx)(l.p,{children:"column \uac00\uc2dc\uc131\uc744 \ud1a0\uae00\ud569\ub2c8\ub2e4."}),"\n",(0,s.jsx)(l.h3,{id:"gettogglevisibilityhandler",children:(0,s.jsx)(l.code,{children:"getToggleVisibilityHandler"})}),"\n",(0,s.jsx)(l.pre,{children:(0,s.jsx)(l.code,{className:"language-tsx",children:"getToggleVisibilityHandler: () => (event: unknown) => void\n"})}),"\n",(0,s.jsx)(l.p,{children:"column \uac00\uc2dc\uc131\uc744 \ud1a0\uae00\ud558\ub294 \ub370 \uc0ac\uc6a9\ud560 \uc218 \uc788\ub294 \ud568\uc218\ub97c \ubc18\ud658\ud569\ub2c8\ub2e4. \uc774 \ud568\uc218\ub294 \uccb4\ud06c\ubc15\uc2a4\uc5d0 \uc774\ubca4\ud2b8 \ud578\ub4e4\ub7ec\ub97c \ubc14\uc778\ub529\ud558\ub294 \ub370 \uc0ac\uc6a9\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."}),"\n",(0,s.jsx)(l.h2,{id:"table-options",children:"Table Options"}),"\n",(0,s.jsx)(l.h3,{id:"oncolumnvisibilitychange",children:(0,s.jsx)(l.code,{children:"onColumnVisibilityChange"})}),"\n",(0,s.jsx)(l.pre,{children:(0,s.jsx)(l.code,{className:"language-tsx",children:"onColumnVisibilityChange?: OnChangeFn<VisibilityState>\n"})}),"\n",(0,s.jsxs)(l.p,{children:["\uc81c\uacf5\ub41c \uacbd\uc6b0, \uc774 \ud568\uc218\ub294 ",(0,s.jsx)(l.code,{children:"state.columnVisibility"}),"\uac00 \ubcc0\uacbd\ub420 \ub54c ",(0,s.jsx)(l.code,{children:"updaterFn"}),"\uacfc \ud568\uaed8 \ud638\ucd9c\ub429\ub2c8\ub2e4. \uc774\ub294 \uae30\ubcf8 \ub0b4\ubd80 \uc0c1\ud0dc \uad00\ub9ac\ub97c \uc7ac\uc815\uc758\ud558\ubbc0\ub85c \ud14c\uc774\ube14 \uc678\ubd80\uc5d0\uc11c \uc0c1\ud0dc \ubcc0\uacbd\uc744 \uc644\uc804\ud788 \ub610\ub294 \ubd80\ubd84\uc801\uc73c\ub85c \uc720\uc9c0\ud574\uc57c \ud569\ub2c8\ub2e4."]}),"\n",(0,s.jsx)(l.h3,{id:"enablehiding-1",children:(0,s.jsx)(l.code,{children:"enableHiding"})}),"\n",(0,s.jsx)(l.pre,{children:(0,s.jsx)(l.code,{className:"language-tsx",children:"enableHiding?: boolean\n"})}),"\n",(0,s.jsx)(l.p,{children:"column \uc228\uae30\uae30\ub97c \ud65c\uc131\ud654/\ube44\ud65c\uc131\ud654\ud569\ub2c8\ub2e4."}),"\n",(0,s.jsx)(l.h2,{id:"table-api",children:"Table API"}),"\n",(0,s.jsx)(l.h3,{id:"getvisibleflatcolumns",children:(0,s.jsx)(l.code,{children:"getVisibleFlatColumns"})}),"\n",(0,s.jsx)(l.pre,{children:(0,s.jsx)(l.code,{className:"language-tsx",children:"getVisibleFlatColumns: () => Column<TData>[]\n"})}),"\n",(0,s.jsx)(l.p,{children:"\ubd80\ubaa8 column\uc744 \ud3ec\ud568\ud558\uc5ec \ud45c\uc2dc\ub418\ub294 column\uc758 \ud3c9\uba74 \ubc30\uc5f4\uc744 \ubc18\ud658\ud569\ub2c8\ub2e4."}),"\n",(0,s.jsx)(l.h3,{id:"getvisibleleafcolumns",children:(0,s.jsx)(l.code,{children:"getVisibleLeafColumns"})}),"\n",(0,s.jsx)(l.pre,{children:(0,s.jsx)(l.code,{className:"language-tsx",children:"getVisibleLeafColumns: () => Column<TData>[]\n"})}),"\n",(0,s.jsx)(l.p,{children:"\ud45c\uc2dc\ub418\ub294 \ub9ac\ud504 \ub178\ub4dc column\uc758 \ud3c9\uba74 \ubc30\uc5f4\uc744 \ubc18\ud658\ud569\ub2c8\ub2e4."}),"\n",(0,s.jsx)(l.h3,{id:"getleftvisibleleafcolumns",children:(0,s.jsx)(l.code,{children:"getLeftVisibleLeafColumns"})}),"\n",(0,s.jsx)(l.pre,{children:(0,s.jsx)(l.code,{className:"language-tsx",children:"getLeftVisibleLeafColumns: () => Column<TData>[]\n"})}),"\n",(0,s.jsx)(l.p,{children:"column \uace0\uc815\uc744 \uc0ac\uc6a9\ud558\ub294 \uacbd\uc6b0, \ud14c\uc774\ube14\uc758 \uc67c\ucabd \ubd80\ubd84\uc5d0 \ud45c\uc2dc\ub418\ub294 \ub9ac\ud504 \ub178\ub4dc column\uc758 \ud3c9\uba74 \ubc30\uc5f4\uc744 \ubc18\ud658\ud569\ub2c8\ub2e4."}),"\n",(0,s.jsx)(l.h3,{id:"getrightvisibleleafcolumns",children:(0,s.jsx)(l.code,{children:"getRightVisibleLeafColumns"})}),"\n",(0,s.jsx)(l.pre,{children:(0,s.jsx)(l.code,{className:"language-tsx",children:"getRightVisibleLeafColumns: () => Column<TData>[]\n"})}),"\n",(0,s.jsx)(l.p,{children:"column \uace0\uc815\uc744 \uc0ac\uc6a9\ud558\ub294 \uacbd\uc6b0, \ud14c\uc774\ube14\uc758 \uc624\ub978\ucabd \ubd80\ubd84\uc5d0 \ud45c\uc2dc\ub418\ub294 \ub9ac\ud504 \ub178\ub4dc column\uc758 \ud3c9\uba74 \ubc30\uc5f4\uc744 \ubc18\ud658\ud569\ub2c8\ub2e4."}),"\n",(0,s.jsx)(l.h3,{id:"getcentervisibleleafcolumns",children:(0,s.jsx)(l.code,{children:"getCenterVisibleLeafColumns"})}),"\n",(0,s.jsx)(l.pre,{children:(0,s.jsx)(l.code,{className:"language-tsx",children:"getCenterVisibleLeafColumns: () => Column<TData>[]\n"})}),"\n",(0,s.jsx)(l.p,{children:"column \uace0\uc815\uc744 \uc0ac\uc6a9\ud558\ub294 \uacbd\uc6b0, \ud14c\uc774\ube14\uc758 \uace0\uc815\ub418\uc9c0 \uc54a\uc740/\uc911\uc559 \ubd80\ubd84\uc5d0 \ud45c\uc2dc\ub418\ub294 \ub9ac\ud504 \ub178\ub4dc column\uc758 \ud3c9\uba74 \ubc30\uc5f4\uc744 \ubc18\ud658\ud569\ub2c8\ub2e4."}),"\n",(0,s.jsx)(l.h3,{id:"setcolumnvisibility",children:(0,s.jsx)(l.code,{children:"setColumnVisibility"})}),"\n",(0,s.jsx)(l.pre,{children:(0,s.jsx)(l.code,{className:"language-tsx",children:"setColumnVisibility: (updater: Updater<VisibilityState>) => void\n"})}),"\n",(0,s.jsx)(l.p,{children:"\uc5c5\ub370\uc774\ud130 \ud568\uc218 \ub610\ub294 \uac12\uc744 \ud1b5\ud574 column \uac00\uc2dc\uc131 \uc0c1\ud0dc\ub97c \uc5c5\ub370\uc774\ud2b8\ud569\ub2c8\ub2e4."}),"\n",(0,s.jsx)(l.h3,{id:"resetcolumnvisibility",children:(0,s.jsx)(l.code,{children:"resetColumnVisibility"})}),"\n",(0,s.jsx)(l.pre,{children:(0,s.jsx)(l.code,{className:"language-tsx",children:"resetColumnVisibility: (defaultState?: boolean) => void\n"})}),"\n",(0,s.jsxs)(l.p,{children:["column \uac00\uc2dc\uc131 \uc0c1\ud0dc\ub97c \ucd08\uae30 \uc0c1\ud0dc\ub85c \uc7ac\uc124\uc815\ud569\ub2c8\ub2e4. ",(0,s.jsx)(l.code,{children:"defaultState"}),"\uac00 \uc81c\uacf5\ub418\uba74 \uc0c1\ud0dc\ub294 ",(0,s.jsx)(l.code,{children:"{}"}),"\ub85c \uc7ac\uc124\uc815\ub429\ub2c8\ub2e4."]}),"\n",(0,s.jsx)(l.h3,{id:"toggleallcolumnsvisible",children:(0,s.jsx)(l.code,{children:"toggleAllColumnsVisible"})}),"\n",(0,s.jsx)(l.pre,{children:(0,s.jsx)(l.code,{className:"language-tsx",children:"toggleAllColumnsVisible: (value?: boolean) => void\n"})}),"\n",(0,s.jsx)(l.p,{children:"\ubaa8\ub4e0 column\uc758 \uac00\uc2dc\uc131\uc744 \ud1a0\uae00\ud569\ub2c8\ub2e4."}),"\n",(0,s.jsx)(l.h3,{id:"getisallcolumnsvisible",children:(0,s.jsx)(l.code,{children:"getIsAllColumnsVisible"})}),"\n",(0,s.jsx)(l.pre,{children:(0,s.jsx)(l.code,{className:"language-tsx",children:"getIsAllColumnsVisible: () => boolean\n"})}),"\n",(0,s.jsx)(l.p,{children:"\ubaa8\ub4e0 column\uc774 \ud45c\uc2dc\ub418\ub294\uc9c0 \uc5ec\ubd80\ub97c \ubc18\ud658\ud569\ub2c8\ub2e4."}),"\n",(0,s.jsx)(l.h3,{id:"getissomecolumnsvisible",children:(0,s.jsx)(l.code,{children:"getIsSomeColumnsVisible"})}),"\n",(0,s.jsx)(l.pre,{children:(0,s.jsx)(l.code,{className:"language-tsx",children:"getIsSomeColumnsVisible: () => boolean\n"})}),"\n",(0,s.jsx)(l.p,{children:"\uc77c\ubd80 column\uc774 \ud45c\uc2dc\ub418\ub294\uc9c0 \uc5ec\ubd80\ub97c \ubc18\ud658\ud569\ub2c8\ub2e4."}),"\n",(0,s.jsx)(l.h3,{id:"gettoggleallcolumnsvisibilityhandler",children:(0,s.jsx)(l.code,{children:"getToggleAllColumnsVisibilityHandler"})}),"\n",(0,s.jsx)(l.pre,{children:(0,s.jsx)(l.code,{className:"language-tsx",children:"getToggleAllColumnsVisibilityHandler: () => ((event: unknown) => void)\n"})}),"\n",(0,s.jsxs)(l.p,{children:["\ubaa8\ub4e0 column\uc758 \uac00\uc2dc\uc131\uc744 \ud1a0\uae00\ud558\uae30 \uc704\ud55c \ud578\ub4e4\ub7ec\ub97c \ubc18\ud658\ud569\ub2c8\ub2e4. ",(0,s.jsx)(l.code,{children:"input[type=checkbox]"})," \uc694\uc18c\uc5d0 \ubc14\uc778\ub529\ud558\uae30 \uc704\ud55c \uac83\uc785\ub2c8\ub2e4."]}),"\n",(0,s.jsx)(l.h2,{id:"row-api",children:"Row API"}),"\n",(0,s.jsx)(l.h3,{id:"getvisiblecells",children:(0,s.jsx)(l.code,{children:"getVisibleCells"})}),"\n",(0,s.jsx)(l.pre,{children:(0,s.jsx)(l.code,{className:"language-tsx",children:"getVisibleCells: () => Cell<TData>[]\n"})}),"\n",(0,s.jsx)(l.p,{children:"row\uc5d0 \ub300\ud574 column \uac00\uc2dc\uc131\uc744 \uace0\ub824\ud55c \uc140 \ubc30\uc5f4\uc744 \ubc18\ud658\ud569\ub2c8\ub2e4."})]})}function u(e={}){const{wrapper:l}={...(0,t.R)(),...e.components};return l?(0,s.jsx)(l,{...e,children:(0,s.jsx)(r,{...e})}):r(e)}}}]);