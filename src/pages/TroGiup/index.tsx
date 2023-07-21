import { Col, Row, Space } from "antd";

const TroGiup = () => {
  return (
    <>
      <Col span={20}>
        <div className="content-wrapper">
          <div className="content-right">
            <p className="content-right-title">Trợ giúp</p>
          </div>
          <div className="content-helps" style={{ display: "flex" }}>
            <Space align="start" direction="vertical">
              <p>
                <a href="#">1. Bộ cài đặt ký số UNI.</a>
              </p>
              <p>
                <a href="#">2. Hướng dẫn cài đặt ký số.</a>
              </p>
              <p>
                <a href="#">3. Hướng dẫn dành cho quản trị hệ thống.</a>
              </p>
              <p>
                <a href="#">4. Hướng dẫn dành cho cán bộ số hóa.</a>
              </p>
            </Space>
          </div>
        </div>
      </Col>
    </>
  );
};

export default TroGiup;
