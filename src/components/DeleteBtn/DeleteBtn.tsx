import { useEffect, useState } from "react";
import userDelService from "../../services/userDel.service";
import { Button, Modal, Tooltip, message } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

interface DeleteProps {
  icon: React.ReactNode;
  text: string;
  id?: number;
}

function DeleteBtn({ icon, text, id }: DeleteProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setIsDeleting(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const success = async () => {
    await messageApi.open({
      type: "success",
      content: "Xoá người dùng thành công!",
    });
    window.location.reload();
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Xảy ra lỗi!",
    });
  };

  const idItem = JSON.parse(localStorage.getItem("id") || "[]");

  useEffect(() => {
    if (isDeleting) {
      userDelService
        .delUser({ id: idItem })
        .then((response: any) => {
          // Handle successful delete response here, if needed
          const status = response.status;
          if (status === 200) {
            return success();
          } else {
            return error();
          }
        })
        .catch((error) => {
          // Handle error here, if needed
          console.error("Delete failed:", error);
        })
        .finally(() => {
          setIsDeleting(false);
          localStorage.removeItem("id");
        });
    }
  }, [isDeleting]);

  return (
    <>
      {contextHolder}
      {idItem.length !== 0 ? (
        <Button onClick={openModal} icon={icon} danger>
          {text}
        </Button>
      ) : (
        <Tooltip
          trigger={"click"}
          title={"Please select row of user that u want to delete"}
        >
          <Button icon={icon} danger>
            {text}
          </Button>
        </Tooltip>
      )}
      <Modal
        title="Xoá người dùng?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Xác nhận xoá người dùng đã chọn?
      </Modal>
    </>
  );
}

export default DeleteBtn;
