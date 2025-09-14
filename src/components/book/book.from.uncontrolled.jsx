import { Button, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/book.api.service";

const BookFormUncontrolled = ({ fetchBooks }) => {
    const [showForm, setShowForm] = useState(false);
    const [uploadFile, setUploadFile] = useState(null);
    const [image, setImage] = useState(null);

    const [form] = Form.useForm();

    const closeShowForm = () => {
        setShowForm(false);
        form.resetFields();
        setUploadFile(null);
        setImage(null);
    };

    const onChangeImage = (event) => {
        if (event.target && event.target.files[0]) {
            setUploadFile(event.target.files[0]);
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    const onSubmit = async () => {
        try {
            const values = await form.validateFields();
            let { title, author, price, quantity, category } = values;

            // ép kiểu về số nguyên
            price = parseInt(price, 10);
            quantity = parseInt(quantity, 10);
            // upload file trước
            if (!uploadFile) {
                Modal.error({
                    title: "Thiếu thumbnail",
                    content: "Vui lòng upload ảnh trước khi tạo sách!",
                });
                return;
            }
            let thumbnailName = "";
            if (uploadFile) {
                const thumbnail = await handleUploadFile(uploadFile, "book");
                if (thumbnail?.data?.fileUploaded) {
                    thumbnailName = thumbnail.data.fileUploaded;
                }
            }

            const res = await createBookAPI(
                title,
                author,
                price,
                quantity,
                category,
                thumbnailName
            );
            console.log(">>> Create result:", res);

            if (res) {
                fetchBooks?.(); // gọi lại danh sách
                closeShowForm();
            }
        } catch (error) {
            console.error("Form validation failed:", error);
        }
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Book table</h2>
                <Button type="primary" onClick={() => setShowForm(true)}>
                    Create a book
                </Button>
            </div>

            <Modal
                title="Create book"
                closable
                open={showForm}
                onOk={onSubmit}
                onCancel={closeShowForm}
                maskClosable={false}
                okText="CREATE">
                <Form form={form} layout="vertical" name="create-book" autoComplete="off">
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: "Please input book title!" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Author"
                        name="author"
                        rules={[{ required: true, message: "Please input author!" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: "Please input price!" }]}>
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[{ required: true, message: "Please input quantity!" }]}>
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{ required: true, message: "Please select category!" }]}>
                        <Select
                            placeholder="Select a category"
                            options={[
                                { value: "Teen", label: "Teen" },
                                { value: "Entertainment", label: "Entertainment" },
                                { value: "History", label: "History" },
                                { value: "Business", label: "Business" },
                                { value: "Music", label: "Music" },
                                { value: "Comics", label: "Comics" },
                                { value: "Arts", label: "Arts" },
                                { value: "Cooking", label: "Cooking" },
                                { value: "Sports", label: "Sports" },
                                { value: "Travel", label: "Travel" },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item label="Thumbnail" name="thumbnail">
                        <div>
                            <label
                                htmlFor="upload-thumbnail"
                                style={{
                                    backgroundColor: "orange",
                                    color: "black",
                                    padding: "10px 20px",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}>
                                Upload
                            </label>
                            <Input
                                type="file"
                                id="upload-thumbnail"
                                style={{ display: "none" }}
                                onChange={onChangeImage}
                            />
                            {image && (
                                <div style={{ marginTop: "20px" }}>
                                    <img src={image} alt="preview" width={250} />
                                </div>
                            )}
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export { BookFormUncontrolled };
