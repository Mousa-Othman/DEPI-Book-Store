import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const DeleteBook = ({ bookId, onDeleteComplete, onClose }) => {
    const handleDelete = async () => {
        // عرض SweetAlert لتأكيد الحذف
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (confirmDelete.isConfirmed) {
            try {
                const response = await axios.delete(`http://mywebsite-bookstore.somee.com/api/Books/${bookId}`);
                if (response.status === 200) {
                    // عرض رسالة تأكيد النجاح
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'The book has been deleted successfully.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    onDeleteComplete(bookId); // استدعاء الدالة الممررة لتحديث الحالة في App.js
                    onClose(); // إغلاق مكون الحذف
                }
            } catch (error) {
                console.error("Error deleting book:", error);
                // عرض رسالة تحذير عند حدوث خطأ
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to delete the book. Please try again.',
                    confirmButtonText: 'OK',
                });
            }
        }
    };

    return (
        <div className="delete-book-modal">
            {/* <h4>Are you sure you want to delete this book?</h4> */}
            <button onClick={handleDelete} className="btn btn-danger">Delete</button>
            <button onClick={onClose} className="btn btn-secondary">Cancel</button>
        </div>
    );
};

export default DeleteBook;
