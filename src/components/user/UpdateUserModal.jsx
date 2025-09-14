import { Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";

import { updateUserAPI } from "../../services/user.api.service";

const UpdateUserModal = ({
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    dataUpdate,
    setDataUpdate,
    loadUser,
}) => {
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id);
            setFullName(dataUpdate.fullName);
            setPhone(dataUpdate.phone);
        }
    }, [dataUpdate]);

    const handleSubmitBtn = async () => {
        const res = await updateUserAPI(id, fullName, phone);
        if (res?.data) {
            notification.success({
                message: "updated user",
                description: "cap nhat user thanh cong",
            });
            resetAndCloseModal();
            await loadUser();

            res;
        } else {
            notification.error({
                message: "error update user",
                description: JSON.stringify(res.message),
            });
        }

        ">>>check state:", { fullName, email, password, phone };
    };

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setDataUpdate(null);
    };

    return (
        <Modal
            title="Update a User"
            closable={{ "aria-label": "Custom Close Button" }}
            open={isModalUpdateOpen}
            onOk={() => {
                handleSubmitBtn();
            }}
            onCancel={() => {
                setIsModalUpdateOpen(false);
            }}
            maskClosable={false}
            okText={"Save"}>
            <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
                <div style={{ display: "disable" }}>
                    <span>Id</span>
                    <Input value={id} disabled />
                </div>
                <div>
                    <span>FullName</span>
                    <Input
                        value={fullName}
                        onChange={(val) => {
                            setFullName(val.target.value);
                        }}
                    />
                </div>

                <div>
                    <span>Phone Number</span>
                    <Input
                        value={phone}
                        onChange={(val) => {
                            setPhone(val.target.value);
                        }}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default UpdateUserModal;
