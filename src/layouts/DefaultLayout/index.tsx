import Header from "../Header";
import Sidebar from "../Sidebar";
import { Col, Row } from "antd";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className={"wrapper"}>
      <Header />
      <section>
        <Row>
          <Col span={4}>
            <Sidebar />
          </Col>
          {children}
        </Row>
      </section>
    </div>
  );
}

export default DefaultLayout;
