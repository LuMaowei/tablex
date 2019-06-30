import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import cloneDeep from "lodash/cloneDeep";
import merge from "lodash/merge";
import Table from "./index";
import { treeToList, treeFilter } from "./version3.2/helper";
import Tooltip from "antd/lib/tooltip";
import Button from "antd/lib/button";
import message from "antd/lib/message";
import Popconfirm from "antd/lib/popconfirm";
import Menu from "antd/lib/menu";
import Dropdown from "antd/lib/dropdown";
import Icon from "antd/lib/icon";
import Layout from "antd/lib/layout";
const { Content, Header } = Layout;


/**
 * 可编辑表格
 */
class EditableTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rowKey: props.rowKey,
            propsOriginal: {},
            sourceColumns: [],
            columns: [],
            data: [],
            dataList: [],
            sourceData: [],
            changedRows: [],
            isEditAll: false,
            isAdding: false,
            isAddingRange: false,
            addedData: [],
            isEditing: false,
            editKeys: [],
            editSaveLoading: false,
            deleteLoading: false,
            dataControled: false
        }
    }

    rowsAttributes = [];
    tableRef = null;
    initRef = (inst) => {

        if (typeof this.props.initRef === "function") {
            this.props.initRef(inst);
        }
        this.tableRef = inst;
    };

    isEditing = () => {
        return this.state.isEditing;
    }


    static getDerivedStateFromProps(nextProps, prevState) {

        let nextState = {};

        //是否让数据受控
        nextState.dataControled = nextProps.dataControled || false;
        //

        nextState.columns = cloneDeep(nextProps.columns || []);
        let data = nextProps.data || nextProps.dataSource;


        if (prevState.propsOriginal !== nextProps) {
            nextState.propsOriginal = nextProps;

            // newState.isEditAll = false;
            // newState.editKeys = []; 
            nextState.changedRows = [];

            if (prevState.dataControled === true) {
                let newData = data || [];//data || [];//
                let dataList = treeToList(newData).list;
                nextState.dataList = dataList;
                nextState.data = newData;
                nextState.sourceData = data;

            } else {
                if (prevState.sourceData !== data) {
                    let newData = cloneDeep(data || []);//data || [];//
                    let dataList = treeToList(newData).list;
                    nextState.dataList = dataList;
                    nextState.data = newData;
                    nextState.sourceData = data;
                }
            }



        }



        return nextState;
    }




    updateComponent = () => {
        this.forceUpdate();
    }


    delayTimer = null;
    delayUpdate = (fn) => {

        let delay = 300;

        if (typeof this.props.validateDelay === "number") {
            delay = this.props.validateDelay;
        }

        if (this.delayTimer) {
            clearTimeout(this.delayTimer);
        }

        if (typeof fn === "function") {
            this.delayTimer = setTimeout(() => {
                fn();
                this.updateComponent();
            }, delay)

        } else {
            this.delayTimer = setTimeout(this.updateComponent, delay)
        }
    }



    isMouseFocus = false;

    changedRows = []
    addToChanged = (newRow) => {

        let rowKey = this.props.rowKey;
        let changedRows = this.changedRows;
        let validateTrigger = this.props.validateTrigger;


        let i = changedRows.findIndex(d => d[rowKey] === newRow[rowKey]);

        if (i >= 0) {
            changedRows[i] = newRow;
        } else {
            changedRows.push(newRow);
        }

        this.changedRows = changedRows;


        // 当change时立即验证行
        if (validateTrigger === "onChange") {
            this.validateRow(newRow);
            this.updateComponent();
            // this.delayUpdate(() => {
            //    // this.validateRow(newRow);
            // });

        }
    }






    editChange = (newValues = {}, row, index) => {

        let { data, addedData } = this.state;

        let rowKey = this.props.rowKey;

        // let dataList = data.concat(addedData);

        let arr = treeToList(data).list;

        let k = row[rowKey];
        let i = arr.findIndex(d => d[rowKey] === k);


        if (i > -1) {

            let changedRow = {};

            Object.keys(newValues).forEach(k => {
                arr[i][k] = newValues[k];
                changedRow = Object.assign({}, arr[i]);
                changedRow[k] = newValues[k];
                //row[k] = newValues[k];
            })



            //this.setState({});

            this.addToChanged(arr[i]);
        }

        let j = addedData.findIndex(d => d[rowKey] === k);
        console.log("addedData:", addedData)

        if (j > -1) {


            Object.keys(newValues).forEach(k => {
                addedData[j][k] = newValues[k];
            })


            this.addToChanged(addedData[j]);

        }




    }


    setRowAttr = (row, attr = {}) => {

        let rowKey = this.props.rowKey;
        let key = row[rowKey];

        let attrs = this.rowsAttributes || [];

        let i = attrs.findIndex(d => d[rowKey] === key);


        if (i > -1) {

            let fRow = attrs[i];

            if (typeof fRow.__attribute === "undefined") {
                fRow.__attribute = attr;
            } else {
                fRow.__attribute = merge({}, fRow.__attribute, attr);
            }

        } else {
            let newAttr = Object.assign({}, row);
            newAttr.__attribute = attr;
            attrs.push(newAttr)
        }

        this.rowsAttributes = attrs;


    }

    getRowAttr = (row) => {

        let rowKey = this.props.rowKey;
        let key = row[rowKey];

        let attrs = this.rowsAttributes || [];
        let attr = {};


        let i = attrs.findIndex(d => d[rowKey] === key);
        if (i > -1) {
            attr = attrs[i] || {};
        }


        return Object.assign({}, attr.__attribute || {});
    }

    getValidate = (row, key) => {
        let attr = this.getRowAttr(row);
        let r = (attr["validation"] || {})[key] || {};

        return r;
    }


    //进行异步验证的promise
    validatorAsync = [];

    validateRow = (row) => {

        let { columns } = this.state;

        let bl = true;

        let validation = {};

        for (let i = 0; i < columns.length; i++) {
            const c = columns[i];
            const ck = c.dataIndex;


            if (typeof c.validator === "function") {

                var v = c.validator(row[ck], row);

                if (v.constructor.name === "Promise") {

                    this.validatorAsync.push(new Promise((resolve, reject) => {

                        v.then(d => {
                            resolve({ validation: d, row, columnKey: ck })
                        })

                        v.catch(e => {
                            reject(e);
                        })

                    }));


                }
                else {

                    validation[ck] = {
                        valid: v.valid,
                        msg: v.valid ? "" : (v.message || "输入不正确")
                    };


                    if (!v.valid) bl = false;


                    this.setRowAttr(row, {
                        validation
                    });

                }

            }

        }


        return bl;
    }

    //异步验证数据行
    validateAsync = (rows) => {

        let arr = rows || [];

        return new Promise((resolve, reject) => {

            let bl = true;


            for (let i = 0; i < arr.length; i++) {
                const r = arr[i];
                let temp = this.validateRow(r);
                if (temp === false) {
                    bl = false;
                }
            }


            if (this.validatorAsync.length > 0) {

                Promise.all(this.validatorAsync).then(datas => {

                    datas.forEach(d => {

                        let v = d.validation;

                        if (v.valid === false) {
                            bl = false;
                        }

                        let validation = {};

                        validation[d.columnKey] = {
                            valid: v.valid,
                            msg: v.valid ? "" : v.message
                        };

                        this.setRowAttr(d.row, {
                            validation
                        });

                    })


                    this.validatorAsync = [];
                    this.forceUpdate();

                    resolve(bl);

                })

            } else {

                if (arr.length > 0) {
                    this.forceUpdate();
                }

                resolve(bl);
            }

        })

    }

    //验证改变的数据行
    validate = async () => {
        let bl = true;
        let arr = this.changedRows;

        // let { data, addedData } = this.state;

        // let arr = data.concat(addedData);

        bl = await this.validateAsync(arr);

        return bl;
    }

    //验证当前所有数据行
    validateAll = async () => {
        let bl = true;
        let { data, addedData, editKeys, isEditAll } = this.state;
        let rowKey = this.props.rowKey;


        let arr = [];

        if (isEditAll === true) {
            arr = data;
        } else {

            arr = data.filter(d => {
                return editKeys.indexOf(d[rowKey]) > -1
            })

        }

        bl = await this.validateAsync(arr);
        // this.forceUpdate();
        return bl;
    }

    editorInstance = [];
    setEditorIns = (row, column, ins) => {


        if (ins === null) {
            return;
        }

        let rowKey = row[this.props.rowKey];
        let columnKey = column.dataIndex;

        let editorInstance = [].concat(this.editorInstance);

        let ed = this.editorInstance.find(d => d.rowKey === rowKey && d.columnKey === columnKey);

        if (ed) {
            ed.editorInstance = ins;
        } else {
            editorInstance.push({
                columnKey: columnKey,
                rowKey: rowKey,
                editorInstance: ins
            });
        }

        this.editorInstance = editorInstance;

    }

    getEditorIns = (rowKey, columnKey) => {
        let ed = this.editorInstance.find(d => d.rowKey === rowKey && d.columnKey === columnKey);

        if (ed) {
            return ed.editorInstance;
        }
        return null;
    }

    formatColumns = () => {
        this.editorInstance = [];
        let { columns, editKeys, isEditAll, isEditing } = this.state;
        let rowKey = this.props.rowKey;


        let arr = columns;

        if (isEditing === true) {
            arr = treeFilter(columns, (d) => {
                if (d.editingVisible === true) {
                    d.hidden = false;
                }
                return d.editingVisible !== false
            })
        }


        let cols = treeToList(arr).leafs;


        if (isEditAll === true) {
            cols.forEach(d => {


                let editor = d.editor;

                if (typeof editor === "function") {

                    let renderFn = d.render;



                    d.render = (value, row, index) => {

                        let renderProps = null;
                        let newRenderProps = {};

                        if (typeof renderFn === "function") {
                            renderProps = renderFn(value, row, index);
                        }

                        if (renderProps && renderProps.props && renderProps.props.colSpan === 0) {
                            return renderProps;
                        }


                        let { valid, msg } = this.getValidate(row, d.dataIndex) || {};

                        let ed = editor(value, row, index, (values) => {
                            this.editChange(values, row, index);
                        }, (ins) => {
                            this.setEditorIns(row, d, ins);
                        }, this.validate);


                        let c = <span style={{ verticalAlign: "middle" }} className={valid === false ? "has-error" : ""} onClick={(e) => this.onClick(e, row, d)} onKeyDown={(e) => this.onKeyDown(e, row, d)}>
                            <Tooltip placement="topLeft" title={msg}>{ed}</Tooltip>
                        </span>;


                        newRenderProps.children = c;

                        if (renderProps && renderProps.props) {
                            newRenderProps.props = renderProps.props;
                        }

                        return newRenderProps;
                    }


                }

            })
        } else if (editKeys.length > 0) {

            cols.forEach(d => {


                if (typeof d.editingVisible === "boolean") {
                    d.hidden = !d.editingVisible;
                }

                let editor = d.editor;

                if (typeof editor === "function") {

                    let renderFn = d.render;

                    d.render = (value, row, index) => {

                        let renderProps = null;
                        let newRenderProps = {};

                        if (typeof renderFn === "function") {
                            renderProps = renderFn(value, row, index);
                        }

                        if (renderProps && renderProps.props && renderProps.props.colSpan === 0) {
                            return renderProps;
                        }


                        let bl = editKeys.findIndex(k => k === row[rowKey]) > -1;

                        if (bl) {

                            let { valid, msg } = this.getValidate(row, d.dataIndex) || {};

                            let ed = editor(value, row, index, (values) => {
                                this.editChange(values, row, index);
                            }, (ins) => {
                                this.setEditorIns(row, d, ins);
                            });


                            let c = <span style={{ verticalAlign: "middle" }} className={valid === false ? "has-error" : ""} onClick={(e) => this.onClick(e, row, d)} onKeyDown={(e) => this.onKeyDown(e, row, d)} >
                                <Tooltip placement="topLeft" title={msg}>{ed}</Tooltip>
                            </span>;

                            newRenderProps.children = c;

                            if (renderProps && renderProps.props) {
                                newRenderProps.props = renderProps.props;
                            }

                            return newRenderProps;

                        } else {

                            if (typeof renderFn === "function") {
                                return renderFn(value, row, index);
                            }
                            return value;
                        }

                    }
                }

            })

        }




        return arr;
    }


    toggleSettingColumns = (bl) => {
        // bl === true ? this.tableRef.enableTableSetting() : this.tableRef.disableTableSetting();
    }

    editAll = () => {
        this.toggleSettingColumns(false);
        this.setState({ isEditAll: true, isEditing: true, editKeys: [] });
    }

    endEdit = (callBack) => {

        this.toggleSettingColumns(true);

        let arr = [].concat(this.changedRows);

        this.changedRows = [];

        let nextState = { editSaveLoading: false, isEditAll: false, isAdding: false, isAddingRange: false, isEditing: false, editKeys: [], changedRows: [], addedData: [], sourceData: cloneDeep(this.state.data) };


        if (typeof callBack === "function") {
            this.setState(nextState, () => {
                callBack(arr, this.state.data, this.editType)
            })
        } else {
            this.setState(nextState)
        }

    }

    //取消编辑
    cancelEdit = () => {


        if (typeof this.props.onCancel === "function") {
            this.props.onCancel();
        }

        this.reset();

    }

    editRows = (keys) => {
        this.setState({ isEditAll: false, editKeys: keys, isEditing: true, });
    }


    getChangedRows = () => {
        return this.changedRows;
    }

    getRows = () => {
        return this.state.data;
    }

    addRow = (r = {}) => {

        let rowKey = this.props.rowKey;

        let row = {};

        row = Object.assign(row, r);

        let editKeys = this.state.editKeys;
        editKeys.push(row[rowKey]);

        let d = this.state.data;
        d.push(row);


        this.setState({
            data: d,
            editKeys: editKeys
        })

    }


    setRows = (arr = []) => {

        this.changedRows = [];
        this.setState({
            data: arr,
            editKeys: [],
            isEditAll: false,
            changedRows: []
        })

    }


    reset = () => {
        this.toggleSettingColumns(true);
        let data = cloneDeep(this.state.sourceData);

        let nextState = { isEditAll: false, isAdding: false, isAddingRange: false, isEditing: false, editKeys: [], data: data, changedRows: [], addedData: [] };

        this.changedRows = [];
        this.setState(nextState);
    }

    focusInput = (editor) => {

        if (!editor) {
            return;
        }


        if (editor.input && typeof editor.input.select === "function") {
            setTimeout(() => {
                editor.input.select();
            }, 1);
        } else if (typeof editor.focus === "function") {
            editor.focus();
        } else {
            let el = ReactDom.findDOMNode(editor);

            if (el) {
                let inputEl = el.getElementsByTagName("input")[0];
                inputEl && inputEl.focus();
                el.focus();
            }

        }

    }


    getNextEditor = (keyCode, row, column) => {

        let nextEditor = null;


        let key = this.props.rowKey;

        let rowKey = row[key];

        let columnKey = column.dataIndex;


        let { data: rows, columns } = this.state;

        let arr = treeToList(columns).leafs;


        if (keyCode === 38) {//top

            let currIndex = rows.findIndex(d => d[key] === rowKey);
            let nextRow = rows[currIndex - 1];

            if (nextRow) {
                nextEditor = this.getEditorIns(nextRow[key], columnKey);
            }

        }

        if (keyCode === 40) {//bottom

            let currIndex = rows.findIndex(d => d[key] === rowKey);
            let nextRow = rows[currIndex + 1];

            if (nextRow) {
                nextEditor = this.getEditorIns(nextRow[key], columnKey);
            }

        }


        if (keyCode === 37) {//left

            let currColumnIndex = arr.findIndex(d => d["dataIndex"] === columnKey);
            let nextColumn = arr[currColumnIndex - 1];

            if (nextColumn) {
                nextEditor = this.getEditorIns(rowKey, nextColumn["dataIndex"]);
            }

        }


        if (keyCode === 39 || keyCode === 13) {//right

            let currColumnIndex = arr.findIndex(d => d["dataIndex"] === columnKey);
            let nextColumn = arr[currColumnIndex + 1];

            if (nextColumn) {
                nextEditor = this.getEditorIns(rowKey, nextColumn["dataIndex"]);
            }

        }


        return nextEditor;
    }

    onKeyDown = (e, row, column) => {

        // e.preventDefault();
        //e.stopPropagation();


        let key = this.props.rowKey;

        let rowKey = row[key];
        let columnKey = column.dataIndex;



        let nextEditor = this.getNextEditor(e.keyCode, row, column);


        let currEditor = this.getEditorIns(rowKey, columnKey);;



        if (currEditor) {

            //ly 2018年11月6日 11点12分
            //当当前编辑器为下拉类型时，如 datePicker comobobox 。获取展开状态，展开时禁用表格列的快捷键切换
            if (typeof currEditor.getRealOpenState === "function") {
                let bl = currEditor.getRealOpenState();

                if (e.keyCode === 13) {
                    this.focusInput(nextEditor);
                    return false;
                }

                if (bl === true) {
                    return false;
                }

            }

        }

        this.focusInput(nextEditor);



    }


    onClick = (e, row, column) => {
        this.isMouseFocus = true;
    }


    completeEdit = async (callBack) => {

        let changedRows = this.getChangedRows();

        let editType = this.editType;
        let { data, sourceData, deletedRows } = this.state;
        let { allowSaveEmpty, alwaysValidate } = this.props;


        let newRows = [].concat(data);
        if (editType === "add") {
            newRows = data;
        } else if (editType === "edit") {
            newRows = data;
        } else if (editType === "delete") {
            newRows = data;
        }



        if (alwaysValidate === true) {
            let bl = await this.validateAll();

            if (bl === false) {
                message.error("信息录入不正确，请检查");
                return;
            }
        } else {

            if (allowSaveEmpty !== true) {
                if (changedRows.length <= 0) {
                    this.reset();
                    return;
                }
            }


            let bl = await this.validate();

            if (bl === false) {
                message.error("信息录入不正确，请检查");
                return;
            }

        }






        let onEditSave = this.props.onEditSave;

        if (typeof onEditSave === "function") {

            this.setState({ editSaveLoading: true });

            let fn = onEditSave(changedRows, newRows, this.editType);

            if (fn) {

                //如果返回的是一个promise对象，则只有当调用resolve时，才触发编辑完成事件
                if (typeof fn.then === "function" && typeof fn.catch === "function") {
                    fn.then(() => {
                        this.endEdit(callBack);
                    });

                    fn.catch(() => {
                        this.setState({ editSaveLoading: false });
                    });


                } else {
                    this.setState({ editSaveLoading: false });
                }

            } else {
                this.endEdit(callBack);
            }


        } else {
            this.endEdit(callBack);
        }




    }


    //"edit"：编辑 ； "add"：新增 "delete"： 删除 
    editType = "";
    edit = () => {

        let arr = this.state.data || [];

        if (arr.length === 0) {
            message.error("没有可编辑的数据");
            return false;
        }

        let bl = true;

        if (typeof this.props.onBeforeEdit === "function") {
            bl = this.props.onBeforeEdit();
        }

        if (bl === false) {
            return false;
        }


        this.editType = "edit";


        this.editAll();


        if (typeof this.props.onEdit === "function") {
            this.props.onEdit();
        }
    }


    delete = () => {

        let bl = true;

        if (typeof this.props.onBeforeDelete === "function") {
            bl = this.props.onBeforeDelete();
        }

        if (bl === false) {
            return false;
        }




        let selectedKeys = this.tableRef.tableApi.getSelectedKeys();

        if (selectedKeys.length <= 0) {
            message.warn("请选择要删除的数据");
        } else {

            this.editType = "delete";

            let { data, rowKey } = this.state;

            let newData = [].concat(data);
            let deletedRows = [];

            for (let i = 0; i < selectedKeys.length; i++) {

                let index = newData.findIndex(d => d[rowKey] === selectedKeys[i]);

                deletedRows.push(Object.assign({}, newData[index]));

                if (index > -1) {
                    newData.splice(index, 1);
                }

            }


            let onEditSave = this.props.onEditSave;

            if (typeof onEditSave === "function") {

                this.setState({ deleteLoading: true });

                let fn = onEditSave(deletedRows, newData, this.editType);

                if (fn && typeof fn.then === "function") {
                    fn.then(() => {
                        this.setState({ deleteLoading: false });
                    });
                } else {
                    this.setState({ deleteLoading: false });
                }
            } else {
                this.setState({ data: newData, deletedRows });
            }


            if (typeof this.props.onDelete === "function") {
                this.props.onDelete();
            }

        }


    }


    addRange = (rowCount) => {

        let { rowTemplate, rowKey, isAppend, defaultAddCount } = this.props;

        let bl = true;

        if (typeof this.props.onBeforeAdd === "function") {
            bl = this.props.onBeforeAdd();
        }

        if (bl === false) {
            return false;
        }

        this.editType = "add";

        let addCount = rowCount || defaultAddCount;

        let data = this.state.data || [];

        let newData = [];

        let addedData = [];
        let keys = [];

        for (let i = 0; i < addCount; i++) {
            let row = {};

            if (typeof rowTemplate === "function") {
                row = rowTemplate(i);
                if (!row[rowKey]) {
                    row[rowKey] = "__id_" + i + "_" + new Date().getTime();
                }
            } else {
                row[rowKey] = "__id_" + i + "_" + new Date().getTime();
            }

            keys.push(row[rowKey])
            addedData.push(row)
        }


        if (isAppend === true) {
            newData = data.concat(addedData)
        } else {
            newData = addedData;
        }

        this.changedRows = [];



        this.setState({
            addedData,
            data: newData,
            editKeys: keys,
            isEditing: true,
            isEditAll: false,
            isAdding: false,
            isAddingRange: true,
            changedRows: []
        })



        if (typeof this.props.onAdd === "function") {
            this.props.onAdd(addedData, newData, "add");
        }


    }

    editTools = () => {
        let w = 0;

        let tools = this.props.editTools || [];
        let config = this.props.editToolsConfig || {};

        if (tools.length <= 0) {
            return null;
        }

        let buttons = [];

        let { isEditing } = this.state;

        let itemStyle = config.itemStyle || { marginLeft: 10 };

        let okText = config.okText || "确定";
        let okIcon = config.okIcon || "";
        okIcon = okIcon ? <Icon type={okIcon}></Icon> : null;


        let cancelText = config.cancelText || "取消";
        let cancelIcon = config.cancelIcon || "";
        cancelIcon = cancelIcon ? <Icon type={cancelIcon}></Icon> : null;

        let addText = config.addText || "新增";
        let addIcon = config.addIcon || "";
        addIcon = addIcon ? <Icon type={addIcon}></Icon> : null;


        let editText = config.editText || "编辑";
        let editIcon = config.editIcon || "";
        editIcon = editIcon ? <Icon type={editIcon}></Icon> : null;


        let deleteText = config.deleteText || "删除";
        let deleteIcon = config.deleteIcon || "";
        deleteIcon = deleteIcon ? <Icon type={deleteIcon}></Icon> : null;



        if (isEditing) {
            w = 160;
            buttons.push(<Button key={"_btnOk"} loading={this.state.editSaveLoading} onClick={this.completeEdit} style={itemStyle}>{okIcon}{okText}</Button>)
            buttons.push(<Button key={"_btnCancel"} onClick={this.cancelEdit} style={itemStyle}>{cancelIcon}{cancelText}</Button>)
        } else {

            tools.forEach((d, i) => {
                w += 80;

                const menu = (
                    <Menu onClick={(e) => this.addRange(e.item.props.value)}>
                        <Menu.Item key="1" value={5}>5 行</Menu.Item>
                        <Menu.Item key="2" value={10} >10 行</Menu.Item>
                    </Menu>
                );




                if (d === "addSingle") {

                    buttons.push(<Button key={d + "_1"} onClick={() => this.addRange(1)} style={itemStyle}>{addIcon}{addText}</Button>)

                }

                if (d === "add") {
                    buttons.push(<Dropdown key={d + "_1"} overlay={menu} >
                        <Button tool="add" style={itemStyle} onClick={() => this.addRange()}>
                            {addIcon} {addText}<Icon type="down" />
                        </Button>
                    </Dropdown>)
                }



                if (d === "edit") {
                    buttons.push(<Button key={d + "_1"} onClick={this.edit} style={itemStyle}>{editIcon}{editText}</Button>)
                }


                if (d === "delete") {
                    buttons.push(<Popconfirm key={d} title="确定删除选中的数据吗？" okText="确定" cancelText="取消" onConfirm={this.delete}>
                        <Button style={itemStyle} loading={this.state.deleteLoading} onClick={(e) => { e.stopPropagation(); }}>{deleteIcon}{deleteText}</Button>
                    </Popconfirm>)

                }


                if (typeof d === "function") {
                    buttons.push(<span style={itemStyle} key={"_fnTools_" + i}>{d()}</span>);
                }


                if (typeof d === "object" && d !== null) {
                    let toolIcon = d.icon;
                    toolIcon = toolIcon ? <Icon type={toolIcon}></Icon> : null;
                    let toolAttr = d.props || {};
                    buttons.push(<Button key={"_objTools_" + i} onClick={d.handler} style={itemStyle} {...toolAttr} >{toolIcon}{d.text}</Button>)
                }



            })





        }


        let pagerAttr = this.props.pagination || null;

        let styles = { display: "table-cell", verticalAlign: "middle" }

        if (pagerAttr) {
            styles.width = w;
        }

        if (buttons.length === 0) {
            return null;
        }

        return <div style={styles}>
            {buttons}
        </div>
    }



    getProps = () => {

        let props = this.props || {};
        let newProps = Object.assign({}, props);

        return newProps;
    }

    bottomExtra = () => {

        if (typeof this.props.bottomExtra === "function") {

        }

    }


    createToolBar = () => {

        if (this.props.editToolsConfig && this.props.editToolsConfig.position === "top") {
            let tools = this.editTools();

            if (tools !== null) {
                return <Header style={{ padding: "10px 0", backgroundColor: "#ffffff" }} >{tools}</Header>
            } else {
                return null;
            }
        }

        return null;
    }



    api = {
        editAll: this.editAll,
        addRange: this.addRange,
        delete: this.delete,
        reset: this.reset,
        completeEdit: this.completeEdit,
        cancelEdit: this.cancelEdit,
        isEditing: this.isEditing,
        getData: () => this.state.data
    }

    render() {
        let columns = this.formatColumns();

        let arr = this.state.data;


        let props = this.props;
        let editToolsConfig = this.props.editToolsConfig || {};

        let newProps = {
            dataSource: arr,
            columns,
            hover: true,
            initRef: this.initRef
        };

        if (editToolsConfig.position !== "top") {
            newProps.bottomExtra = this.editTools
        }

        let cls = { height: "100%", width: "100%", backgroundColor: "#ffffff" }

        return <Layout style={cls} data-tableid={this.props.tableId} >
            {this.createToolBar()}
            <Content>
                <Table {...props} {...newProps}
                />
            </Content>
        </Layout>
    }
}



