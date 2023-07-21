import { Col, Row } from "antd";
import UserList from "../../../components/UserList";
import Header from "../../../layouts/Header";
import Sidebar from "../../../layouts/Sidebar";
import NewUserModal from "../../../components/NewUser/newUserModal";

const QuanLyNhomNguoiDung = () => {
  return (
    <>
      <Col span={20}>
        <div className="content-wrapper">
          <div className="content-right">
            <p className="content-right-title">Danh sách nhóm người dùng</p>
          </div>
        </div>
      </Col>
    </>
  );
};

export default QuanLyNhomNguoiDung;
