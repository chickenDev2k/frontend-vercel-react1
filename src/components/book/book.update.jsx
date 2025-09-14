import { Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookAPI } from "../../services/book.api.service";

const BookUpdate = (props) => {
    const { updateModalShow, setUpdateModalShow, bookUpdate, fetchBooks } = props;
    const [id, setId] = useState();
    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [category, setCategory] = useState();
    const [image, setImage] = useState();
    const [uploadFile, setUploadFile] = useState();
    const [isUpdateImage, setIsUpdateImage] = useState(false);

    const closeModal = () => {
        setUpdateModalShow(false);
    };

    const onChangeImage = (event) => {
        setIsUpdateImage(true);
        if (event.target && event.target.files[0]) {
            setUploadFile(event.target.files[0]);
            setImage(URL.createObjectURL(event.target.files[0]));
            console.log("CHECK onchange iamge", image);
        }
    };

    const updateBook = async () => {
        let imageName = "";
        if (isUpdateImage) {
            const thumbnail = await handleUploadFile(uploadFile, "book");

            if (thumbnail?.data?.fileUploaded) {
                imageName = thumbnail.data.fileUploaded;
                setImage(thumbnail.data.fileUploaded);
            }
        }

        const res = await updateBookAPI(
            title,
            author,
            price,
            quantity,
            category,
            imageName,
            bookUpdate.id
        );
        console.log(res);
        if (res) {
            message.success("success to update book");
            fetchBooks();
            closeModal();
        }
    };

    return (
        <div>
            <Modal
                title="Book update"
                closable={true}
                open={updateModalShow}
                onOk={updateBook}
                onCancel={closeModal}>
                <div>
                    <label htmlFor="">Id</label>
                    <Input value={id ? id : bookUpdate.id} disabled />
                </div>
                <div>
                    <label htmlFor="">Title</label>
                    <Input
                        value={title ? title : bookUpdate.title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="">Author</label>
                    <Input
                        value={author ? author : bookUpdate.author}
                        onChange={(e) => {
                            setAuthor(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="">Price</label>
                    <Input
                        value={price ? price : bookUpdate.price}
                        onChange={(e) => {
                            setPrice(+e.target.value);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="">Quantity</label>
                    <Input
                        value={quantity ? quantity : bookUpdate.quantity}
                        onChange={(e) => {
                            setQuantity(+e.target.value);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="">Category</label>
                    <Input
                        value={category ? category : bookUpdate.category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <p>Current Thumbnail Image</p>
                    <div>
                        <img
                            src={`http://localhost:8080/images/book/${bookUpdate.thumbnail}`}
                            alt=""
                            width={150}
                        />
                    </div>
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
                        Upload new image
                    </label>

                    <Input
                        type="file"
                        id="upload-thumbnail"
                        style={{ display: "none" }}
                        onChange={onChangeImage}
                    />

                    {image ? (
                        <div style={{ marginTop: "30px" }} id="preview image">
                            <img src={image} alt="" width={150} />
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default BookUpdate;
