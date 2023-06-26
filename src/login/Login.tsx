import "./Login.scss";
import "./Responsive.scss";

import { LoginOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Row, notification } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login } from "../action/auth";

function Login() {
  const [api, contextHolder] = notification.useNotification();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { isLoggedIn } = useSelector((state: store) => state.auth);
  // const { message } = useSelector((state: store) => state.message);

  const onChangeUsername = (e: any) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangePassword = (e: any) => {
    const password = e.target.value;
    setPassword(password);
  };

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Thong bao dang nhap`,
      description: "Dang nhap thanh cong",
      placement,
    });
  };

  const handleLogin = (e: any) => {
    e.preventDefault();

    AuthService.login(username, password).then((data) => {
      localStorage.setItem("accessToken", data.data.token);
      if (localStorage.getItem("accessToken")) {
        navigate("/"); // chỗ này dùng react router mà chuyển trang
      }
    });
  };

  return (
    <div className="App">
      <Row style={{ height: "100%" }}>
        <Col span={12} xs={24} sm={12}>
          <div className="register register-left">
            <div className="title">
              <img
                src="https://cdn.haitrieu.com/wp-content/uploads/2022/06/Logo-Thanh-Pho-Da-Nang.png"
                alt="logo DA NANG city"
              />
              <h2>KHO KẾT QUẢ THỦ TỤC HÀNH CHÍNH SỐ</h2>
            </div>

            <Form
              className="validate"
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 0 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <Form.Item
                label="Tên đăng nhập"
                name="username"
                rules={[
                  { required: true, message: "Vui lòng nhập tên đăng nhập!" },
                ]}
              >
                <Input onChange={onChangeUsername} />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password onChange={onChangePassword} />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 0, span: 11 }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 0, span: 0 }}>
                {contextHolder}
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  onClick={(e) => {
                    openNotification("top");
                    handleLogin(e);
                  }}
                >
                  <LoginOutlined />
                  Đăng nhập
                </Button>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 0, span: 0 }}>
                <Button
                  htmlType="submit"
                  style={{
                    width: "100%",
                    backgroundColor: "#ff8f18",
                  }}
                  type="primary"
                >
                  Đăng nhập bằng tài khoản công dân số
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Col span={12} xs={24} sm={12} className="col-right">
          <div className="register register-right"></div>
        </Col>
      </Row>
    </div>
  );

  function newFunction() {
    const [api, contextHolder] = notification.useNotification();
    const Context = React.createContext({ name: "Default" });
    const openNotification = (placement: NotificationPlacement) => {
      api.info({
        message: `Notification ${placement}`,
        description: (
          <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>
        ),
        placement,
      });
    };
    return openNotification;
  }
}

export default Login;
