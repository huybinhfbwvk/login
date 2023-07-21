import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
// import Tippy from "@tippyjs/react/headless";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";

import "./Header.scss";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
    // em đã remove token rồi check if gì nữa , xóa token thì có token nữa đâu mà check =>  làm đi
    // react router chuyển trang
  };

  return (
    <header>
      <Row style={{ margin: "0 20px" }}>
        <Col span={12}>
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
        {/* <Col span={8}>
          <div className="header-search">
            <a href="" className="icon">
              <SearchOutlined />
            </a>
            <input placeholder="Tìm Kiếm" />
          </div>
        </Col> */}
        <Col span={12}>
          <div className="header-user">
            <UserOutlined
              style={{
                color: "black",
                backgroundColor: "white",
                borderRadius: "50px",
                padding: "4px",
              }}
            />
            <Tippy
              duration={500}
              interactive
              arrow="roundArrow"
              placement="bottom-end"
              //offset={[10, 30]}
              render={(attrs) => (
                <div className="box" tabIndex={-1} {...attrs}>
                  <Button
                    style={{ position: "absolute", right: "10px" }}
                    onClick={handleLogout}
                  >
                    Log out
                  </Button>
                </div>
              )}
            >
              <label htmlFor="" style={{ padding: "16px 4px" }}>
                Quản trị hệ thống
              </label>
            </Tippy>
          </div>
        </Col>
      </Row>
    </header>
  );
}

export default Header;
