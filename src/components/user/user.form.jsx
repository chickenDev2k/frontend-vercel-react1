import { Input, Button, notification, Modal } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/user.api.service";

const UserForm = ({ loadUser }) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmitBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phone);
        if (res?.data) {
            notification.success({
                message: "create user",
                description: "tao user thanh cong",
            });
            resetAndCloseModal();
            await loadUser();

            res;
        } else {
            notification.error({
                message: "error create user",
                description: JSON.stringify(res.message),
            });
        }

        ">>>check state:", { fullName, email, password, phone };
    };

    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
    };
    return (
        <div className="user-form" style={{ margin: "20px " }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Users</h3>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    Create User
                </Button>
            </div>

            <Modal
                title="Basic Modal"
                closable={{ "aria-label": "Custom Close Button" }}
                open={isModalOpen}
                onOk={() => {
                    handleSubmitBtn();
                }}
                onCancel={() => {
                    setIsModalOpen(false);
                }}
                maskClosable={false}
                okText={"CREATE"}>
                <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
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
                        <span>Email</span>
                        <Input
                            value={email}
                            onChange={(val) => {
                                setEmail(val.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password
                            value={password}
                            onChange={(val) => {
                                setPassword(val.target.value);
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
        </div>
    );
};
export default UserForm;