EditableTable.defaultProps = {
    editTools: ['edit', 'add'],
    editToolsConfig: { position: "bottom", itemStyle: { marginLeft: "5px" }, editText: "", editIcon: "", addText: "", addIcon: "", deleteText: "", deleteIcon: "", okText: "", okIcon: "", cancelText: "", cancelIcon: "" },
    defaultAddCount: 1,
    isAppend: false,
    validateTrigger: "onSave",
    validateDelay: 300,
    allowSaveEmpty: false,
    dataControled: false,
    alwaysValidate: false
};



EditableTable.propTypes = {
    /** 工具栏，工具按钮 ['edit', 'add','delete',{icon:"",text:"",props:{},handler:Function},Function] addSingle:单行新增 */
    editTools: PropTypes.array,
    /** 工具栏，工具按钮属性配置{ position: "bottom", itemStyle: { marginLeft: "5px" }, editText: "", editIcon: "", addText: "", addIcon: "", deleteText: "", deleteIcon: "", okText: "", okIcon: "", cancelText: "", cancelIcon: "" } */
    editToolsConfig: PropTypes.object,
    /** 新增行时，是追加，还是清空当前页数据 */
    isAppend: PropTypes.bool,
    /** 新增行时的默认条数 */
    defaultAddCount: PropTypes.number,
    /** 编辑确定事件 */
    onEditSave: PropTypes.func,
    /** 当没有改变行数据时，是否仍然执行onEditSave */
    allowSaveEmpty: PropTypes.bool,

    /** 验证时机 */
    validateTrigger: PropTypes.oneOf(['onChange', 'onBlur', "onSave"]),
    /** 验证延迟时间，当validateTrigger==="onChange"时有效 */
    validateDelay: PropTypes.number,

    /** 新增按钮前置事件，返回false不进入新增状态 */
    onBeforeAdd: PropTypes.func,

    /** 新增按钮事件 */
    onAdd: PropTypes.func,
    /** 编辑取消事件 */
    onCancel: PropTypes.func,

    /** 编辑按钮前置事件，返回false不进入编辑状态 */
    onBeforeEdit: PropTypes.func,

    /** 编辑按钮事件 */
    onEdit: PropTypes.func,

    /** 删除按钮前置事件
     * 返回false 不可删除
     */
    onBeforeDelete: PropTypes.func,

    /**删除按钮事件 */
    onDelete: PropTypes.func,

    /** 无论是否存在输入变化，是否始终验证 */

    alwaysValidate: PropTypes.bool,
    /** 数据是否完全受控，如若受控，请在onEditSave、onCancel中自行更新数据源 */
    dataControled: PropTypes.bool


}


export default EditableTable;