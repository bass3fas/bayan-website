"use client";
import AdminDashboard from '@/components/AdminDashboard';
import NewsControl from '@/components/NewsControl';
// import UsersControl from '@/components/admin/UsersControl';

export default function AdminDashboardPage() {
  return (
    <AdminDashboard 
      title="Admin Dashboard"
      subtitle="Manage your website content"
    >
      {/* News Management Section */}
      <div className="mb-8">
        <NewsControl />
      </div>

      {/* Future sections can be added here */}
      {/* 
      <div className="mb-8">
        <UsersControl />
      </div>
      */}
    </AdminDashboard>
  );
}