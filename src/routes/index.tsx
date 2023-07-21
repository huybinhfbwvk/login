// Layout
import HeaderOnly from "../layouts/HeaderOnly";
import routesConfig from "../config/route";
import { Route, Routes } from "react-router-dom";

// Pages
import BaoCaoThongKe from "../pages/BaoCaoThongKe";
import CongCuTienIch from "../pages/CongCuTienIch";
import DinhNghiaDuLieu from "../pages/DinhNghiaDuLieu";
import DanhMucHeThong from "../pages/HeThong/DanhMucGiayTo";
import QuanLyCapDonVi from "../pages/HeThong/QuanLyCapDonVi";
import QuanLyDonVi from "../pages/HeThong/QuanLyDonVi";
import QuanLyKhoTruongDuLieu from "../pages/HeThong/QuanLyKhoTruongDuLieu";
import QuanLyNguoiDung from "../pages/HeThong/QuanLyNguoiDung";
import QuanLyNhomNguoiDung from "../pages/HeThong/QuanLyNhomNguoiDung";
import QuanLyDuLieu from "../pages/QuanLyDuLieu";
import TroGiup from "../pages/TroGiup";
import HomePage from "../homePage/HomePage";
import Login from "../login/Login";
// Public Routes

import React from "react";
import PropTypes from "prop-types";

// function PrivateRoutes() {
//   return (
//     <Routes>
//       <Route path="/" Component={HomePage} />
//       <Route path="/login" Component={Login} />
//       <Route path="/QuanLyNguoiDung" Component={QuanLyNguoiDung} />
//       <Route path="/QuanLyNhomNguoiDung" Component={QuanLyNhomNguoiDung} />
//       <Route path="/BaoCaoThongKe" Component={BaoCaoThongKe} />
//       <Route path="/QuanLyDuLieu" Component={QuanLyDuLieu} />
//       <Route path="/DinhNghiaDuLieu" Component={DinhNghiaDuLieu} />
//       <Route path="/CongCuTienIch" Component={CongCuTienIch} />
//       <Route path="/DanhMucHeThong" Component={DanhMucHeThong} />
//       <Route path="/QuanLyCapDonVi" Component={QuanLyCapDonVi} />
//       <Route path="/QuanLyDonVi" Component={QuanLyDonVi} />
//       <Route path="/QuanLyKhoTruongDuLieu" Component={QuanLyKhoTruongDuLieu} />
//       <Route path="/TroGiup" Component={TroGiup} />
//     </Routes>
//   );
// }

const PrivateRoutes = [
  { path: "/", component: HomePage },
  { path: "/login", component: Login, layout: Login },
  { path: "/QuanLyNguoiDung", component: QuanLyNguoiDung },
  { path: "/QuanLyNhomNguoiDung", component: QuanLyNhomNguoiDung },
  { path: "/BaoCaoThongKe", component: BaoCaoThongKe },
  { path: "/QuanLyDuLieu", component: QuanLyDuLieu },
  { path: "/DinhNghiaDuLieu", component: DinhNghiaDuLieu },
  { path: "/CongCuTienIch", component: CongCuTienIch },
  { path: "/DanhMucHeThong", component: DanhMucHeThong },
  { path: "/QuanLyCapDonVi", component: QuanLyCapDonVi },
  { path: "/QuanLyDonVi", component: QuanLyDonVi },
  { path: "/QuanLyKhoTruongDuLieu", component: QuanLyKhoTruongDuLieu },
  { path: "/TroGiup", component: TroGiup },
];

export default PrivateRoutes;
