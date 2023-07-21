import { MinusCircleOutlined, PlusCircleFilled } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import unitService from "../../services/donVi.service";
import phongBanService from "../../services/phongBan.service";
import "./newUserModal.module.scss";
import DeleteBtn from "../DeleteBtn/DeleteBtn";
import userGroupService from "../../services/userGroup.service";
import userCreateService from "../../services/userCreate.service";
import capDonViService from "../../services/capDonVi.service";

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

interface User {
  fullName: string;
  sub: string;
  email: string;
  donVi: {
    id: number;
  };
  donViBackup: {
    id: number;
  };
  isQuanTri: boolean;
  isRoot: boolean;
  sdt: string;
  groupCode: string[];
  username: string;
  password: string;
}

const { Option } = Select;

const NewUserModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unit, setUnit] = useState([]);
  const [unitLevel, setUnitLevel] = useState([]);
  const [userGroup, setUserGroup] = useState([]);
  const [phongBan, setPhongBan] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const unitData = unitService.getUnit({
          currentPage: 1,
          pageSize: 14,
        });

        const unitLevelData = capDonViService.getUnitLevel();

        const phongBanData = phongBanService.getPhongBan({
          currentPage: 1,
          pageSize: 14,
        });

        const userGroupData = userGroupService.getUserGroup({
          itemPerPage: 10,
          page: 1,
        });

        const [unit, unitLevel, phongBan, userGroup] = await Promise.all([
          unitData,
          unitLevelData,
          phongBanData,
          userGroupData,
        ]);

        setUnit(unit.items);
        setUnitLevel(unitLevel);
        setPhongBan(phongBan);
        setUserGroup(userGroup);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();

  const onFinish = async (values: User) => {
    let data = JSON.stringify({
      account: {
        fullName: values.fullName,
        sub: values.username,
        email: values.email,
        donVi: {
          id: values.donVi,
        },
        donViBackup: {
          id: values.donViBackup,
        },
        isQuanTri: values.isQuanTri,
        isRoot: values.isQuanTri,
        sdt: "",
      },
      groupCode: [values.groupCode],
      username: values.username,
      password: values.password,
    });
    try {
      const response = await userCreateService.CreateUser({
        data: data,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 9 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <>
      <Space>
        <DeleteBtn icon={<MinusCircleOutlined />} text="Xoá" />
        <Button type="primary" onClick={showModal}>
          <PlusCircleFilled /> Thêm Mới
        </Button>
      </Space>
      <Modal
        title="Thêm người dùng"
        width={"720px"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          style={{ maxWidth: 720 }}
          scrollToFirstError
        >
          <div className="add-form" style={{ display: "flex", width: "800px" }}>
            <div className="left-form" style={{ width: "400px" }}>
              <Form.Item
                name="fullName"
                label="Họ và tên"
                rules={[
                  {
                    required: true,
                    message: "Please input your Họ và tên!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="username"
                label="Tên đăng nhập"
                rules={[
                  {
                    required: true,
                    message: "Please input your tên đăng nhập!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="groupCode"
                label="Nhóm người dùng"
                rules={[
                  {
                    required: true,
                    message: "Please select your nhóm người dùng!",
                  },
                ]}
              >
                <Select placeholder="--- Chọn nhóm người dùng ---">
                  {userGroup.map((item: any) => (
                    <Option key={item.id} value={item.groupCode}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Checkbox />
              <Form.Item
                name="isQuanTri"
                label="Quyền quản trị đơn vị"
                initialValue={false}
              ></Form.Item>
            </div>

            <div className="right-form" style={{ width: "400px" }}>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item name="sdt" label="Số điện thoại">
                <Input addonBefore="+84" placeholder="Your Phone Number" />
              </Form.Item>

              <Form.Item name="Chức vụ" label="Chức vụ">
                <Input placeholder="Your chức vụ " />
              </Form.Item>

              <Form.Item
                name="donVi"
                label="Đơn vị"
                rules={[
                  { required: true, message: "Please choose your đơn vị!" },
                ]}
              >
                <Select placeholder="--- Chọn đơn vị ---">
                  {unit.map((item: any) => (
                    <Option key={item.id} value={item.id}>
                      {item.ten}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="Phòng ban"
                label="Phòng ban"
                rules={[
                  { required: true, message: "Please choose your phòng ban" },
                ]}
              >
                <Select placeholder="--- Chọn phòng ban ---">
                  {phongBan.map((item: any) => (
                    <Option key={item.id} value={item.id}>
                      {item.tendonvi}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="donViBackup"
                label="Cấp/Đơn vị mở rộng"
                rules={[
                  {
                    required: true,
                    message: "Please choose your đơn vị mở rộng",
                  },
                ]}
              >
                <Select placeholder="--- Chọn đơn vị mở rộng ---">
                  {unitLevel.map((item: any) => (
                    <Option key={item.id} value={item.id}>
                      {item.ten}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>

          <Form.Item {...tailFormItemLayout}>
            <div className="submit-form">
              <Button type="primary" htmlType="submit" onClick={handleOk}>
                Thêm người mới
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default NewUserModal;
