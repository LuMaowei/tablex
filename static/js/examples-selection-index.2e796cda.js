(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"./examples/Selection/index.mdx":function(n,e,t){"use strict";t.r(e),t.d(e,"default",function(){return I});var a=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),l=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),o=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"),d=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js"),c=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js"),r=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),u=t("./node_modules/react/index.js"),i=t.n(u),m=t("./node_modules/@mdx-js/react/dist/index.es.js"),s=t("./node_modules/docz/dist/index.esm.js"),h=t("../tablex/lib/index.js"),p=t.n(h),x=t("./node_modules/antd/es/input/index.js"),b=t("./node_modules/antd/es/checkbox/index.js"),w={},g="wrapper";function I(n){var e=n.components,t=Object(r.a)(n,["components"]);return Object(m.b)(g,Object.assign({},w,t,{components:e,mdxType:"MDXLayout"}),Object(m.b)("h1",{id:"usage"},"Usage"),Object(m.b)("pre",null,Object(m.b)("code",Object.assign({parentName:"pre"},{className:"language-javascript"}),'import Table, { flatten, unflatten } from "tablex";\n')),Object(m.b)("h2",{id:"none-select"},"None Select"),Object(m.b)(s.c,{__position:0,__code:"class Demo extends React.Component {\n    generateData(columns, count = 20, prefix = 'Row') {\n      return new Array(count).fill(0).map((row, rowIndex) => {\n        return columns.reduce(\n          (rowData, column, columnIndex) => {\n            if (column.dataIndex !== 'id') {\n              rowData[column.dataIndex] = Math.floor(Math.random() * 100 + 1)\n            } else {\n              rowData[column.dataIndex] =\n                prefix + ' ' + rowIndex + ' - Col ' + columnIndex\n            }\n            return rowData\n          },\n          {\n            id: prefix + rowIndex,\n            parentId: null,\n          },\n        )\n      })\n    }\n    constructor(props) {\n      super(props)\n      const columns = [\n        {\n          dataIndex: 'id',\n          title: 'id',\n          key: 'id',\n          width: 150,\n          align: 'center',\n        },\n        {\n          dataIndex: 'column-1',\n          key: 'column-1',\n          title: 'column-1',\n          width: 100,\n        },\n\n        {\n          dataIndex: 'column-2',\n          key: 'column-2',\n          title: 'column-2',\n          width: 150,\n          align: 'center',\n        },\n\n        {\n          dataIndex: 'column-3',\n          key: 'column-3',\n          title: 'column-3',\n          align: 'right',\n        },\n        {\n          dataIndex: 'column-4',\n          key: 'column-4',\n          title: 'column-4',\n          width: 100,\n          align: 'center',\n        },\n      ]\n\n      let data = this.generateData(columns, 20)\n\n      this.state = {\n        data: data,\n        columns: columns,\n      }\n    }\n    render() {\n      let { columns, data } = this.state\n      return (\n        <Table\n          rowKey=\"id\"\n          columns={columns}\n          data={data}\n          selectMode=\"none\"\n          orderNumber={false}\n        />\n      )\n    }\n  }",__scope:{props:this?this.props:t,Playground:s.c,Props:s.d,Table:p.a,flatten:h.flatten,Input:x.a,Checkbox:b.a},style:{height:400},mdxType:"Playground"},function(n){function e(n){var t;Object(a.a)(this,e);var d=[{dataIndex:"id",title:"id",key:"id",width:150,align:"center"},{dataIndex:"column-1",key:"column-1",title:"column-1",width:100},{dataIndex:"column-2",key:"column-2",title:"column-2",width:150,align:"center"},{dataIndex:"column-3",key:"column-3",title:"column-3",align:"right"},{dataIndex:"column-4",key:"column-4",title:"column-4",width:100,align:"center"}],c=(t=Object(l.a)(this,Object(o.a)(e).call(this,n))).generateData(d,20);return t.state={data:c,columns:d},t}return Object(c.a)(e,n),Object(d.a)(e,[{key:"generateData",value:function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Row";return new Array(e).fill(0).map(function(e,a){return n.reduce(function(n,e,l){return"id"!==e.dataIndex?n[e.dataIndex]=Math.floor(100*Math.random()+1):n[e.dataIndex]=t+" "+a+" - Col "+l,n},{id:t+a,parentId:null})})}}]),Object(d.a)(e,[{key:"render",value:function(){var n=this.state,e=n.columns,t=n.data;return Object(m.b)(p.a,{rowKey:"id",columns:e,data:t,selectMode:"none",orderNumber:!1,mdxType:"Table"})}}]),e}(i.a.Component)),Object(m.b)("h2",{id:"single-select"},"Single Select"),Object(m.b)(s.c,{__position:1,__code:"class Demo extends React.Component {\n    generateData(columns, count = 20, prefix = 'Row') {\n      return new Array(count).fill(0).map((row, rowIndex) => {\n        return columns.reduce(\n          (rowData, column, columnIndex) => {\n            if (column.dataIndex !== 'id') {\n              rowData[column.dataIndex] = Math.floor(Math.random() * 100 + 1)\n            } else {\n              rowData[column.dataIndex] =\n                prefix + ' ' + rowIndex + ' - Col ' + columnIndex\n            }\n            return rowData\n          },\n          {\n            id: prefix + rowIndex,\n            parentId: null,\n          },\n        )\n      })\n    }\n    constructor(props) {\n      super(props)\n      const columns = [\n        {\n          dataIndex: 'id',\n          title: 'id',\n          key: 'id',\n          width: 150,\n          align: 'center',\n        },\n        {\n          dataIndex: 'column-1',\n          key: 'column-1',\n          title: 'column-1',\n          width: 100,\n        },\n\n        {\n          dataIndex: 'column-2',\n          key: 'column-2',\n          title: 'column-2',\n          width: 150,\n          align: 'center',\n        },\n\n        {\n          dataIndex: 'column-3',\n          key: 'column-3',\n          title: 'column-3',\n          align: 'right',\n        },\n        {\n          dataIndex: 'column-4',\n          key: 'column-4',\n          title: 'column-4',\n          width: 100,\n          align: 'center',\n        },\n      ]\n\n      let data = this.generateData(columns, 20)\n\n      this.state = {\n        data: data,\n        columns: columns,\n      }\n    }\n    render() {\n      let { columns, data } = this.state\n      return (\n        <Table\n          rowKey=\"id\"\n          columns={columns}\n          data={data}\n          selectMode=\"single\"\n          orderNumber={false}\n        />\n      )\n    }\n  }",__scope:{props:this?this.props:t,Playground:s.c,Props:s.d,Table:p.a,flatten:h.flatten,Input:x.a,Checkbox:b.a},style:{height:400},mdxType:"Playground"},function(n){function e(n){var t;Object(a.a)(this,e);var d=[{dataIndex:"id",title:"id",key:"id",width:150,align:"center"},{dataIndex:"column-1",key:"column-1",title:"column-1",width:100},{dataIndex:"column-2",key:"column-2",title:"column-2",width:150,align:"center"},{dataIndex:"column-3",key:"column-3",title:"column-3",align:"right"},{dataIndex:"column-4",key:"column-4",title:"column-4",width:100,align:"center"}],c=(t=Object(l.a)(this,Object(o.a)(e).call(this,n))).generateData(d,20);return t.state={data:c,columns:d},t}return Object(c.a)(e,n),Object(d.a)(e,[{key:"generateData",value:function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Row";return new Array(e).fill(0).map(function(e,a){return n.reduce(function(n,e,l){return"id"!==e.dataIndex?n[e.dataIndex]=Math.floor(100*Math.random()+1):n[e.dataIndex]=t+" "+a+" - Col "+l,n},{id:t+a,parentId:null})})}}]),Object(d.a)(e,[{key:"render",value:function(){var n=this.state,e=n.columns,t=n.data;return Object(m.b)(p.a,{rowKey:"id",columns:e,data:t,selectMode:"single",orderNumber:!1,mdxType:"Table"})}}]),e}(i.a.Component)),Object(m.b)("h2",{id:"mutiple-select"},"Mutiple Select"),Object(m.b)(s.c,{__position:2,__code:"class Demo extends React.Component {\n    generateData(columns, count = 20, prefix = 'Row') {\n      return new Array(count).fill(0).map((row, rowIndex) => {\n        return columns.reduce(\n          (rowData, column, columnIndex) => {\n            if (column.dataIndex !== 'id') {\n              rowData[column.dataIndex] = Math.floor(Math.random() * 100 + 1)\n            } else {\n              rowData[column.dataIndex] =\n                prefix + ' ' + rowIndex + ' - Col ' + columnIndex\n            }\n            return rowData\n          },\n          {\n            id: prefix + rowIndex,\n            parentId: null,\n          },\n        )\n      })\n    }\n    constructor(props) {\n      super(props)\n      const columns = [\n        {\n          dataIndex: 'id',\n          title: 'id',\n          key: 'id',\n          width: 150,\n          align: 'center',\n        },\n        {\n          dataIndex: 'column-1',\n          key: 'column-1',\n          title: 'column-1',\n          width: 100,\n        },\n\n        {\n          dataIndex: 'column-2',\n          key: 'column-2',\n          title: 'column-2',\n          width: 150,\n          align: 'center',\n        },\n\n        {\n          dataIndex: 'column-3',\n          key: 'column-3',\n          title: 'column-3',\n          align: 'right',\n        },\n        {\n          dataIndex: 'column-4',\n          key: 'column-4',\n          title: 'column-4',\n          width: 100,\n          align: 'center',\n        },\n      ]\n\n      let data = this.generateData(columns, 20)\n\n      this.state = {\n        data: data,\n        columns: columns,\n      }\n    }\n    render() {\n      let { columns, data } = this.state\n      return (\n        <Table\n          rowKey=\"id\"\n          columns={columns}\n          data={data}\n          selectMode=\"multiple\"\n          orderNumber={false}\n          selectOnRowClick={false}\n        />\n      )\n    }\n  }",__scope:{props:this?this.props:t,Playground:s.c,Props:s.d,Table:p.a,flatten:h.flatten,Input:x.a,Checkbox:b.a},style:{height:400},mdxType:"Playground"},function(n){function e(n){var t;Object(a.a)(this,e);var d=[{dataIndex:"id",title:"id",key:"id",width:150,align:"center"},{dataIndex:"column-1",key:"column-1",title:"column-1",width:100},{dataIndex:"column-2",key:"column-2",title:"column-2",width:150,align:"center"},{dataIndex:"column-3",key:"column-3",title:"column-3",align:"right"},{dataIndex:"column-4",key:"column-4",title:"column-4",width:100,align:"center"}],c=(t=Object(l.a)(this,Object(o.a)(e).call(this,n))).generateData(d,20);return t.state={data:c,columns:d},t}return Object(c.a)(e,n),Object(d.a)(e,[{key:"generateData",value:function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Row";return new Array(e).fill(0).map(function(e,a){return n.reduce(function(n,e,l){return"id"!==e.dataIndex?n[e.dataIndex]=Math.floor(100*Math.random()+1):n[e.dataIndex]=t+" "+a+" - Col "+l,n},{id:t+a,parentId:null})})}}]),Object(d.a)(e,[{key:"render",value:function(){var n=this.state,e=n.columns,t=n.data;return Object(m.b)(p.a,{rowKey:"id",columns:e,data:t,selectMode:"multiple",orderNumber:!1,selectOnRowClick:!1,mdxType:"Table"})}}]),e}(i.a.Component)),Object(m.b)("h2",{id:"disabledselectkeys"},"disabledSelectKeys"),Object(m.b)(s.c,{__position:3,__code:"class Demo extends React.Component {\n    generateData(columns, count = 20, prefix = 'Row') {\n      return new Array(count).fill(0).map((row, rowIndex) => {\n        return columns.reduce(\n          (rowData, column, columnIndex) => {\n            if (column.dataIndex !== 'id') {\n              rowData[column.dataIndex] = Math.floor(Math.random() * 100 + 1)\n            } else {\n              rowData[column.dataIndex] =\n                prefix + '' + rowIndex + '-Col' + columnIndex\n            }\n            return rowData\n          },\n          {\n            id: prefix + rowIndex,\n            parentId: null,\n          },\n        )\n      })\n    }\n    constructor(props) {\n      super(props)\n      const columns = [\n        {\n          dataIndex: 'id',\n          title: 'id',\n          key: 'id',\n          width: 150,\n          align: 'center',\n        },\n        {\n          dataIndex: 'column-1',\n          key: 'column-1',\n          title: 'column-1',\n          width: 100,\n        },\n\n        {\n          dataIndex: 'column-2',\n          key: 'column-2',\n          title: 'column-2',\n          width: 150,\n          align: 'center',\n        },\n\n        {\n          dataIndex: 'column-3',\n          key: 'column-3',\n          title: 'column-3',\n          align: 'right',\n        },\n        {\n          dataIndex: 'column-4',\n          key: 'column-4',\n          title: 'column-4',\n          width: 100,\n          align: 'center',\n        },\n      ]\n\n      let data = this.generateData(columns, 50)\n\n      this.state = {\n        data: data,\n        columns: columns,\n      }\n    }\n    render() {\n      let { columns, data, current, pageSize, total } = this.state\n      return (\n        <Table\n          rowKey=\"id\"\n          columns={columns}\n          data={data}\n          selectMode=\"multiple\"\n          disabledSelectKeys={[\n            'Row0-Col0',\n            'Row1-Col0',\n            'Row2-Col0',\n            'Row3-Col0',\n            'Row4-Col0',\n          ]}\n        />\n      )\n    }\n  }",__scope:{props:this?this.props:t,Playground:s.c,Props:s.d,Table:p.a,flatten:h.flatten,Input:x.a,Checkbox:b.a},style:{height:400},mdxType:"Playground"},function(n){function e(n){var t;Object(a.a)(this,e);var d=[{dataIndex:"id",title:"id",key:"id",width:150,align:"center"},{dataIndex:"column-1",key:"column-1",title:"column-1",width:100},{dataIndex:"column-2",key:"column-2",title:"column-2",width:150,align:"center"},{dataIndex:"column-3",key:"column-3",title:"column-3",align:"right"},{dataIndex:"column-4",key:"column-4",title:"column-4",width:100,align:"center"}],c=(t=Object(l.a)(this,Object(o.a)(e).call(this,n))).generateData(d,50);return t.state={data:c,columns:d},t}return Object(c.a)(e,n),Object(d.a)(e,[{key:"generateData",value:function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Row";return new Array(e).fill(0).map(function(e,a){return n.reduce(function(n,e,l){return"id"!==e.dataIndex?n[e.dataIndex]=Math.floor(100*Math.random()+1):n[e.dataIndex]=t+""+a+"-Col"+l,n},{id:t+a,parentId:null})})}}]),Object(d.a)(e,[{key:"render",value:function(){var n=this.state,e=n.columns,t=n.data;n.current,n.pageSize,n.total;return Object(m.b)(p.a,{rowKey:"id",columns:e,data:t,selectMode:"multiple",disabledSelectKeys:["Row0-Col0","Row1-Col0","Row2-Col0","Row3-Col0","Row4-Col0"],mdxType:"Table"})}}]),e}(i.a.Component)),Object(m.b)("h2",{id:"checkstrictly"},"checkStrictly"),Object(m.b)(s.c,{__position:4,__code:"class Demo extends React.Component {\n    generateData(columns, count = 20, prefix = 'Row') {\n      return new Array(count).fill(0).map((row, rowIndex) => {\n        return columns.reduce(\n          (rowData, column, columnIndex) => {\n            if (column.dataIndex !== 'id') {\n              rowData[column.dataIndex] = Math.floor(Math.random() * 100 + 1)\n            } else {\n              rowData[column.dataIndex] =\n                prefix + ' ' + rowIndex + ' - Col ' + columnIndex\n            }\n\n            return rowData\n          },\n          {\n            id: prefix + rowIndex,\n            parentId: null,\n          },\n        )\n      })\n    }\n    constructor(props) {\n      super(props)\n      const columns = [\n        {\n          dataIndex: 'id',\n          title: 'id',\n          key: 'id',\n          width: 150,\n        },\n        {\n          dataIndex: 'column-1',\n          key: 'column-1',\n          title: 'column-1',\n          width: 100,\n        },\n\n        {\n          dataIndex: 'column-2',\n          key: 'column-2',\n          title: 'column-2',\n          width: 150,\n          align: 'center',\n        },\n\n        {\n          dataIndex: 'column-3',\n          key: 'column-3',\n          title: 'column-3',\n          align: 'right',\n        },\n        {\n          dataIndex: 'column-4',\n          key: 'column-4',\n          title: 'column-4',\n          width: 100,\n          align: 'center',\n        },\n      ]\n\n      let data = this.generateData(columns, 20)\n\n      data[0].children = this.generateData(columns, 5, 'Row-0-children-')\n      data[0].children[0].children = this.generateData(\n        columns,\n        5,\n        'Row-0-children-0-',\n      )\n\n      data[3].children = this.generateData(columns, 5, 'Row-3-children-')\n      data[3].children[0].children = this.generateData(\n        columns,\n        5,\n        'Row-3-children-0-',\n      )\n\n      this.state = {\n        data: data,\n        columns: columns,\n      }\n    }\n    render() {\n      let { columns, data } = this.state\n      return (\n        <Table\n          rowKey=\"id\"\n          columns={columns}\n          data={data}\n          selectMode=\"multiple\"\n          orderNumber={false}\n          checkStrictly={true}\n        />\n      )\n    }\n  }",__scope:{props:this?this.props:t,Playground:s.c,Props:s.d,Table:p.a,flatten:h.flatten,Input:x.a,Checkbox:b.a},style:{height:400},mdxType:"Playground"},function(n){function e(n){var t;Object(a.a)(this,e);var d=[{dataIndex:"id",title:"id",key:"id",width:150},{dataIndex:"column-1",key:"column-1",title:"column-1",width:100},{dataIndex:"column-2",key:"column-2",title:"column-2",width:150,align:"center"},{dataIndex:"column-3",key:"column-3",title:"column-3",align:"right"},{dataIndex:"column-4",key:"column-4",title:"column-4",width:100,align:"center"}],c=(t=Object(l.a)(this,Object(o.a)(e).call(this,n))).generateData(d,20);return c[0].children=t.generateData(d,5,"Row-0-children-"),c[0].children[0].children=t.generateData(d,5,"Row-0-children-0-"),c[3].children=t.generateData(d,5,"Row-3-children-"),c[3].children[0].children=t.generateData(d,5,"Row-3-children-0-"),t.state={data:c,columns:d},t}return Object(c.a)(e,n),Object(d.a)(e,[{key:"generateData",value:function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Row";return new Array(e).fill(0).map(function(e,a){return n.reduce(function(n,e,l){return"id"!==e.dataIndex?n[e.dataIndex]=Math.floor(100*Math.random()+1):n[e.dataIndex]=t+" "+a+" - Col "+l,n},{id:t+a,parentId:null})})}}]),Object(d.a)(e,[{key:"render",value:function(){var n=this.state,e=n.columns,t=n.data;return Object(m.b)(p.a,{rowKey:"id",columns:e,data:t,selectMode:"multiple",orderNumber:!1,checkStrictly:!0,mdxType:"Table"})}}]),e}(i.a.Component)),Object(m.b)("h2",{id:"selectioncolumn"},"selectionColumn"),Object(m.b)(s.c,{__position:5,__code:"class Demo extends React.Component {\n    generateData(columns, count = 20, prefix = 'Row') {\n      return new Array(count).fill(0).map((row, rowIndex) => {\n        return columns.reduce(\n          (rowData, column, columnIndex) => {\n            if (column.dataIndex !== 'id') {\n              rowData[column.dataIndex] = Math.floor(Math.random() * 100 + 1)\n            } else {\n              rowData[column.dataIndex] =\n                prefix + ' ' + rowIndex + ' - Col ' + columnIndex\n            }\n\n            return rowData\n          },\n          {\n            id: prefix + rowIndex,\n            parentId: null,\n          },\n        )\n      })\n    }\n    constructor(props) {\n      super(props)\n      const columns = [\n        {\n          dataIndex: 'id',\n          title: 'id',\n          key: 'id',\n          width: 150,\n        },\n        {\n          dataIndex: 'column-1',\n          key: 'column-1',\n          title: 'column-1',\n          width: 100,\n        },\n\n        {\n          dataIndex: 'column-2',\n          key: 'column-2',\n          title: 'column-2',\n          width: 150,\n          align: 'center',\n        },\n\n        {\n          dataIndex: 'column-3',\n          key: 'column-3',\n          title: 'column-3',\n          align: 'right',\n        },\n        {\n          dataIndex: 'column-4',\n          key: 'column-4',\n          title: 'column-4',\n          width: 100,\n          align: 'center',\n        },\n      ]\n\n      let data = this.generateData(columns, 20)\n\n      this.state = {\n        data: data,\n        columns: columns,\n      }\n    }\n    render() {\n      let { columns, data } = this.state\n      return (\n        <Table\n          rowKey=\"id\"\n          columns={columns}\n          data={data}\n          selectMode=\"multiple\"\n          orderNumber={false}\n          selectionColumn={{\n            fixed: 'left',\n            title: attrs => {\n              return (\n                <Checkbox\n                  {...attrs}\n                  disabled={true}\n                  onChange={e => {\n                    attrs.onChange(e.target.checked)\n                  }}\n                />\n              )\n            },\n            render: (row, index, extra) => {\n              return (\n                <Checkbox\n                  {...extra}\n                  onChange={e => {\n                    extra.onChange(e.target.checked)\n                  }}\n                />\n              )\n            },\n          }}\n        />\n      )\n    }\n  }",__scope:{props:this?this.props:t,Playground:s.c,Props:s.d,Table:p.a,flatten:h.flatten,Input:x.a,Checkbox:b.a},style:{height:400},mdxType:"Playground"},function(n){function e(n){var t;Object(a.a)(this,e);var d=[{dataIndex:"id",title:"id",key:"id",width:150},{dataIndex:"column-1",key:"column-1",title:"column-1",width:100},{dataIndex:"column-2",key:"column-2",title:"column-2",width:150,align:"center"},{dataIndex:"column-3",key:"column-3",title:"column-3",align:"right"},{dataIndex:"column-4",key:"column-4",title:"column-4",width:100,align:"center"}],c=(t=Object(l.a)(this,Object(o.a)(e).call(this,n))).generateData(d,20);return t.state={data:c,columns:d},t}return Object(c.a)(e,n),Object(d.a)(e,[{key:"generateData",value:function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Row";return new Array(e).fill(0).map(function(e,a){return n.reduce(function(n,e,l){return"id"!==e.dataIndex?n[e.dataIndex]=Math.floor(100*Math.random()+1):n[e.dataIndex]=t+" "+a+" - Col "+l,n},{id:t+a,parentId:null})})}}]),Object(d.a)(e,[{key:"render",value:function(){var n=this.state,e=n.columns,t=n.data;return Object(m.b)(p.a,{rowKey:"id",columns:e,data:t,selectMode:"multiple",orderNumber:!1,selectionColumn:{fixed:"left",title:function(n){return Object(m.b)(b.a,Object.assign({},n,{disabled:!0,onChange:function(e){n.onChange(e.target.checked)},mdxType:"Checkbox"}))},render:function(n,e,t){return Object(m.b)(b.a,Object.assign({},t,{onChange:function(n){t.onChange(n.target.checked)},mdxType:"Checkbox"}))}},mdxType:"Table"})}}]),e}(i.a.Component)))}I&&I===Object(I)&&Object.isExtensible(I)&&Object.defineProperty(I,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"examples\\Selection\\index.mdx"}}),I.isMDXComponent=!0}}]);
//# sourceMappingURL=examples-selection-index.84108c276020e00c2fb5.js.map