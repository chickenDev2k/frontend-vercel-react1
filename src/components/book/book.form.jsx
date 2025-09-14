import { Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/book.api.service";

const BookForm = ({ fetchBooks }) => {
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState(1);
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("");
    const [image, setImage] = useState();
    const [uploadFile, setUploadFile] = useState();

    const closeShowForm = () => {
        setShowForm(false);
    };
    const onChangeImage = (event) => {
        if (event.target && event.target.files[0]) {
            setUploadFile(event.target.files[0]);
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };
    const resetFrom = () => {
        setTitle();
        setAuthor();
        setPrice();
        setQuantity();
        setCategory();
        setImage();
    };
    const onSubmit = async () => {
        console.log(uploadFile);
        const thumbnail = await handleUploadFile(uploadFile, "book");
        let thumbnailName = "";
        if (thumbnail?.data?.fileUploaded) {
            thumbnailName = thumbnail.data.fileUploaded;
        }
        const res = await createBookAPI(title, author, price, quantity, category, thumbnailName);
        console.log(res);
        if (res) {
            resetFrom();
            closeShowForm();
        }
    };
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Book table</h2>
                <Button
                    type="primary"
                    onClick={() => {
                        setShowForm(true);
                    }}>
                    Create a book
                </Button>
            </div>
            <Modal
                title="Create book"
                closable={true}
                open={showForm}
                onOk={onSubmit}
                onCancel={closeShowForm}
                maskClosable={false}
                okText={"CREATE"}>
                <div>
                    <label htmlFor="">Title</label>
                    <Input
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        value={title}
                    />
                </div>
                <div>
                    <label htmlFor="">Author</label>
                    <Input
                        onChange={(e) => {
                            setAuthor(e.target.value);
                        }}
                        value={author}
                    />
                </div>
                <div>
                    <label htmlFor="">Price</label>
                    <Input
                        onChange={(e) => {
                            setPrice(e.target.value);
                        }}
                        value={price}
                    />
                </div>
                <div>
                    <label htmlFor="">Quantity</label>
                    <Input
                        onChange={(e) => {
                            setQuantity(e.target.value);
                        }}
                        value={quantity}
                    />
                </div>
                <div>
                    <label htmlFor="">Category</label>
                    <Input
                        onChange={(e) => {
                            setCategory(e.target.value);
                        }}
                        value={category}
                    />
                </div>
                <div>
                    <p>Thumbnail Image</p>
                    <br />
                    <label
                        htmlFor="upload-thumbnail"
                        style={{
                            backgroundColor: "orange",
                            color: "black",
                            padding: "10px 20px",
                            borderRadius: "5px",
                            border: "none",
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
                    {image ? (
                        <div style={{ marginTop: "30px" }} id="preview image">
                            <img src={image} alt="" width={300} />
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export { BookForm };
