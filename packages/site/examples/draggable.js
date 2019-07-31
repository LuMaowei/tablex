import React, { Component } from "react";
import { Table } from "tablex";

import { SortableContainer, SortableElement } from "react-sortable-hoc";

const DraggableRow = SortableElement(props => {
  return <div {...props} />;
});

class DraggableTableRow2 extends Component {
  render() {
    let props = this.props;
    let { rowData, rowIndex, children, rowProps } = props;

    return (
      <DraggableRow {...props} index={rowIndex} data-key={rowData.id}>
        {children}
      </DraggableRow>
    );
  }
}

function DraggableTableRow(props) {
  let { rowData, rowIndex, rowProps } = props;

  return <DraggableRow {...rowProps} index={rowIndex} data-key={rowData.id} />;
}

const DraggableTable = SortableContainer(props => {
  return <Table {...props} components={{ row: DraggableTableRow }} />;
});


const generateColumns = (count = 10, prefix = "column-", props) =>
  new Array(count).fill(0).map((column, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataIndex: `${prefix}${columnIndex}`,
    title: `Column ${columnIndex}`,
    width: 150
  }));

const generateData = (columns, count = 20, prefix = "row-") =>
  new Array(count).fill(0).map((row, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataIndex] = `Row ${rowIndex} - Col ${columnIndex}`;

        if (rowIndex === 0) {
          //rowData.children = [];
        }

        return rowData;
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null
      }
    );
  });

const columns = generateColumns(10);
const data = generateData(columns, 100);

let fixedColumns = columns.map((column, columnIndex) => {
  let fixed;
  if (columnIndex < 2) fixed = "left";
  if (columnIndex > 8) fixed = "right";

  return { ...column, resizable: true, fixed };
});

fixedColumns = [
  {
    dataIndex: "column-1",
    key: "column-1",
    title: "number",
    width: 200
  },
  {
    title: "appellation",
    width: 150,
    key: "column-11",
    children: [
      {
        dataIndex: "address",
        title: "name",
        key: "column-2",

        width: 150
      },
      {
        dataIndex: "id",
        key: "column-3",
        title: "nick name",
        width: 150,
        children: [
          {
            dataIndex: "id",
            title: "nick-1",
            key: "column-21",
            maxWidth: 300,
            width: 150
          },
          {
            dataIndex: "column-31",
            key: "column-31",
            title: "nick-2",
            width: 150
          }
        ]
      }
    ]
  },
  {
    dataIndex: "age",
    key: "column-4",
    title: "age",
    width: 150
  }
];

function createData(level, parentKey, maxLevel, index) {
  if (level > maxLevel) {
    return;
  }

  let l = level;
  let data = [];
  for (let i = 0; i < 3; i++) {
    let k = parentKey + "-" + level + "-" + i;
    let d = {
      id: k,
      "column-1": "Edward King " + k,
      age: 32,
      address: "London, Park Lane no. " + i
    };

    if (i === 2) {
      d.children = createData(l + 1, k, maxLevel, i);
    }

    data.push(d);
  }
  return data;
}

function createTreeData() {
  let data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      id: "" + i,
      level: 0,
      "column-1": "Edward King " + i,
      age: 32,
      address: "London, Park Lane no. " + i,
      children: createData(0, i, 2)
    });
  }

  return data;
}

class Demo extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    this.setState({
      data: createTreeData()
    });
  }

  loadChildrenData = record => {
    return new Promise((resolve, reject) => {
      let rows = this.state.data;

      setTimeout(() => {
        let childrens = [{ id: "123123123", "column-0": "children async" }];
        // record.isLoading=false;
        record.children = childrens;
        //rows[0] = Object.assign({}, record, { children: childrens });

        this.setState({
          data: rows
        });

        resolve();
      }, 1300);
    });
  };

  scrollRef = null;
  tableScrollRef = ins => {
    this.scrollRef = ins;
    if (ins) {
      ins.id = "tableScroll";
    }
  };

  getContainer = a => {
    return document.getElementById("tableScroll")||document.body;
  };

  shouldCancelStart = (a, b, c) => {
    return true;
  };

  onSortEnd = a => {};

  onSortOver = (a, e) => {};

  render() {
    return (
      <DraggableTable
        distance={10}
        onSortEnd={this.onSortEnd}
        helperClass="tablex-row-dragging"
        getContainer={this.getContainer}
        onSortOver={this.onSortOver}
        scrollRef={this.tableScrollRef}
        rowKey="id"
        draggable={true}
        expandColumnKey="column-1"
        columns={fixedColumns}
        selectMode="none"
        data={this.state.data}
        orderNumber={true}
        disabledSelectKeys={[]}
        onSelectChange={(keys, rows) => {
          console.log("onSelectChange:", rows);
        }}
      />
    );
  }
}

export default Demo;