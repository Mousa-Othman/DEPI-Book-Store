import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const MultiSearchComponent = () => {
  const [categoryId, setCategoryId] = useState('');
  const [bookName, setBookName] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // جلب الفئات عند تحميل المكون
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://mywebsite-bookstore.somee.com/api/Categories');
        setCategories(response.data);
      } catch (error) {
        Swal.fire('خطأ!', 'حدث خطأ أثناء جلب الفئات.', 'error');
      }
    };

    fetchCategories();
  }, []);

  // دالة البحث حسب الفئة
  const searchByCategory = async () => {
    if (!categoryId) {
      Swal.fire('خطأ!', 'يرجى إدخال رقم الفئة.', 'error');
      return;
    }
    try {
      const response = await axios.get(`http://mywebsite-bookstore.somee.com/api/Books/get-books-by-category/${categoryId}`);
      setProducts(response.data);
      if (response.data.length === 0) {
        Swal.fire('تحذير!', 'لم يتم العثور على كتب لهذه الفئة.', 'warning');
      } else {
        Swal.fire('نجاح!', 'تم العثور على الكتب بنجاح حسب الفئة.', 'success');
      }
    } catch (error) {
      Swal.fire('خطأ!', 'حدث خطأ أثناء البحث عن الكتب.', 'error');
    }
  };

  // دالة البحث حسب اسم الكتاب
  const searchByBookName = async () => {
    if (!bookName) {
      Swal.fire('خطأ!', 'يرجى إدخال اسم الكتاب.', 'error');
      return;
    }
    try {
      const response = await axios.get(`http://mywebsite-bookstore.somee.com/api/Books/search/${bookName}`);
      setProducts(response.data);
      if (response.data.length === 0) {
        Swal.fire('تحذير!', 'لم يتم العثور على كتب بهذا الاسم.', 'warning');
      } else {
        Swal.fire('نجاح!', 'تم العثور على الكتب حسب اسم الكتاب.', 'success');
      }
    } catch (error) {
      Swal.fire('خطأ!', 'حدث خطأ أثناء البحث عن الكتاب.', 'error');
    }
  };

  // دالة إعادة تعيين الحقول
  const resetFields = () => {
    setCategoryId('');
    setBookName('');
    setProducts([]);
  };

  return (
    <div className="container mt-5">
      <h2>Search for books</h2>
      
      {/* البحث حسب الفئة */}
      <div className="form-group">
        <label>Search by ID</label>
        <input
          type="text"
          className="form-control"
          placeholder="Search by ID"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={searchByCategory}>
            Search
        </button>
      </div>

      {/* البحث حسب اسم الكتاب */}
      <div className="form-group mt-4">
        <label>Search by book name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Name Book"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={searchByBookName}>
          Search
        </button>
      </div>

      {/* زر إعادة التعيين */}
      <button className="btn btn-secondary mt-4" onClick={resetFields}>
        Reset      </button>

      {/* عرض النتائج */}
      <div className="mt-5">
        {products.length > 0 ? (
          <div className="row">
            {products.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
};

export default MultiSearchComponent;
