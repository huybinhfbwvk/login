import { MinusCircleOutlined, PlusCircleFilled } from "@ant-design/icons";
import { Button, Form, Input, Modal, Space } from "antd";
import React, { useEffect, useState } from "react";
import "./NewPaper.module.scss";
import DeletePaperBtn from "../DeleteBtn/DeletePaperBtn";
import addGiayToService from "../../services/addGiayTo.service";

const NewPaper: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const value = JSON.stringify(values);
    try {
      const response = await addGiayToService.AddPaper({
        data: value,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
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
        <DeletePaperBtn icon={<MinusCircleOutlined />} text="Xoá" />
        <Button type="primary" onClick={showModal}>
          <PlusCircleFilled /> Thêm Mới
        </Button>
      </Space>

      <Modal
        title="Thêm loại giấy tờ"
        width={"500px"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          {...formItemLayout}
          form={form}
          name="AddPaper"
          onFinish={onFinish}
          layout="horizontal"
          style={{ maxWidth: 500 }}
          scrollToFirstError
        >
          <Form.Item
            name="matthc"
            label="Mã thủ tục"
            rules={[
              {
                required: true,
                message: "Please input your mã thủ tục!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="maGiayTo"
            label="Mã giấy tờ"
            rules={[
              {
                required: true,
                message: "Please input your mã giấy tờ!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="tenGiayTo"
            label="Tên giấy tờ"
            rules={[
              {
                required: true,
                message: "Please input your tên giấy tờ!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="tenTTHC"
            label="Tên thủ tục"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please fill in your tên thủ tục!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="tenTep" label="Tên tệp">
            <Input />
          </Form.Item>
          <Form.Item name="url" label="Đường dẫn">
            <Input />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <div className="submit-form">
              <Button type="primary" htmlType="submit">
                Add Paper
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default NewPaper;
