import { useEffect, useState } from "react";
import { Drawer, Input, notification } from "antd";
import { Button } from "antd/es/radio";
import { handleUploadFile, updateUserAvatarAPI } from "../../services/user.api.service";

const ViewUserDetail = ({ userDetail, setUserDetail, isShowDetail, setIsShowDetail, loadUser }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    useEffect(() => {}, [userDetail]);
    const onClose = () => {
        setIsShowDetail(false);
        setUserDetail(null);
    };

    const handleOnChangeFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };
    const handleUpdateUserAvatar = async () => {
        //upload file

        const resUpload = await handleUploadFile(selectedFile, "avatar");
        if (resUpload) {
            //success
            const newAvatar = resUpload.data.fileUploaded;
            //upload user

            //call api with axios
            const resUpdateUserAvatar = await updateUserAvatarAPI(
                userDetail._id,
                userDetail.fullName,
                userDetail.phone,
                newAvatar
            );

            //at success
            if (resUpdateUserAvatar?.data) {
                onClose();
                setSelectedFile(null);
                setPreview(null);
                loadUser();
                notification.success({
                    message: "update user avatar",
                    description: "cap nhat user avatar thanh cong",
                });
            } else {
                notification.error({
                    message: "Error update avatar",
                    description: JSON.stringify(resUpdateUserAvatar.message),
                });
            }
        } else {
            //failed
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message),
            });
        }

        //update
    };

    preview;
    return (
        <>
            <Drawer
                width={"40vw"}
                title="Chi tiet User"
                closable={true}
                onClose={onClose}
                open={isShowDetail}>
                {userDetail ? (
                    <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
                        <p>Id: {userDetail._id}</p>
                        <br />
                        <p>FullName: {userDetail.fullName}</p> <br />
                        <p>Email: {userDetail.email}</p> <br />
                        <p>Phone: {userDetail.phone}</p> <br />
                        Avater:
                        <div
                            style={{
                                height: "200px",
                                width: "200px",
                                objectFit: "contain",
                            }}>
                            <img
                                style={{ width: "100%", border: "solid 4px gray" }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
                                    userDetail.avatar
                                }`}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="btnUpload"
                                style={{
                                    cursor: "pointer",
                                    backgroundColor: "blue",
                                    color: "white",
                                    display: "inline-block",
                                    padding: "15px 15px ",
                                    borderRadius: "10px",
                                }}>
                                Upload avatar
                            </label>
                            <input
                                onChange={(e) => {
                                    handleOnChangeFile(e);
                                }}
                                type="file"
                                id="btnUpload"
                                hidden
                            />
                        </div>
                        {preview && (
                            <>
                                <div
                                    style={{
                                        height: "200px",
                                        width: "200px",
                                        objectFit: "contain",
                                    }}>
                                    <img
                                        style={{ width: "100%", border: "solid 4px gray" }}
                                        src={`${preview}`}
                                        alt=""
                                    />
                                </div>
                                <Button
                                    onClick={handleUpdateUserAvatar}
                                    role="button"
                                    style={{
                                        cursor: "pointer",
                                        backgroundColor: "green",
                                        color: "white",
                                        display: "inline-block",
                                        paddingTop: "10px",
                                        textAlign: "center",
                                        width: "100px",
                                        height: "50px",
                                        borderRadius: "10px",
                                    }}>
                                    Save
                                </Button>
                            </>
                        )}
                        {/* <Button type>Upload avatar</Button> */}
                    </div>
                ) : (
                    <>not user data</>
                )}
            </Drawer>
        </>
    );
};

export default ViewUserDetail;
