(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"./doc/Memorize/index.mdx":function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return w}));var a=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),o=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),l=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"),d=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js"),r=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js"),c=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),u=t("./node_modules/react/index.js"),s=t.n(u),i=t("./node_modules/@mdx-js/react/dist/index.es.js"),m=t("./node_modules/docz/dist/index.esm.js"),b=t("../tablex/lib/index.js"),p=t.n(b),x=t("./node_modules/antd/es/input/index.js"),h={},j="wrapper";function w(e){var n=e.components,t=Object(c.a)(e,["components"]);return Object(i.b)(j,Object.assign({},h,t,{components:n,mdxType:"MDXLayout"}),Object(i.b)("h1",{id:"\u7528\u6cd5\u793a\u4f8b"},"\u7528\u6cd5\u793a\u4f8b"),Object(i.b)("pre",null,Object(i.b)("code",Object.assign({parentName:"pre"},{className:"language-javascript"}),'import Table, { flatten, unflatten } from "tablex";\n')),Object(i.b)("h2",{id:"\u8868\u683c\u5c5e\u6027\u914d\u7f6e\u3001\u81ea\u52a8\u8bb0\u5fc6"},"\u8868\u683c\u5c5e\u6027\u914d\u7f6e\u3001\u81ea\u52a8\u8bb0\u5fc6"),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"\u70b9\u51fb\u5de6\u4e0b\u89d2\u6309\u94ae\u3001\u5217\u5934\u83dc\u5355\uff0c\u53ef\u5bf9\u8868\u683c\u5c5e\u6027\u8fdb\u884c\u914d\u7f6e\uff0c\u5982\uff1a\u5217\u5bbd\u3001\u5217\u56fa\u5b9a\u3001\u663e\u793a/\u9690\u85cf\u3001\u5217\u987a\u5e8f\u3002\u914d\u7f6e\u5b8c\u6210\u540e\u5c06\u4f1a\u81ea\u52a8\u4fdd\u5b58\u6570\u636e\uff0c\u4e0b\u6b21\u9884\u89c8\u6b64\u8868\u683c\u5c06\u4f1a\u4fdd\u6301\u5f53\u524d\u7684\u72b6\u6001\u5448\u73b0\u3002")),Object(i.b)(m.c,{__position:0,__code:"class Demo extends React.Component {\n    generateData(columns, count = 20, prefix = 'Row') {\n      return new Array(count).fill(0).map((row, rowIndex) => {\n        return columns.reduce(\n          (rowData, column, columnIndex) => {\n            if (column.dataIndex !== 'id') {\n              rowData[column.dataIndex] = Math.floor(Math.random() * 100 + 1)\n            } else {\n              rowData[column.dataIndex] =\n                prefix + ' ' + rowIndex + ' - Col ' + columnIndex\n            }\n            return rowData\n          },\n          {\n            id: prefix + rowIndex,\n            parentId: null,\n          },\n        )\n      })\n    }\n    constructor(props) {\n      super(props)\n      const columns = [\n        {\n          dataIndex: 'id',\n          title: 'id',\n          key: 'id',\n          width: 150,\n          align: 'center',\n        },\n        {\n          dataIndex: 'column-1',\n          key: 'column-1',\n          title: 'column-1',\n          width: 100,\n        },\n\n        {\n          dataIndex: 'column-2',\n          key: 'column-2',\n          title: 'column-2',\n          width: 150,\n          align: 'center',\n        },\n\n        {\n          dataIndex: 'column-3',\n          key: 'column-3',\n          title: 'column-3',\n          align: 'right',\n        },\n        {\n          dataIndex: 'column-4',\n          key: 'column-4',\n          title: 'column-4',\n          width: 100,\n          align: 'center',\n        },\n      ]\n\n      let data = this.generateData(columns, 20)\n\n      this.state = {\n        data: data,\n        columns: columns,\n      }\n    }\n    render() {\n      let { columns, data } = this.state\n      return (\n        <Table\n          rowKey=\"id\"\n          columns={columns}\n          data={data}\n          tableId=\"memorize_table\"\n          columnDropMenu={true}\n          settable={true}\n        />\n      )\n    }\n  }",__scope:{props:this?this.props:t,Playground:m.c,Props:m.d,Table:p.a,flatten:b.flatten,Input:x.a},style:{height:400},mdxType:"Playground"},function(e){function n(e){var t;Object(a.a)(this,n);var d=[{dataIndex:"id",title:"id",key:"id",width:150,align:"center"},{dataIndex:"column-1",key:"column-1",title:"column-1",width:100},{dataIndex:"column-2",key:"column-2",title:"column-2",width:150,align:"center"},{dataIndex:"column-3",key:"column-3",title:"column-3",align:"right"},{dataIndex:"column-4",key:"column-4",title:"column-4",width:100,align:"center"}],r=(t=Object(o.a)(this,Object(l.a)(n).call(this,e))).generateData(d,20);return t.state={data:r,columns:d},t}return Object(r.a)(n,e),Object(d.a)(n,[{key:"generateData",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Row";return new Array(n).fill(0).map((function(n,a){return e.reduce((function(e,n,o){return"id"!==n.dataIndex?e[n.dataIndex]=Math.floor(100*Math.random()+1):e[n.dataIndex]=t+" "+a+" - Col "+o,e}),{id:t+a,parentId:null})}))}}]),Object(d.a)(n,[{key:"render",value:function(){var e=this.state,n=e.columns,t=e.data;return Object(i.b)(p.a,{rowKey:"id",columns:n,data:t,tableId:"memorize_table",columnDropMenu:!0,settable:!0,mdxType:"Table"})}}]),n}(s.a.Component)))}w&&w===Object(w)&&Object.isExtensible(w)&&Object.defineProperty(w,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"doc\\Memorize\\index.mdx"}}),w.isMDXComponent=!0}}]);
//# sourceMappingURL=doc-memorize-index.c42fc7cc827442d88989.js.map