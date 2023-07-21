import { Col, Row } from "antd";
import UserList from "../../../components/UserList";
import Header from "../../../layouts/Header";
import Sidebar from "../../../layouts/Sidebar";
import NewUserModal from "../../../components/NewUser/newUserModal";
import { useEffect, useState } from "react";
import userService from "../../../services/user.service";

const QuanLyNguoiDung = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data: any = await userService.getUser({
          currentPage: 1,
          pageSize: 14,
        });
        setUser(data.result);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Col span={20}>
        <div className="content-wrapper">
          <div className="content-right">
            <p className="content-right-title">Danh sách người dùng</p>
            <NewUserModal />
          </div>
          <UserList user={user} loading={loading} />
        </div>
      </Col>
    </>
  );
};

export default QuanLyNguoiDung;
