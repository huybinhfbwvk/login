import { Col, Row } from "antd";
import Header from "../../../layouts/Header";
import Sidebar from "../../../layouts/Sidebar";
import PaperList from "../../../components/PaperList/PaperList";
import NewPaper from "../../../components/NewPaper/NewPaper";
import DeletePaperBtn from "../../../components/DeleteBtn/DeletePaperBtn";

const DanhMucGiayTo = () => {
  return (
    <>
      <Col span={20}>
        <div className="content-wrapper">
          <div className="content-right">
            <p className="content-right-title">Danh sách giấy tờ</p>
            <NewPaper />
          </div>
          <PaperList />
        </div>
      </Col>
    </>
  );
};

export default DanhMucGiayTo;
