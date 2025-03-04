"use strict";(self.webpackChunktanstack_table_kor=self.webpackChunktanstack_table_kor||[]).push([[8372],{7629:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>u,frontMatter:()=>a,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"framework/vue/vue-table","title":"Vue Table","description":"@tanstack/vue-table \uc5b4\ub311\ud130\ub294 \ud575\uc2ec \ud14c\uc774\ube14 \ub85c\uc9c1\uc744 \uac10\uc2f8\ub294 \ub798\ud37c\uc785\ub2c8\ub2e4. \uc8fc\uc694 \uc5ed\ud560\uc740 \\"vue\\" \ubc29\uc2dd\uc73c\ub85c \uc0c1\ud0dc\ub97c \uad00\ub9ac\ud558\uace0, \ud0c0\uc785\uc744 \uc81c\uacf5\ud558\uba70, cell/header/footer \ud15c\ud50c\ub9bf\uc758 \ub80c\ub354\ub9c1 \uad6c\ud604\uc744 \uc81c\uacf5\ud558\ub294 \uac83\uc785\ub2c8\ub2e4.","source":"@site/docs/framework/vue/vue-table.md","sourceDirName":"framework/vue","slug":"/framework/vue/vue-table","permalink":"/tanstack-table-docs-kor/framework/vue/vue-table","draft":false,"unlisted":false,"editUrl":"https://github.com/joonhoekim/tanstack-table-docs-kor/tree/main/docs/framework/vue/vue-table.md","tags":[],"version":"current","frontMatter":{"title":"Vue Table"},"sidebar":"tutorialSidebar","previous":{"title":"Table State (Vue) Guide","permalink":"/tanstack-table-docs-kor/framework/vue/guide/table-state"},"next":{"title":"\uc140 \uac00\uc774\ub4dc","permalink":"/tanstack-table-docs-kor/guide/cells"}}');var l=n(4848),o=n(8453);const a={title:"Vue Table"},s=void 0,c={},d=[{value:"Exports",id:"exports",level:2},{value:"<code>useVueTable</code>",id:"usevuetable",level:3},{value:"<code>FlexRender</code>",id:"flexrender",level:3}];function i(e){const t={code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.code,{children:"@tanstack/vue-table"}),' \uc5b4\ub311\ud130\ub294 \ud575\uc2ec \ud14c\uc774\ube14 \ub85c\uc9c1\uc744 \uac10\uc2f8\ub294 \ub798\ud37c\uc785\ub2c8\ub2e4. \uc8fc\uc694 \uc5ed\ud560\uc740 "vue" \ubc29\uc2dd\uc73c\ub85c \uc0c1\ud0dc\ub97c \uad00\ub9ac\ud558\uace0, \ud0c0\uc785\uc744 \uc81c\uacf5\ud558\uba70, cell/header/footer \ud15c\ud50c\ub9bf\uc758 \ub80c\ub354\ub9c1 \uad6c\ud604\uc744 \uc81c\uacf5\ud558\ub294 \uac83\uc785\ub2c8\ub2e4.']}),"\n",(0,l.jsx)(t.h2,{id:"exports",children:"Exports"}),"\n",(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.code,{children:"@tanstack/vue-table"}),"\uc740 ",(0,l.jsx)(t.code,{children:"@tanstack/table-core"}),"\uc758 \ubaa8\ub4e0 API\uc640 \ub2e4\uc74c\uc744 \ub2e4\uc2dc \ub0b4\ubcf4\ub0c5\ub2c8\ub2e4:"]}),"\n",(0,l.jsx)(t.h3,{id:"usevuetable",children:(0,l.jsx)(t.code,{children:"useVueTable"})}),"\n",(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.code,{children:"options"})," \uac1d\uccb4\ub97c \ubc1b\uc544 \ud14c\uc774\ube14\uc744 \ubc18\ud658\ud569\ub2c8\ub2e4."]}),"\n",(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-ts",children:"import { useVueTable } from '@tanstack/vue-table'\n\nconst table = useVueTable(options)\n// ...\ud14c\uc774\ube14 \ub80c\ub354\ub9c1\n\n"})}),"\n",(0,l.jsx)(t.h3,{id:"flexrender",children:(0,l.jsx)(t.code,{children:"FlexRender"})}),"\n",(0,l.jsx)(t.p,{children:"\ub3d9\uc801 \uac12\uc73c\ub85c cell/header/footer \ud15c\ud50c\ub9bf\uc744 \ub80c\ub354\ub9c1\ud558\uae30 \uc704\ud55c Vue \ucef4\ud3ec\ub10c\ud2b8\uc785\ub2c8\ub2e4."}),"\n",(0,l.jsx)(t.p,{children:"\uc608\uc2dc:"}),"\n",(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-vue",children:'import { FlexRender } from \'@tanstack/vue-table\'\n\n<template>\n  <tbody>\n    <tr v-for="row in table.getRowModel().rows" :key="row.id">\n      <td v-for="cell in row.getVisibleCells()" :key="cell.id">\n        <FlexRender\n          :render="cell.column.columnDef.cell"\n          :props="cell.getContext()"\n        />\n      </td>\n    </tr>\n  </tbody>\n</template>\n'})})]})}function u(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(i,{...e})}):i(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>s});var r=n(6540);const l={},o=r.createContext(l);function a(e){const t=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:a(e.components),r.createElement(o.Provider,{value:t},e.children)}}}]);