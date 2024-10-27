import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'; // استيراد SweetAlert
import styles from './EditProduct.module.css'; // استخدام CSS Module للتنسيق

const EditProduct = ({ bookId, onEditComplete }) => {
    const [book, setBook] = useState({
        name: '',
        author: '',
        description: '',
        value: '',
        publishDate: '',
        categoryName: ''
    });

    const [isEditing, setIsEditing] = useState(false); // للتحكم في إظهار/إخفاء النموذج
    const apiEndpoint = `http://mywebsite-bookstore.somee.com/api/Books/${bookId}`;

    // استدعاء بيانات الكتاب
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(apiEndpoint);
                const data = await response.json();
                setBook(data);
            } catch (error) {
                console.error("Error fetching book:", error);
            }
        };
        fetchBook();
    }, [bookId]);

    // تحديث بيانات الحقول
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // إرسال التعديلات باستخدام PUT
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(apiEndpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });
            if (response.ok) {
                // عرض SweetAlert لنجاح العملية
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Book updated successfully!',
                }).then(() => {
                    setIsEditing(false); // إخفاء النموذج بعد التحديث
                    onEditComplete(); // استدعاء الدالة لتحديث قائمة الكتب
                });
            } else {
                // عرض SweetAlert لفشل العملية
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: 'Failed to update the book.',
                });
            }
        } catch (error) {
            console.error('Error updating book:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while updating.',
            });
        }
    };

    return (
        <div className={`container pt-5 ${styles.editProductContainer} `}>
            <h2>Edit Book Details</h2>
            {/* عرض المعلومات في شكل منظم */}
            <div className="card ">
                <div className="card-body">
                    <h5 className="card-title">{book.name}</h5>
                    <p className="card-text"><strong>Author:</strong> {book.author}</p>
                    <p className="card-text"><strong>Description:</strong> {book.description}</p>
                    <p className="card-text"><strong>Value:</strong> {book.value}</p>
                    <p className="card-text"><strong>Publish Date:</strong> {new Date(book.publishDate).toLocaleDateString()}</p>
                    <p className="card-text"><strong>Category:</strong> {book.categoryName}</p>
                    {/* زر لفتح النموذج */}
                    {!isEditing && <button onClick={() => setIsEditing(true)} className="btn btn-warning">Edit</button>}
                </div>
            </div>

            {/* عرض النموذج عند الضغط على زر Edit */}
            {isEditing && (
                <form onSubmit={handleSubmit} className='text-light pb-5'>
                <button type="submit" className="btn btn-primary mb-3">Save Changes</button>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Book Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="name" 
                                value={book.name} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Author</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="author" 
                                value={book.author} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Description</label>
                            <textarea 
                                className="form-control" 
                                name="description" 
                                value={book.description} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Value</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                name="value" 
                                value={book.value} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Publish Date</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                name="publishDate" 
                                value={book.publishDate.split('T')[0]} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Category</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="categoryName" 
                                value={book.categoryName} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>
                </div>
            </form>
            
            )}
        </div>
    );
};

export default EditProduct;
