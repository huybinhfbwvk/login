import React, { useEffect, useRef, useState } from "react";
import "./UserList.module.scss";
import {
  Button,
  Input,
  InputRef,
  Space,
  Switch,
  Table,
  Tooltip,
  message,
  Popconfirm,
  Modal,
  Form,
  InputNumber,
} from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import userService from "../../services/user.service";
import type { FilterConfirmProps } from "antd/es/table/interface";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { arrayBuffer } from "stream/consumers";
import DeleteBtn from "../DeleteBtn/DeleteBtn";

interface DataType {
  key: React.Key;
  id: number;
  username: string;
  name: string;
  age: number;
  department: string;
  address: string;
}

type DataIndex = keyof DataType;

interface UserType {
  user?: any;
  loading?: any;
}

interface ItemType {
  id: number;
  email: string;
  fullName: string;
  [index: number]: { donVi: DonViItem };
}

interface DonViItem {
  ten: string;
}

const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`);
};

const UserList = ({ loading, user = [] }: UserType) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    selectedRows: DataType[]
  ) => {
    console.log(
      "selectedRowKeys changed: ",
      newSelectedRowKeys,
      "selectedRows: ",
      selectedRows
    );
    const idSelected = selectedRows.map((item) => {
      return item.id;
    });
    setSelectedRowKeys(newSelectedRowKeys);
    localStorage.setItem("id", JSON.stringify(idSelected));
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "key",
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Họ tên",
      dataIndex: "name",
    },
    {
      title: "Phòng ban",
      dataIndex: "department",
    },
    {
      title: "Đơn vị",
      dataIndex: "address",
    },
    {
      title: "Email",
      dataIndex: "username",
    },
    {
      title: "Kích hoạt",
      dataIndex: "",
      key: "x",
      render: () => <Switch defaultChecked onChange={onChange} />,
    },
    {
      title: "Thao tác",
      dataIndex: "",
      key: "x",
      render: () => (
        <>
          <Space direction={"horizontal"} wrap>
            <Tooltip title={"Sửa"}>
              <Button type="primary" icon={<EditOutlined />} />
            </Tooltip>
            <DeleteBtn id={10} icon={<DeleteOutlined />} text="" />
          </Space>
          <Modal
            title="Bạn có chắc xoá người dùng này?"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
          ></Modal>
        </>
      ),
    },
  ];

  return (
    <div>
      <span>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
      </span>
      <Table
        bordered
        rowSelection={rowSelection}
        columns={columns}
        dataSource={
          user
            ? user.map((item: ItemType, index: number) => ({
                key: index + 1,
                id: item.id,
                username: item.email,
                name: item.fullName,
                age: 0,
                department: "(Chưa cấu hình)",
                address: "",
              }))
            : []
        }
        loading={loading}
      />
    </div>
  );
};

export default UserList;
