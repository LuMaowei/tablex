import React, {
  memo,
  useMemo,
  useRef,
  Component,
  useState,
  useEffect
} from "react";

import ReactDom from "react-dom";
import { Table } from "tablex";
import { Input, Button } from "antd";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import HTML5Backend, { getEmptyImage } from "react-dnd-html5-backend";
import "./styles.css";

const DragIcon = () => {
  return (
    <svg
      style={{
        display: "inline-block",
        width: "1em",
        height: "1em",
        fill: "currentColor"
      }}
      viewBox="0 0 1024 1024"
    >
      <path d="M469.333333 256a85.333333 85.333333 0 1 1-85.333333-85.333333 85.333333 85.333333 0 0 1 85.333333 85.333333z m-85.333333 170.666667a85.333333 85.333333 0 1 0 85.333333 85.333333 85.333333 85.333333 0 0 0-85.333333-85.333333z m0 256a85.333333 85.333333 0 1 0 85.333333 85.333333 85.333333 85.333333 0 0 0-85.333333-85.333333z m256-341.333334a85.333333 85.333333 0 1 0-85.333333-85.333333 85.333333 85.333333 0 0 0 85.333333 85.333333z m0 85.333334a85.333333 85.333333 0 1 0 85.333333 85.333333 85.333333 85.333333 0 0 0-85.333333-85.333333z m0 256a85.333333 85.333333 0 1 0 85.333333 85.333333 85.333333 85.333333 0 0 0-85.333333-85.333333z"></path>
    </svg>
  );
};

const DraggableRow = memo(
  ({
    itemKey,
    itemInfo,
    index,
    data,
    className,
    style,
    children,
    getContainer,
    onDrop
  }) => {
    const ref = useRef(null);
    const ref_drag = useRef(null);

    let dragToInner = false;

    function removeClass(name) {
      let container = getContainer();
      if (container) {
        (container.querySelectorAll("." + name) || []).forEach(e => {
          e.classList.remove(name);
        });
      }
    }

    function addClass(sel, name) {
      let container = getContainer();
      if (container) {
        (container.querySelectorAll(sel) || []).forEach(e => {
          e.classList.add(name);
        });
      }
    }

    const [{ isDragging, height }, connectDrag, preview] = useDrag({
      item: {
        key: itemKey,
        index: index,
        data: data,
        info: itemInfo,
        type: "item"
      },
      collect: monitor => {
        const result = {
          isDragging: monitor.isDragging(),
          height: style.height
        };
        return result;
      },
      begin(){
        let t=document.createElement("div");
        t.className="drag_preview";
        t.innerText="drag_preview";
        t.style="position: absolute;z-index: 10;background-color: red;height: 20px;width: 100%;top:0"
        document.body.appendChild(t)
      },
      end() {
        removeClass("drag-under");
        removeClass("drag-hover");
      }
    });
    const [{ isActive }, connectDrop] = useDrop({
      accept: "item",
      collect: monitor => {
        const result = {
          isActive: monitor.canDrop() && monitor.isOver()
        };

        return result;
      },
      canDrop(item) {
        let targetParents = itemInfo.parents;
        let sourceKey = item.key;
        //控制父级无法拖动到本身的子级
        if (targetParents.indexOf(sourceKey) > -1) {
          return false;
        }
        return true;
      },
      drop(item) {
        if (typeof onDrop === "function") {
          onDrop({
            target: { key: itemKey, index: index, data: data },
            source: { key: item.key, index: item.index, data: item.data },
            isInner: dragToInner
          });
        }
      },
      hover(item, monitor) {
        let { key: draggedId } = item;
        // console.log("hover:",monitor.getInitialClientOffset()) //开始拖动的初始位置
        // console.log("hover:",monitor.getSourceClientOffset()) //当前drageSource元素拖到的位置
        // console.log("hover:",monitor.getDifferenceFromInitialOffset()) //当前相对于初始拖动的差值
        //console.log("hover:",monitor.getInitialSourceClientOffset()) //dragSource初始位置
        // console.log("hover:",monitor.getClientOffset()) //上一次的拖动位置
        removeClass("drag-under");
        removeClass("drag-hover");

        if (isActive && draggedId !== itemKey) {
          let y = monitor.getClientOffset().y;

          let el = ref.current;

          if (el) {
            const hover_y = el.getBoundingClientRect().y;

            let o = y > hover_y + height / 2;

            dragToInner = false;

            if (o) {
              // el.classList.add("drag-under");
              addClass(".tablex-table-row-" + index, "drag-under");
            } else {
              //el.classList.add("drag-hover");
              addClass(".tablex-table-row-" + index, "drag-hover");

              dragToInner = true;
            }

            //  console.log("hover:", y, hover_y, o, height);
          }
        }
      }
    });

    let drag_el = null;

    connectDrag(drag_el);
    connectDrop(ref);

    useEffect(() => {
      if (ref.current) {
        drag_el = ref.current.querySelector(".drag-handler");
      }
      connectDrag(drag_el);

   
    });
    preview(document.body.querySelector(".drag_preview"), { captureDraggingState: true });
    let cls = [className];

    if (isDragging) {
      cls.push("dragging");
    }

    return (
      <div ref={ref} className={cls.join(" ")} style={style}>
        {children}
      </div>
    );
  }
);

