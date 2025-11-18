import Navbar from '../components/Navbar.jsx';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const CreatePage = () => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post('http://localhost:3000/api/notes', formData);
      toast.success('Note created successfully!');
      navigate('/');
    } catch (err) {
      toast.error('Failed to create note.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="max-w-2xl mx-auto p-4 mt-10">
        <form
          className="bg-base-100 p-8 rounded-2xl shadow-lg border border-base-content/10"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">Create New Note</h2>
          <div className="mb-6">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-primary/30 px-4 py-3 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-200 bg-base-200 text-base-content placeholder:text-base-content/50"
              required
            />
          </div>
          <div className="mb-8">
            <textarea
              name="content"
              placeholder="Content"
              value={formData.content}
              onChange={handleChange}
              className="w-full border border-primary/30 px-4 py-3 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-200 bg-base-200 text-base-content placeholder:text-base-content/50"
              rows={6}
              required
            />
          </div>
          <div className="flex gap-4 justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-3 rounded-xl shadow-md hover:scale-105 hover:from-primary-dark hover:to-primary focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-200 font-semibold"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Create Note'}
            </button>
            <button
              type="button"
              className="bg-base-300 text-base-content px-8 py-3 rounded-xl shadow-md hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-base-content/20 transition-all duration-200 font-semibold"
              onClick={() => navigate('/')}
              disabled={submitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
