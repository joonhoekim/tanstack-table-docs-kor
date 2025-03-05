"use strict";(self.webpackChunktanstack_table_kor=self.webpackChunktanstack_table_kor||[]).push([[8324],{6011:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>r,contentTitle:()=>l,default:()=>u,frontMatter:()=>i,metadata:()=>a,toc:()=>c});const a=JSON.parse('{"id":"framework/svelte/guide/table-state","title":"Table State (Svelte) Guide","description":"Table State (Svelte) Guide","source":"@site/docs/framework/svelte/guide/table-state.md","sourceDirName":"framework/svelte/guide","slug":"/framework/svelte/guide/table-state","permalink":"/tanstack-table-docs-kor/framework/svelte/guide/table-state","draft":false,"unlisted":false,"editUrl":"https://github.com/joonhoekim/tanstack-table-docs-kor/tree/main/docs/framework/svelte/guide/table-state.md","tags":[],"version":"current","frontMatter":{"title":"Table State (Svelte) Guide"}}');var s=n(4848),o=n(8453);const i={title:"Table State (Svelte) Guide"},l=void 0,r={},c=[{value:"Table State (Svelte) Guide",id:"table-state-svelte-guide",level:2},{value:"Accessing Table State",id:"accessing-table-state",level:3},{value:"Custom Initial State",id:"custom-initial-state",level:3},{value:"Controlled State",id:"controlled-state",level:3},{value:"Individual Controlled State",id:"individual-controlled-state",level:4},{value:"Fully Controlled State",id:"fully-controlled-state",level:4},{value:"On State Change Callbacks",id:"on-state-change-callbacks",level:3},{value:"1. <strong>State Change Callbacks MUST have their corresponding state value in the <code>state</code> option</strong>.",id:"1-state-change-callbacks-must-have-their-corresponding-state-value-in-the-state-option",level:4},{value:"2. <strong>Updaters can either be raw values or callback functions</strong>.",id:"2-updaters-can-either-be-raw-values-or-callback-functions",level:4},{value:"State Types",id:"state-types",level:3}];function d(e){const t={blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",strong:"strong",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{id:"table-state-svelte-guide",children:"Table State (Svelte) Guide"}),"\n",(0,s.jsx)(t.p,{children:"TanStack Table has a simple underlying internal state management system to store and manage the state of the table. It also lets you selectively pull out any state that you need to manage in your own state management. This guide will walk you through the different ways in which you can interact with and manage the state of the table."}),"\n",(0,s.jsx)(t.h3,{id:"accessing-table-state",children:"Accessing Table State"}),"\n",(0,s.jsxs)(t.p,{children:["You do not need to set up anything special in order for the table state to work. If you pass nothing into either ",(0,s.jsx)(t.code,{children:"state"}),", ",(0,s.jsx)(t.code,{children:"initialState"}),", or any of the ",(0,s.jsx)(t.code,{children:"on[State]Change"})," table options, the table will manage its own state internally. You can access any part of this internal state by using the ",(0,s.jsx)(t.code,{children:"table.getState()"})," table instance API."]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-jsx",children:"const options = writable({\n  columns,\n  data,\n  //...\n})\n\nconst table = createSvelteTable(options)\n\nconsole.log(table.getState()) //access the entire internal state\nconsole.log(table.getState().rowSelection) //access just the row selection state\n"})}),"\n",(0,s.jsx)(t.h3,{id:"custom-initial-state",children:"Custom Initial State"}),"\n",(0,s.jsxs)(t.p,{children:["If all you need to do for certain states is customize their initial default values, you still do not need to manage any of the state yourself. You can simply set values in the ",(0,s.jsx)(t.code,{children:"initialState"})," option of the table instance."]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-jsx",children:"const options = writable({\n  columns,\n  data,\n  initialState: {\n    columnOrder: ['age', 'firstName', 'lastName'], //customize the initial column order\n    columnVisibility: {\n      id: false //hide the id column by default\n    },\n    expanded: true, //expand all rows by default\n    sorting: [\n      {\n        id: 'age',\n        desc: true //sort by age in descending order by default\n      }\n    ]\n  },\n  //...\n})\n\nconst table = createSvelteTable(options)\n"})}),"\n",(0,s.jsxs)(t.blockquote,{children:["\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"Note"}),": Only specify each particular state in either ",(0,s.jsx)(t.code,{children:"initialState"})," or ",(0,s.jsx)(t.code,{children:"state"}),", but not both. If you pass in a particular state value to both ",(0,s.jsx)(t.code,{children:"initialState"})," and ",(0,s.jsx)(t.code,{children:"state"}),", the initialized state in ",(0,s.jsx)(t.code,{children:"state"})," will take overwrite any corresponding value in ",(0,s.jsx)(t.code,{children:"initialState"}),"."]}),"\n"]}),"\n",(0,s.jsx)(t.h3,{id:"controlled-state",children:"Controlled State"}),"\n",(0,s.jsxs)(t.p,{children:["If you need easy access to the table state in other areas of your application, TanStack Table makes it easy to control and manage any or all of the table state in your own state management system. You can do this by passing in your own state and state management functions to the ",(0,s.jsx)(t.code,{children:"state"})," and ",(0,s.jsx)(t.code,{children:"on[State]Change"})," table options."]}),"\n",(0,s.jsx)(t.h4,{id:"individual-controlled-state",children:"Individual Controlled State"}),"\n",(0,s.jsx)(t.p,{children:"You can control just the state that you need easy access to. You do NOT have to control all of the table state if you do not need to. It is recommended to only control the state that you need on a case-by-case basis."}),"\n",(0,s.jsxs)(t.p,{children:["In order to control a particular state, you need to both pass in the corresponding ",(0,s.jsx)(t.code,{children:"state"})," value and the ",(0,s.jsx)(t.code,{children:"on[State]Change"})," function to the table instance."]}),"\n",(0,s.jsx)(t.p,{children:'Let\'s take filtering, sorting, and pagination as an example in a "manual" server-side data fetching scenario. You can store the filtering, sorting, and pagination state in your own state management, but leave out any other state like column order, column visibility, etc. if your API does not care about those values.'}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-ts",children:"let sorting = [\n  {\n    id: 'age',\n    desc: true, //sort by age in descending order by default\n  },\n]\nconst setSorting = updater => {\n  if (updater instanceof Function) {\n    sorting = updater(sorting)\n  } else {\n    sorting = updater\n  }\n  options.update(old => ({\n    ...old,\n    state: {\n      ...old.state,\n      sorting,\n    },\n  }))\n}\n\nlet columnFilters = [] //no default filters\nconst setColumnFilters = updater => {\n  if (updater instanceof Function) {\n    columnFilters = updater(columnFilters)\n  } else {\n    columnFilters = updater\n  }\n  options.update(old => ({\n    ...old,\n    state: {\n      ...old.state,\n      columnFilters,\n    },\n  }))\n}\n\nlet pagination = { pageIndex: 0, pageSize: 15 } //default pagination\nconst setPagination = updater => {\n  if (updater instanceof Function) {\n    pagination = updater(pagination)\n  } else {\n    pagination = updater\n  }\n  options.update(old => ({\n    ...old,\n    state: {\n      ...old.state,\n      pagination,\n    },\n  }))\n}\n\n//Use our controlled state values to fetch data\nconst tableQuery = createQuery({\n  queryKey: ['users', columnFilters, sorting, pagination],\n  queryFn: () => fetchUsers(columnFilters, sorting, pagination),\n  //...\n})\n\nconst options = writable({\n  columns,\n  data: tableQuery.data,\n  //...\n  state: {\n    columnFilters, //pass controlled state back to the table (overrides internal state)\n    sorting,\n    pagination\n  },\n  onColumnFiltersChange: setColumnFilters, //hoist columnFilters state into our own state management\n  onSortingChange: setSorting,\n  onPaginationChange: setPagination,\n})\n\nconst table = createSvelteTable(options)\n//...\n"})}),"\n",(0,s.jsx)(t.h4,{id:"fully-controlled-state",children:"Fully Controlled State"}),"\n",(0,s.jsxs)(t.p,{children:["Alternatively, you can control the entire table state with the ",(0,s.jsx)(t.code,{children:"onStateChange"})," table option. It will hoist out the entire table state into your own state management system. Be careful with this approach, as you might find that raising some frequently changing state values up a svelte tree, like ",(0,s.jsx)(t.code,{children:"columnSizingInfo"})," state`, might cause bad performance issues."]}),"\n",(0,s.jsxs)(t.p,{children:["A couple of more tricks may be needed to make this work. If you use the ",(0,s.jsx)(t.code,{children:"onStateChange"})," table option, the initial values of the ",(0,s.jsx)(t.code,{children:"state"})," must be populated with all of the relevant state values for all of the features that you want to use. You can either manually type out all of the initial state values, or use the ",(0,s.jsx)(t.code,{children:"table.setOptions"})," API in a special way as shown below."]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-jsx",children:"//create a table instance with default state values\nconst options = writable({\n  columns,\n  data,\n  //... Note: `state` values are NOT passed in yet\n})\nconst table = createSvelteTable(options)\n\nlet state = {\n  ...table.initialState, //populate the initial state with all of the default state values from the table instance\n  pagination: {\n    pageIndex: 0,\n    pageSize: 15 //optionally customize the initial pagination state.\n  }\n}\nconst setState = updater => {\n  if (updater instanceof Function) {\n    state = updater(state)\n  } else {\n    state = updater\n  }\n  options.update(old => ({\n    ...old,\n    state,\n  }))\n}\n\n//Use the table.setOptions API to merge our fully controlled state onto the table instance\ntable.setOptions(prev => ({\n  ...prev, //preserve any other options that we have set up above\n  state, //our fully controlled state overrides the internal state\n  onStateChange: setState //any state changes will be pushed up to our own state management\n}))\n"})}),"\n",(0,s.jsx)(t.h3,{id:"on-state-change-callbacks",children:"On State Change Callbacks"}),"\n",(0,s.jsxs)(t.p,{children:["So far, we have seen the ",(0,s.jsx)(t.code,{children:"on[State]Change"})," and ",(0,s.jsx)(t.code,{children:"onStateChange"}),' table options work to "hoist" the table state changes into our own state management. However, there are a few things about these using these options that you should be aware of.']}),"\n",(0,s.jsxs)(t.h4,{id:"1-state-change-callbacks-must-have-their-corresponding-state-value-in-the-state-option",children:["1. ",(0,s.jsxs)(t.strong,{children:["State Change Callbacks MUST have their corresponding state value in the ",(0,s.jsx)(t.code,{children:"state"})," option"]}),"."]}),"\n",(0,s.jsxs)(t.p,{children:["Specifying an ",(0,s.jsx)(t.code,{children:"on[State]Change"})," callback tells the table instance that this will be a controlled state. If you do not specify the corresponding ",(0,s.jsx)(t.code,{children:"state"}),' value, that state will be "frozen" with its initial value.']}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-ts",children:"let sorting = []\nconst setSorting = updater => {\n  if (updater instanceof Function) {\n    sorting = updater(sorting)\n  } else {\n    sorting = updater\n  }\n  options.update(old => ({\n    ...old,\n    state: {\n      ...old.state,\n      sorting,\n    },\n  }))\n}\n//...\nconst options = writable({\n  columns,\n  data,\n  //...\n  state: {\n    sorting, //required because we are using `onSortingChange`\n  },\n  onSortingChange: setSorting, //makes the `state.sorting` controlled\n})\nconst table = createSvelteTable(options)\n"})}),"\n",(0,s.jsxs)(t.h4,{id:"2-updaters-can-either-be-raw-values-or-callback-functions",children:["2. ",(0,s.jsx)(t.strong,{children:"Updaters can either be raw values or callback functions"}),"."]}),"\n",(0,s.jsxs)(t.p,{children:["The ",(0,s.jsx)(t.code,{children:"on[State]Change"})," and ",(0,s.jsx)(t.code,{children:"onStateChange"})," callbacks work exactly like the ",(0,s.jsx)(t.code,{children:"setState"})," functions in React. The updater values can either be a new state value or a callback function that takes the previous state value and returns the new state value."]}),"\n",(0,s.jsxs)(t.p,{children:["What implications does this have? It means that if you want to add in some extra logic in any of the ",(0,s.jsx)(t.code,{children:"on[State]Change"})," callbacks, you can do so, but you need to check whether or not the new incoming updater value is a function or value."]}),"\n",(0,s.jsxs)(t.p,{children:["This is why you see the ",(0,s.jsx)(t.code,{children:"if (updater instanceof Function)"})," check in the ",(0,s.jsx)(t.code,{children:"setState"})," functions in the examples above."]}),"\n",(0,s.jsx)(t.h3,{id:"state-types",children:"State Types"}),"\n",(0,s.jsx)(t.p,{children:"All complex states in TanStack Table have their own TypeScript types that you can import and use. This can be handy for ensuring that you are using the correct data structures and properties for the state values that you are controlling."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-ts",children:"import { createSvelteTable, type SortingState, type Updater } from '@tanstack/svelte-table'\n//...\nlet sorting: SortingState[] = [\n  {\n    id: 'age', //you should get autocomplete for the `id` and `desc` properties\n    desc: true,\n  }\n]\nconst setSorting = (updater: Updater<SortingState>)  => {\n  if (updater instanceof Function) {\n    sorting = updater(sorting)\n  } else {\n    sorting = updater\n  }\n  options.update(old => ({\n    ...old,\n    state: {\n      ...old.state,\n      sorting,\n    },\n  }))\n}\n"})})]})}function u(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>l});var a=n(6540);const s={},o=a.createContext(s);function i(e){const t=a.useContext(o);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),a.createElement(o.Provider,{value:t},e.children)}}}]);