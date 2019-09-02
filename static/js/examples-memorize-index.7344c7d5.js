(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"./examples/Memorize/index.mdx":function(e,n,t){"use strict";t.r(n),t.d(n,"default",function(){return g});var a=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),o=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),l=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"),r=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js"),d=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js"),c=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),u=t("./node_modules/react/index.js"),s=t.n(u),i=t("./node_modules/@mdx-js/react/dist/index.es.js"),m=t("./node_modules/docz/dist/index.esm.js"),b=t("../tablex/lib/index.js"),p=t.n(b),h=t("./node_modules/antd/es/input/index.js"),x={},j="wrapper";function g(e){var n=e.components,t=Object(c.a)(e,["components"]);return Object(i.b)(j,Object.assign({},x,t,{components:n,mdxType:"MDXLayout"}),Object(i.b)("h1",{id:"basic-usage"},"Basic Usage"),Object(i.b)("pre",null,Object(i.b)("code",Object.assign({parentName:"pre"},{className:"language-javascript"}),'import Table, { flatten, unflatten } from "tablex";\n')),Object(i.b)("h2",{id:"configurable--memorize"},"Configurable & Memorize"),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"Click the button on the bottom or column drop menu  to configure table , and then reload the page to check. The Configured data stored in localStorage.")),Object(i.b)(m.c,{__position:0,__code:"class Demo extends React.Component {\n    generateData(columns, count = 20, prefix = 'Row') {\n      return new Array(count).fill(0).map((row, rowIndex) => {\n        return columns.reduce(\n          (rowData, column, columnIndex) => {\n            if (column.dataIndex !== 'id') {\n              rowData[column.dataIndex] = Math.floor(Math.random() * 100 + 1)\n            } else {\n              rowData[column.dataIndex] =\n                prefix + ' ' + rowIndex + ' - Col ' + columnIndex\n            }\n            return rowData\n          },\n          {\n            id: prefix + rowIndex,\n            parentId: null,\n          },\n        )\n      })\n    }\n    constructor(props) {\n      super(props)\n      const columns = [\n        {\n          dataIndex: 'id',\n          title: 'id',\n          key: 'id',\n          width: 150,\n          align: 'center',\n        },\n        {\n          dataIndex: 'column-1',\n          key: 'column-1',\n          title: 'column-1',\n          width: 100,\n        },\n\n        {\n          dataIndex: 'column-2',\n          key: 'column-2',\n          title: 'column-2',\n          width: 150,\n          align: 'center',\n        },\n\n        {\n          dataIndex: 'column-3',\n          key: 'column-3',\n          title: 'column-3',\n          align: 'right',\n        },\n        {\n          dataIndex: 'column-4',\n          key: 'column-4',\n          title: 'column-4',\n          width: 100,\n          align: 'center',\n        },\n      ]\n\n      let data = this.generateData(columns, 20)\n\n      this.state = {\n        data: data,\n        columns: columns,\n      }\n    }\n    render() {\n      let { columns, data } = this.state\n      return (\n        <Table\n          rowKey=\"id\"\n          columns={columns}\n          data={data}\n          tableId=\"memorize_table\"\n          columnDropMenu={true}\n          settable={true}\n        />\n      )\n    }\n  }",__scope:{props:this?this.props:t,Playground:m.c,Props:m.d,Table:p.a,flatten:b.flatten,Input:h.a},style:{height:400},mdxType:"Playground"},function(e){function n(e){var t;Object(a.a)(this,n);var r=[{dataIndex:"id",title:"id",key:"id",width:150,align:"center"},{dataIndex:"column-1",key:"column-1",title:"column-1",width:100},{dataIndex:"column-2",key:"column-2",title:"column-2",width:150,align:"center"},{dataIndex:"column-3",key:"column-3",title:"column-3",align:"right"},{dataIndex:"column-4",key:"column-4",title:"column-4",width:100,align:"center"}],d=(t=Object(o.a)(this,Object(l.a)(n).call(this,e))).generateData(r,20);return t.state={data:d,columns:r},t}return Object(d.a)(n,e),Object(r.a)(n,[{key:"generateData",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Row";return new Array(n).fill(0).map(function(n,a){return e.reduce(function(e,n,o){return"id"!==n.dataIndex?e[n.dataIndex]=Math.floor(100*Math.random()+1):e[n.dataIndex]=t+" "+a+" - Col "+o,e},{id:t+a,parentId:null})})}}]),Object(r.a)(n,[{key:"render",value:function(){var e=this.state,n=e.columns,t=e.data;return Object(i.b)(p.a,{rowKey:"id",columns:n,data:t,tableId:"memorize_table",columnDropMenu:!0,settable:!0,mdxType:"Table"})}}]),n}(s.a.Component)))}g&&g===Object(g)&&Object.isExtensible(g)&&Object.defineProperty(g,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"examples\\Memorize\\index.mdx"}}),g.isMDXComponent=!0}}]);
//# sourceMappingURL=examples-memorize-index.d4e68511e30ea806362f.js.map