import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const CategoriesComponent = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editCategory, setEditCategory] = useState({ id: '', name: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchId, setSearchId] = useState('');

  // جلب الفئات عند تحميل المكون
  useEffect(() => {
    fetchCategories();
  }, []);

  // دالة لجلب الفئات
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://mywebsite-bookstore.somee.com/api/Categories');
      setCategories(response.data);
    } catch (error) {
      Swal.fire('خطأ!', 'حدث خطأ أثناء جلب الفئات.', 'error');
    }
  };

  // دالة لإضافة فئة جديدة
  const addCategory = async () => {
    if (!newCategory) {
      Swal.fire('خطأ!', 'يرجى إدخال اسم الفئة.', 'error');
      return;
    }

    try {
      await axios.post('http://mywebsite-bookstore.somee.com/api/Categories', { name: newCategory });
      Swal.fire('نجاح!', 'تم إضافة الفئة بنجاح.', 'success');
      setNewCategory('');
      fetchCategories(); // تحديث الفئات بعد الإضافة
    } catch (error) {
      Swal.fire('خطأ!', 'حدث خطأ أثناء إضافة الفئة.', 'error');
    }
  };

  // دالة لجلب فئة معينة
  const fetchCategoryById = async (id) => {
    try {
      const response = await axios.get(`http://mywebsite-bookstore.somee.com/api/Categories/${id}`);
      setEditCategory(response.data);
    } catch (error) {
      Swal.fire('خطأ!', 'حدث خطأ أثناء جلب الفئة.', 'error');
    }
  };

  // دالة لتحديث فئة معينة
  const updateCategory = async () => {
    if (!editCategory.name) {
      Swal.fire('خطأ!', 'يرجى إدخال اسم الفئة.', 'error');
      return;
    }

    try {
      await axios.put(`http://mywebsite-bookstore.somee.com/api/Categories/${editCategory.id}`, { name: editCategory.name });
      Swal.fire('نجاح!', 'تم تحديث الفئة بنجاح.', 'success');
      setEditCategory({ id: '', name: '' });
      fetchCategories(); // تحديث الفئات بعد التحديث
    } catch (error) {
      Swal.fire('خطأ!', 'حدث خطأ أثناء تحديث الفئة.', 'error');
    }
  };

  // دالة لحذف فئة معينة مع تحذير
  const deleteCategory = async (id) => {
    const confirmDelete = await Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'لا يمكنك التراجع عن هذا الإجراء!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم، احذفها!',
      cancelButtonText: 'إلغاء'
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(`http://mywebsite-bookstore.somee.com/api/Categories/${id}`);
        Swal.fire('نجاح!', 'تم حذف الفئة بنجاح.', 'success');
        fetchCategories(); // تحديث الفئات بعد الحذف
      } catch (error) {
        Swal.fire('خطأ!', 'حدث خطأ أثناء حذف الفئة.', 'error');
      }
    }
  };

  // دالة للبحث عن فئة
  const searchCategory = async () => {
    try {
      const response = await axios.get(`http://mywebsite-bookstore.somee.com/api/Categories/search/${searchTerm}`);
      setCategories(response.data);
    } catch (error) {
      Swal.fire('خطأ!', 'حدث خطأ أثناء البحث عن الفئة.', 'error');
    }
  };

  // دالة للبحث عن فئة بواسطة ID
  const searchCategoryById = async () => {
    if (!searchId) {
      Swal.fire('خطأ!', 'يرجى إدخال ID للبحث.', 'error');
      return;
    }

    try {
      const response = await axios.get(`http://mywebsite-bookstore.somee.com/api/Categories/${searchId}`);
      setCategories([response.data]); // نعرض الفئة التي تم العثور عليها فقط
    } catch (error) {
      Swal.fire('خطأ!', 'حدث خطأ أثناء البحث عن الفئة بالـ ID.', 'error');
    }
  };

  // دالة لإعادة تعيين الفئات
  const resetCategories = () => {
    setSearchTerm('');
    setSearchId('');
    fetchCategories(); // إعادة جلب الفئات الأصلية
  };

  return (
    <div className="container mt-5">
      <h2>Category management</h2>

      {/* إضافة فئة جديدة */}
      <div className="form-group mt-4">
        <label>Add a new category</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter name Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={addCategory}>
          Add
        </button>
      </div>

      {/* البحث عن فئة بالاسم */}
      <div className="form-group mt-4">
        <label>search by name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter name Category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-secondary mt-2" onClick={searchCategory}>
          search
        </button>
      </div>

      {/* البحث عن فئة بواسطة ID */}
      <div className="form-group mt-4">
        <label>Search by ID</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Id"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button className="btn btn-secondary mt-2" onClick={searchCategoryById}>
          search
        </button>
      </div>

      {/* زر إعادة تعيين */}
      <button className="btn btn-warning mt-2" onClick={resetCategories}>
        Reset
      </button>

      {/* عرض الفئات */}
      <h4 className="mt-5">Categories available</h4>
      <ul className="list-group">
        {categories.map((category) => (
          <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
            {category.name}
            <div>
              <button className="btn btn-warning btn-sm" onClick={() => fetchCategoryById(category.id)}>
              Edit
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => deleteCategory(category.id)}>
                delet
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* تعديل فئة */}
      {editCategory.id && (
        <div className="form-group mt-4">
          <label>Edit category</label>
          <input
            type="text"
            className="form-control"
            value={editCategory.name}
            onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
          />
          <button className="btn btn-success mt-2" onClick={updateCategory}>
            Edit 
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoriesComponent;
