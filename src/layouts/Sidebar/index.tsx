import React from "react";
import "./Sidebar.module.scss";
import {
  AppstoreOutlined,
  BranchesOutlined,
  FileOutlined,
  MailOutlined,
  SettingOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("Quản lý dữ liệu", "/QuanLyDuLieu", <FileOutlined />),
  getItem("Định nghĩa dữ liệu", "/DinhNghiaDuLieu", <MailOutlined />),

  getItem("Hệ thống", "sub1", <BranchesOutlined />, [
    getItem("Danh mục giấy tờ", "/DanhMucHeThong"),
    getItem("Quản lý người dùng", "/QuanLyNguoiDung"),
    getItem("Quản lý nhóm người dùng", "/QuanLyNhomNguoiDung"),
    getItem("Quản lý kho trường dữ liệu", "/QuanLyKhoTruongDuLieu"),
    getItem("Quản lý cấp đơn vị", "/QuanLyCapDonVi"),
    getItem("Quản lý đơn vị", "/QuanLyDonVi"),
  ]),

  getItem("Công cụ/Tiện ích", "/CongCuTienIch", <ToolOutlined />),
  getItem("Báo cáo/Thống kê", "/BaoCaoThongKe", <SettingOutlined />),
  getItem("Trợ giúp", "/TroGiup", <AppstoreOutlined />),
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    navigate(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
};

export default Sidebar;
