import { useEffect, useState } from "react";
import userDelService from "../../services/userDel.service";
import { Button, Modal, Tooltip, message } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import delGiayToService from "../../services/delGiayTo.service";

interface DeletePaperProps {
  icon: React.ReactNode;
  text: string;
}

function DeletePaperBtn({ icon, text }: DeletePaperProps) {
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
      content: "Xoá giấy tờ thành công!",
    });
    window.location.reload();
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Oh no! Its happen some lỗi!",
    });
  };

  const idPaperItem = JSON.parse(localStorage.getItem("id") || "[]");

  useEffect(() => {
    if (isDeleting) {
      delGiayToService
        .delPaper({ id: idPaperItem })
        .then((response: any) => {
          // Handle successful deletePaper response here, if needed
          const status = response.status;
          if (status === 200) {
            return success();
          } else {
            return error();
          }
        })
        .catch((error) => {
          // Handle error here, if needed
          console.error("DeletePaper failed:", error);
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
      {idPaperItem.length !== 0 ? (
        <Button onClick={openModal} icon={icon} danger>
          {text}
        </Button>
      ) : (
        <Tooltip
          trigger={"click"}
          title={"Please select row of paper that u want to delete"}
        >
          <Button icon={icon} danger>
            {text}
          </Button>
        </Tooltip>
      )}
      <Modal
        title="Xoá giấy tờ?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Xác nhận xoá người dùng đã chọn?
      </Modal>
    </>
  );
}

export default DeletePaperBtn;
