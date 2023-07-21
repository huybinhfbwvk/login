import {
  ClockCircleOutlined,
  DeleteOutlined,
  FileDoneOutlined,
  FileOutlined,
  PlusOutlined,
  SearchOutlined,
  ShareAltOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Table } from "antd";
import Column from "antd/es/table/Column";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as userService from "../services/user.service";
import "./HomePage.scss";
import Sidebar from "../layouts/Sidebar";
import UserList from "../components/UserList";
import Header from "../layouts/Header";

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

  useEffect(() => {
    const handleLoad = async () => {
      // Thực hiện hành động sau khi trang chính được tải
      if (!localStorage.getItem("accessToken")) {
        navigate("/login"); // react router chuyển trang
      } else if (localStorage.getItem("accessToken")) {
        //const result: any = await userService.getUser();
        // setUsers(result);
      }
    };
    handleLoad();
  }, []);

  return (
    <div>
      {/* <Header />
      <section>
        <Row>
          <Col span={4}>
            <Sidebar />
          </Col>
          {/* <Col span={20}>
            <div className="content-wrapper">
              <div className="content-right">
                <p className="content-right-title">Danh sách người dùng</p>
                <button className="content-right-btn">
                  <PlusOutlined />
                  <p>Mới</p>
                </button>
              </div>
              <UserList />
            </div>
          </Col> 
         </Row> 
      </section> */}
    </div>
  );
}

export default HomePage;
