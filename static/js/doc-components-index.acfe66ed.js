(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"./doc/components/index.mdx":function(e,n,t){"use strict";t.r(n);var a=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),o=t("./node_modules/react/index.js"),r=t.n(o),l=t("./node_modules/@mdx-js/react/dist/index.es.js"),d=t("./node_modules/docz/dist/index.esm.js"),s=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),c=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js"),i=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"),u=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"),m=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js"),b=t("./node_modules/react-dom/index.js"),p=t.n(b),f=t("../tablex/lib/index.js"),g=t("./node_modules/antd/es/input/index.js"),h=(t("./doc/components/styles.css"),t("./node_modules/react-sortable-hoc/dist/react-sortable-hoc.esm.js")),x=Object(h.b)((function(e){return r.a.createElement("div",e)})),y=Object(h.a)((function(e){var n=e.className,t=e.children;return r.a.createElement("div",{className:n},t)}));function j(e){var n=e.rowData,t=e.rowIndex,a=e.rowProps;return r.a.createElement(x,Object.assign({},a,{index:t,"data-key":n.id}))}var v=function(e){return r.a.createElement(f.Table,Object.assign({},e,{components:{body:function(n){var t=n.className,a=n.children;return r.a.createElement(y,Object.assign({className:t},e),a)},row:j}}))},w=function(e){function n(e){var t;return Object(s.a)(this,n),(t=Object(i.a)(this,Object(u.a)(n).call(this,e))).state={data:[]},t}return Object(m.a)(n,e),Object(c.a)(n,[{key:"componentDidMount",value:function(){var e=[{dataIndex:"column-1",key:"column-1",title:"column-1",validator:function(e,n){return e?{valid:!0,message:"false"}:{valid:!1,message:"\u8bf7\u8f93\u5165"}},editor:function(e,n,t,a,o){return r.a.createElement(g.a,{defaultValue:e,ref:o,onChange:function(e){return a([{"column-1":e.target.value,id:n.id},{id:"3",address:e.target.value}])}})}},{width:150,dataIndex:"column-2",title:"column-2"},{width:150,dataIndex:"column-3",title:"column-3"},{width:150,dataIndex:"column-4",title:"column-4"}],n=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"row-";return new Array(n).fill(0).map((function(n,a){return e.reduce((function(e,n,t){return e[n.dataIndex]="Row ".concat(a," - Col ").concat(t),e}),{id:"".concat(t).concat(a),parentId:null})}))}(e,100);this.setState({data:n,columns:e})}},{key:"onSortEnd",value:function(e){var n=e.newIndex,t=e.oldIndex;this.setState((function(e){var a,o,r,l=e.data;return{data:(a=l,o=t,r=n,(a=a.slice()).splice(r<0?a.length+r:r,0,a.splice(o,1)[0]),a)}}))}},{key:"getContainer",value:function(){return p.a.findDOMNode(this).querySelector(".tablex-table-body>div")}},{key:"render",value:function(){return r.a.createElement(v,{rowKey:"id",expandColumnKey:"column-1",editable:!0,columns:this.state.columns,selectMode:"none",data:this.state.data,orderNumber:!0,lockAxis:"y",onSortEnd:this.onSortEnd.bind(this),validateTrigger:"onChange",distance:10,helperClass:"tablex-row-dragging",getContainer:this.getContainer.bind(this)})}}]),n}(o.Component),O=w;"undefined"!==typeof w&&w&&w===Object(w)&&Object.isExtensible(w)&&Object.defineProperty(w,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"Demo",filename:"doc\\components\\body.js"}});var D=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js"),C=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),I=t("./node_modules/react-dnd/dist/esm/index.js"),_=t("./node_modules/react-dnd-html5-backend/dist/esm/index.js");function E(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function N(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?E(t,!0).forEach((function(n){Object(D.a)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):E(t).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var k=function(e){e.id;var n=e.className,t=e.style,a=e.index,l=e.children,d=e.data,s=Object(o.useRef)(null),c=Object(I.d)({accept:"card",hover:function(e,n){if(console.log("hover:",e.data,d),s.current){var t=e.index,o=a;if(t!==o){var r=s.current.getBoundingClientRect(),l=(r.bottom-r.top)/2,c=n.getClientOffset().y-r.top;t<o&&c<l||t>o&&c>l||(e.index=o)}}}}),i=Object(C.a)(c,2)[1],u=Object(I.c)({item:{type:"card",id:d.id,data:d,index:a},collect:function(e){return{isDragging:e.isDragging()}}}),m=Object(C.a)(u,2);m[0].isDragging;return(0,m[1])(i(s)),r.a.createElement("div",{ref:s,className:n,style:N({},t)},l)};function S(e){var n=e.rowData,t=e.rowIndex,a=e.rowProps;return r.a.createElement(k,Object.assign({},a,{data:n,index:t,"data-key":n.id}))}var P=function(e){function n(e){var t;return Object(s.a)(this,n),(t=Object(i.a)(this,Object(u.a)(n).call(this,e))).state={data:[]},t}return Object(m.a)(n,e),Object(c.a)(n,[{key:"componentDidMount",value:function(){var e=[{dataIndex:"column-1",key:"column-1",title:"column-1",validator:function(e,n){return e?{valid:!0,message:"false"}:{valid:!1,message:"\u8bf7\u8f93\u5165"}},editor:function(e,n,t,a,o){return r.a.createElement(g.a,{defaultValue:e,ref:o,onChange:function(e){return a([{"column-1":e.target.value,id:n.id},{id:"3",address:e.target.value}])}})}},{width:150,dataIndex:"column-2",title:"column-2"},{width:150,dataIndex:"column-3",title:"column-3"},{width:150,dataIndex:"column-4",title:"column-4"}],n=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"row-";return new Array(n).fill(0).map((function(n,a){return e.reduce((function(e,n,t){return e[n.dataIndex]="Row ".concat(a," - Col ").concat(t),e}),{id:"".concat(t).concat(a),parentId:null})}))}(e,100);this.setState({data:n,columns:e})}},{key:"onSortEnd",value:function(e){var n=e.newIndex,t=e.oldIndex;this.setState((function(e){var a,o,r,l=e.data;return{data:(a=l,o=t,r=n,(a=a.slice()).splice(r<0?a.length+r:r,0,a.splice(o,1)[0]),a)}}))}},{key:"getContainer",value:function(){return p.a.findDOMNode(this).querySelector(".tablex-table-body>div")}},{key:"render",value:function(){return r.a.createElement(I.b,{backend:_.a},r.a.createElement(f.Table,{rowKey:"id",expandColumnKey:"column-1",editable:!0,columns:this.state.columns,selectMode:"none",data:this.state.data,orderNumber:!0,components:{row:S}}))}}]),n}(o.Component),T=P;"undefined"!==typeof P&&P&&P===Object(P)&&Object.isExtensible(P)&&Object.defineProperty(P,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"Demo",filename:"doc\\components\\dnd.js"}}),t.d(n,"default",(function(){return A}));var M={},R="wrapper";function A(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(l.b)(R,Object.assign({},M,t,{components:n,mdxType:"MDXLayout"}),Object(l.b)("h1",{id:"tablecomponents"},"Table.components"),Object(l.b)("h2",{id:"\u884c\u62d6\u52a8"},"\u884c\u62d6\u52a8"),Object(l.b)(d.c,{__position:0,__code:"<Body />",__scope:{props:this?this.props:t,Playground:d.c,Props:d.d,Body:O,Dnd:T},style:{height:400},mdxType:"Playground"},Object(l.b)(O,{mdxType:"Body"})),Object(l.b)("p",null,Object(l.b)("inlineCode",{parentName:"p"},"js")),Object(l.b)("pre",null,Object(l.b)("code",Object.assign({parentName:"pre"},{className:"language-javascript"}),'\nimport React, { Component } from "react";\nimport ReactDom from "react-dom";\nimport { Table } from "tablex";\nimport { Input, Button } from "antd";\n\nimport "./styles.css";\n\nimport { SortableContainer, SortableElement } from "react-sortable-hoc";\n\nconst DraggableRow = SortableElement(props => {\n  return <div {...props} />;\n});\n\nconst DraggableContainer = SortableContainer(({ className, children }) => {\n  return <div className={className}>{children}</div>;\n});\n\nfunction DraggableTableRow(props) {\n  let { rowData, rowIndex, rowProps } = props;\n  return <DraggableRow {...rowProps} index={rowIndex} data-key={rowData.id} />;\n}\n\nconst DraggableTable = props => {\n  return (\n    <Table\n      {...props}\n      components={{\n        body: ({ className, children }) => {\n          return (\n            <DraggableContainer className={className} {...props}>\n              {children}\n            </DraggableContainer>\n          );\n        },\n        row: DraggableTableRow\n      }}\n    />\n  );\n};\n\nconst generateData = (columns, count = 20, prefix = "row-") =>\n  new Array(count).fill(0).map((row, rowIndex) => {\n    return columns.reduce(\n      (rowData, column, columnIndex) => {\n        rowData[column.dataIndex] = `Row ${rowIndex} - Col ${columnIndex}`;\n\n        if (rowIndex === 0) {\n          //rowData.children = [];\n        }\n\n        return rowData;\n      },\n      {\n        id: `${prefix}${rowIndex}`,\n        parentId: null\n      }\n    );\n  });\n\nconst arrayMove = (array, from, to) => {\n  array = array.slice();\n  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);\n  return array;\n};\n\nclass Demo extends Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      data: []\n    };\n  }\n\n  componentDidMount() {\n    let columns = [\n      {\n        dataIndex: "column-1",\n        key: "column-1",\n        title: "column-1",\n        validator: function(value, row) {\n          if (!value) {\n            return { valid: false, message: "\u8bf7\u8f93\u5165" };\n          }\n\n          return { valid: true, message: "false" };\n        },\n        editor: function(value, row, index, onchange, ref) {\n          return (\n            <Input\n              defaultValue={value}\n              ref={ref}\n              onChange={e =>\n                onchange([\n                  { "column-1": e.target.value, id: row.id },\n                  { id: "3", address: e.target.value }\n                ])\n              }\n            />\n          );\n        }\n      },\n      {\n        width: 150,\n        dataIndex: "column-2",\n        title: "column-2"\n      },\n      {\n        width: 150,\n        dataIndex: "column-3",\n        title: "column-3"\n      },\n      {\n        width: 150,\n        dataIndex: "column-4",\n        title: "column-4"\n      }\n    ];\n\n    const data = generateData(columns, 100);\n\n    this.setState({\n      data: data,\n      columns: columns\n    });\n  }\n\n  onSortEnd({ newIndex, oldIndex }) {\n    this.setState(({ data }) => ({\n      data: arrayMove(data, oldIndex, newIndex)\n    }));\n  }\n\n  getContainer() {\n    let el = ReactDom.findDOMNode(this);\n    return el.querySelector(".tablex-table-body>div");\n  }\n\n  render() {\n    return (\n      <DraggableTable\n        rowKey="id"\n        expandColumnKey="column-1"\n        editable={true}\n        columns={this.state.columns}\n        selectMode="none"\n        data={this.state.data}\n        orderNumber={true}\n        lockAxis="y"\n        onSortEnd={this.onSortEnd.bind(this)}\n        validateTrigger="onChange"\n        distance={10}\n        helperClass="tablex-row-dragging"\n        getContainer={this.getContainer.bind(this)}\n      />\n    );\n  }\n}\n\nexport default Demo;\n\n\n')),Object(l.b)("p",null,Object(l.b)("inlineCode",{parentName:"p"},"styles.css")),Object(l.b)("pre",null,Object(l.b)("code",Object.assign({parentName:"pre"},{className:"language-css"}),"\n.tablex-table-row.tablex-row-dragging {\n  display: flex;\n  width: auto;\n  min-width: auto;\n  background-color: #ffffff;\n  box-shadow: 0 0px 5px 0px rgba(0, 0, 0, 0.2);\n  z-index: 1;\n}\n\n.tablex-table-row.tablex-row-dragging .tablex-table-row-cell {\n  display: flex;\n  flex: 0 0 auto;\n  box-sizing: border-box;\n  align-items: center;\n  position: relative;\n}\n\n")))}A&&A===Object(A)&&Object.isExtensible(A)&&Object.defineProperty(A,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"doc\\components\\index.mdx"}}),A.isMDXComponent=!0},"./doc/components/styles.css":function(e,n,t){}}]);
//# sourceMappingURL=doc-components-index.5a3ed5dbe712a914be76.js.map