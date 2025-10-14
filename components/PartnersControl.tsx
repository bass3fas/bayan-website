"use client";
import { useState, useEffect } from 'react';
import { Partner } from '@/interfaces';



export default function PartnersControl() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    link: '',
    brief: '',
    logo: ''
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await fetch('/api/partners');
      const data = await response.json();
      setPartners(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching partners:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePartner = async (id: number) => {
    if (confirm('Are you sure you want to delete this partner?')) {
      try {
        const response = await fetch(`/api/partners?id=${id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          setPartners(partners.filter(partner => partner.id !== id));
        } else {
          alert('Failed to delete partner');
        }
      } catch (error) {
        console.error('Error deleting partner:', error);
        alert('Error deleting partner');
      }
    }
  };

  const openAddModal = () => {
    setEditingPartner(null);
    setFormData({
      name: '',
      link: '',
      brief: '',
      logo: '/assets/logos/default.png'
    });
    setShowModal(true);
  };

  const openEditModal = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      link: partner.link,
      brief: partner.brief,
      logo: partner.logo
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingPartner) {
        // Update existing partner
        const response = await fetch('/api/partners', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, id: editingPartner.id })
        });
        
        if (response.ok) {
          fetchPartners();
          setShowModal(false);
        } else {
          alert('Failed to update partner');
        }
      } else {
        // Add new partner
        const response = await fetch('/api/partners', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        if (response.ok) {
          fetchPartners();
          setShowModal(false);
        } else {
          alert('Failed to add partner');
        }
      }
    } catch (error) {
      console.error('Error saving partner:', error);
      alert('Error saving partner');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Partners Management */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Partners Management ({partners.length} partners)</h2>
          <button
            onClick={openAddModal}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Partner</span>
          </button>
        </div>
        
        {partners.length === 0 ? (
          <p className="text-gray-500">No partners found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {partners.map((partner) => (
              <div key={partner.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="w-16 h-16 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/logos/default.png';
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{partner.name}</h3>
                    <a 
                      href={partner.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {partner.link}
                    </a>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {partner.brief}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button 
                      onClick={() => openEditModal(partner)}
                      className="text-blue-600 hover:text-blue-800 px-2 py-1 border border-blue-600 rounded text-xs hover:bg-blue-50"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deletePartner(partner.id)}
                      className="text-red-600 hover:text-red-800 px-2 py-1 border border-red-600 rounded text-xs hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">
                {editingPartner ? 'Edit Partner' : 'Add New Partner'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Partner Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website Link
                  </label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Logo Path
                  </label>
                  <input
                    type="text"
                    value={formData.logo}
                    onChange={(e) => setFormData({...formData, logo: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="/assets/logos/partner-logo.png"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brief Description
                  </label>
                  <textarea
                    value={formData.brief}
                    onChange={(e) => setFormData({...formData, brief: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {editingPartner ? 'Update' : 'Add'} Partner
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}