const DraggableRow2 = ({ id, className, style, index, children, data }) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "card",
    hover(item, monitor) {
      console.log("hover:", item.data, data);
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      // moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: "card", id: data.id, data: data, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div ref={ref} className={className} style={{ ...style }}>
      {children}
    </div>
  );
};

function DraggableTableRow(props) {
  let { rowData, rowIndex, rowProps, getContainer, rowExtra } = props;
  return (
    <DraggableRow
      {...rowProps}
      getContainer={getContainer}
      itemInfo={rowExtra}
      data={rowData}
      index={rowIndex}
      data-key={rowData.id}
      itemKey={rowData.id}
      id={rowData.id}
    />
  );
}

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

const arrayMove = (array, from, to) => {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
};

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    let columns = [
      {
        dataIndex: "column-1",
        key: "column-1",
        title: "column-1",
        validator: function(value, row) {
          if (!value) {
            return { valid: false, message: "请输入" };
          }

          return { valid: true, message: "false" };
        },
        editor: function(value, row, index, onchange, ref) {
          return (
            <Input
              defaultValue={value}
              ref={ref}
              onChange={e =>
                onchange([
                  { "column-1": e.target.value, id: row.id },
                  { id: "3", address: e.target.value }
                ])
              }
            />
          );
        }
      },
      {
        width: 150,
        dataIndex: "column-2",
        title: "column-2"
      },
      {
        width: 150,
        dataIndex: "column-3",
        title: "column-3"
      },
      {
        width: 150,
        dataIndex: "column-4",
        title: "column-4"
      }
    ];

    const data = generateData(columns, 100);
    data[3].children = generateData(columns, 10, "children-");
    data[3].children[2].children = generateData(
      columns,
      10,
      "children-children-"
    );

    this.setState({
      data: data,
      columns: columns
    });
  }

  onSortEnd({ newIndex, oldIndex }) {
    this.setState(({ data }) => ({
      data: arrayMove(data, oldIndex, newIndex)
    }));
  }

  getContainer = () => {
    let el = ReactDom.findDOMNode(this);
    return el.querySelector(".tablex-container");
  };

  onRow(row, index, rowProps, rowExtra) {
    return {
      rowExtra: rowExtra,
      getContainer: this.getContainer
    };
  }

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <Table
          rowKey="id"
          expandColumnKey="column-1"
          prependColumns={[
            {
              key: "test",
              title: "",
              width: 30,
              align:"center",
              render: () => {
                return (
                  <span className="drag-handler" style={{ color: "#7F8C8D" }}>
                    <DragIcon></DragIcon>
                  </span>
                );
              }
            }
          ]}
          editable={true}
          virtual={!!this.props.virtual}
          columns={this.state.columns}
          selectMode="none"
          data={this.state.data}
          orderNumber={true}
          onRow={this.onRow.bind(this)}
          components={{
            row: DraggableTableRow
          }}
        />
      </DndProvider>
    );
  }
}

export default Demo;
