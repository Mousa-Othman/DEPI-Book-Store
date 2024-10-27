// ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // تحديث الحالة ليظهر واجهة المستخدم البديلة عند حدوث خطأ
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // يمكنك تسجيل الخطأ إلى خدمة التقارير هنا
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // عرض واجهة المستخدم البديلة
      return <h1>Oops! Something went wrong. Page not found.</h1>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
