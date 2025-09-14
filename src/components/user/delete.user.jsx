import { Button, notification, Popconfirm } from "antd";
import { deleteUserAPI } from "../../services/user.api.service";
import { DeleteOutlined } from "@ant-design/icons";

const DeleteUser = ({ userDetail, loadUser }) => {
    const confirm = async (id) => {
        const res = await deleteUserAPI(id);
        if (res?.data) {
            notification.success({
                message: "deleted  user",
                description: "xoa user thanh cong",
            });

            await loadUser();

            res;
        } else {
            notification.error({
                message: "error delete user",
                description: JSON.stringify(res.message),
            });
        }
    };
    const cancel = () => {};
    return (
        <Popconfirm
            title="Delete user"
            description="Are you sure to delete this user?"
            onConfirm={async () => {
                confirm(userDetail?._id);
            }}
            onCancel={cancel}
            okText="Delete"
            cancelText="Cancel">
            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
        </Popconfirm>
    );
};

export default DeleteUser;
