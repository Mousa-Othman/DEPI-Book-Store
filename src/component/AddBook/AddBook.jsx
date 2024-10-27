import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // استيراد SweetAlert
import styles from './AddBook.module.css';

class AddBook extends Component {
    state = {
        categories: [], // قائمة الفئات المسترجعة من الباك
        categoryId: '', // الفئة المحددة
        name: '',
        author: '',
        description: '',
        value: 0,
        publishDate: new Date().toISOString().slice(0, 10),
    };

    // جلب الفئات عند تحميل المكون
    componentDidMount() {
        this.fetchCategories();
    }

    fetchCategories = async () => {
        try {
            const response = await axios.get('http://mywebsite-bookstore.somee.com/api/Categories'); // Endpoint الخاص بجلب الفئات
            this.setState({ categories: response.data });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to fetch categories. Try again.',
                confirmButtonText: 'OK',
            });
        }
    };

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { categoryId, name, author, description, value, publishDate } = this.state;

        // التأكد من أن categoryId تم اختياره بشكل صحيح
        if (!categoryId) {
            Swal.fire({
                icon: 'warning',
                title: 'Warning!',
                text: 'يرجى اختيار فئة الكتاب.',
                confirmButtonText: 'OK',
            });
            return;
        }

        try {
            const response = await axios.post('http://mywebsite-bookstore.somee.com/api/Books', {
                categoryId,
                name,
                author,
                description,
                value,
                publishDate,
            });

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: '!The book has been added successfully',
                showConfirmButton: false,
                timer: 1500,
            });

            this.props.onBookAdded(response.data); // إرسال الكتاب الجديد إلى المكون الأعلى

            // إعادة تعيين الحقول بعد الإضافة الناجحة
            this.setState({ 
                name: '', 
                author: '', 
                description: '', 
                value: 0, 
                publishDate: new Date().toISOString().slice(0, 10),
                categoryId: ''
            });

        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to add book. Try again.',
                confirmButtonText: 'OK',
            });
        }
    };

    render() {
        const { name, author, description, value, publishDate, categoryId, categories } = this.state;

        return (
            <div className={`card ${styles['add-book']} bg-info`} style={{ minHeight: '100vh' }}>
                <h2 className="card-header">Addition Book</h2>
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <form onSubmit={this.handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div className="form-group" style={{ minHeight: '80px' }}>
                        <label htmlFor="categoryId">CategoryId</label>
                        <select
                        name="categoryId"
                        className="form-control"
                        value={categoryId}
                        onChange={this.handleInputChange}
                        required
                        >
                        <option value="">Select category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                            {category.name}
                            </option>
                        ))}
                        </select>
                    </div>

                    <div className="form-group" style={{ minHeight: '80px' }}>
                        <label htmlFor="name">Name Book</label>
                        <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={name}
                        onChange={this.handleInputChange}
                        placeholder="Name Book"
                        required
                        />
                    </div>

                    <div className="form-group" style={{ minHeight: '80px' }}>
                        <label htmlFor="author">Author</label>
                        <input
                        type="text"
                        name="author"
                        className="form-control"
                        value={author}
                        onChange={this.handleInputChange}
                        placeholder="Author"
                        required
                        />
                    </div>

                    <div className="form-group" style={{ minHeight: '80px' }}>
                        <label htmlFor="description">Description</label>
                        <textarea
                        name="description"
                        className="form-control"
                        value={description}
                        onChange={this.handleInputChange}
                        placeholder="Description"
                        required
                        ></textarea>
                    </div>

                    <div className="form-group" style={{ minHeight: '80px' }}>
                        <label htmlFor="value">Value</label>
                        <input
                        type="number"
                        name="value"
                        className="form-control"
                        value={value}
                        onChange={this.handleInputChange}
                        placeholder="Value"
                        required
                        />
                    </div>

                    <div className="form-group" style={{ minHeight: '80px' }}>
                        <label htmlFor="publishDate">Publish Date</label>
                        <input
                        type="date"
                        name="publishDate"
                        className="form-control"
                        value={publishDate}
                        onChange={this.handleInputChange}
                        required
                        />
                    </div>

                    <button type="submit" className="btn btn-secondary" style={{ gridColumn: '1 / span 2', justifySelf: 'center' }}>
                        Add
                    </button>
                    </form>
                </div>
        </div>

        );
    }
}

export default AddBook;
