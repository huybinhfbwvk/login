import { lazy, useEffect, useRef, useState } from "react";
import paperService from "../../services/giayTo.service";
import {
  Button,
  Input,
  InputRef,
  Modal,
  Space,
  Switch,
  Table,
  Tooltip,
} from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import { FilterConfirmProps } from "antd/es/table/interface";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import DeletePaperBtn from "../DeleteBtn/DeletePaperBtn";

interface DataType {
  key: React.Key;
  id: number;
  mathutuc: string;
  tenthutuc: string;
  magiayto: string;
  tengiayto: string;
}

type DataIndex = keyof DataType;

interface PaperType {
  id: number;
  matthc: string;
  tenthutuc: string;
  tenTTHC: string;
  maGiayTo: string;
  tenGiayTo: string;
  [index: number]: { donVi: DonViItem };
}

interface DonViItem {
  ten: string;
}

function PaperList() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [paper, setPaper] = useState<PaperType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data: any = await paperService.getPapers({
          currentPage: 1,
          pageSize: 20,
        });
        setPaper(data.result);
        console.log(data.result);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "key",
    },
    {
      title: "Mã thủ tục hành chính",
      dataIndex: "mathutuc",
      // ...getColumnSearchProps("name"),
    },
    {
      title: "Tên thủ tục hành chính",
      dataIndex: "tenthutuc",
    },
    {
      title: "Mã giấy tờ",
      dataIndex: "magiayto",
    },
    {
      title: "Tên giấy tờ ",
      dataIndex: "tengiayto",
    },
    {
      title: "Thao tác",
      dataIndex: "",
      key: "x",
      render: () => (
        <div style={{ width: "80px" }}>
          <Space direction={"horizontal"} wrap>
            <Tooltip title={"Sửa"}>
              <Button type="primary" icon={<EditOutlined />} />
            </Tooltip>

            <DeletePaperBtn icon={<DeleteOutlined />} text="" />
            <Modal
              title="Bạn có chắc xoá item này?"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
            ></Modal>
          </Space>
        </div>
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
          paper
            ? paper.map((item, index) => ({
                key: index + 1,
                id: item.id,
                mathutuc: item.matthc,
                tenthutuc: item.tenTTHC,
                magiayto: item.maGiayTo,
                tengiayto: item.tenGiayTo,
                address: "",
              }))
            : []
        }
        loading={loading}
      />
    </div>
  );
}

export default PaperList;
