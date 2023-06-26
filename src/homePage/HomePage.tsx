import "./HomePage.scss";
import { Col, Row, Input, Table, Button } from "antd";
import {
  UserOutlined,
  DeleteOutlined,
  FileDoneOutlined,
  FileOutlined,
  ShareAltOutlined,
  ClockCircleOutlined,
  FolderViewOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Column from "antd/es/table/Column";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as userService from "../services/user.service";

HomePage.propTypes = {};

// bỏ ở đây
interface DataType {
  name: string;
  date: Date;
  source: string;
  size: string;
} // bỏ cái này ra ngoài

function HomePage() {
  const [users, setUsers] = useState([]);
  const data: DataType[] = [];

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
    // em đã remove token rồi check if gì nữa , xóa token thì có token nữa đâu mà check =>  làm đi
    // react router chuyển trang
  };

  useEffect(() => {
    const handleLoad = async () => {
      // Thực hiện hành động sau khi trang chính được tải
      if (!localStorage.getItem("accessToken")) {
        navigate("/login"); // react router chuyển trang
      } else if (localStorage.getItem("accessToken")) {
        const result = await userService.getUser(1, 5);
        setUsers(result);
        console.log(result);
      }
    };
    handleLoad();
  }, []);

  return (
    <div>
      <header>
        <Row style={{ margin: "0 20px" }}>
          <Col span={8}>
            <Link to="/">
              <div className="header-title">
                <img
                  src="https://cdn.haitrieu.com/wp-content/uploads/2022/06/Logo-Thanh-Pho-Da-Nang.png"
                  alt="logo DA NANG city"
                />
                <h3>KHO KẾT QUẢ TTHC SỐ</h3>
              </div>
            </Link>
          </Col>
          <Col span={8}>
            <div className="header-search">
              <a href="" className="icon">
                <SearchOutlined />
              </a>
              <input placeholder="Tìm Kiếm" />
            </div>
          </Col>
          <Col span={8}>
            <div className="header-user">
              <UserOutlined
                style={{
                  color: "black",
                  backgroundColor: "white",
                  borderRadius: "50px",
                  padding: "4px",
                }}
              />
              <label htmlFor=""></label>
            </div>
          </Col>
        </Row>
      </header>
      <section>
        <Row>
          <Col span={4}>
            <ul className="list-item">
              <li>
                <FolderViewOutlined />
                <a href="#">Tài liệu cá nhân</a>
              </li>
              <li>
                <FileDoneOutlined />
                <a href="#">Tài liệu kết quả TTHC</a>
              </li>
              <li>
                <FileOutlined />
                <a href="#">Tài liệu thường dùng</a>
              </li>
              <li>
                <ShareAltOutlined />
                <a href="#">Được chia sẻ với tôi</a>
              </li>
              <li>
                <ClockCircleOutlined />
                <a href="#">Chia sẻ gần đây</a>
              </li>
              <li>
                <DeleteOutlined />
                <a href="#">Thùng rác</a>
              </li>
            </ul>
          </Col>
          <Col span={20}>
            <div className="content-right">
              <p className="content-right-title">Tài liệu cá nhân</p>
              <button className="content-right-btn">
                <PlusOutlined />
                <p>Mới</p>
              </button>
            </div>
            <Table dataSource={data}>
              <Column title="Tên thư mục/Tài liệu" dataIndex="name" />
              <Column title="Ngày tải lên" dataIndex="date" />
              <Column title="Nguồn dữ liệu" dataIndex="source" />
              <Column title="Kích cỡ/Mô tả" dataIndex="size" />
            </Table>
            <Button
              style={{ position: "absolute", right: "10px" }}
              onClick={handleLogout}
            >
              Log out
            </Button>
          </Col>
        </Row>
      </section>
    </div>
  );
}

export default HomePage;
