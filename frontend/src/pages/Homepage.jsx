import Navbar from '../components/Navbar.jsx';
import axios from 'axios';
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard.jsx';
import NotesNotFound from '../components/NotesNotFound.jsx';
import ReactDOM from 'react-dom';

const Homepage = () => {
  const [isRateLimited, setisRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ open: false, note: null, deleting: false });

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/notes");
        setNotes(res.data);
        setisRateLimited(false);
      } catch (err) {
        if (err.response && err.response.status === 429) {
          setisRateLimited(true);
        } else {
          toast.error("An error occurred while fetching notes.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const openDeleteModal = (note) => {
    setDeleteModal({ open: true, note, deleting: false });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, note: null, deleting: false });
  };

  const confirmDelete = async () => {
    setDeleteModal((prev) => ({ ...prev, deleting: true }));
    try {
      await axios.delete(`http://localhost:3000/api/notes/${deleteModal.note._id}`);
      toast.success('Note deleted');
      setNotes((prev) => prev.filter((n) => n._id !== deleteModal.note._id));
      closeDeleteModal();
    } catch (err) {
      toast.error('Failed to delete note');
      setDeleteModal((prev) => ({ ...prev, deleting: false }));
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} openDeleteModal={openDeleteModal} />
            ))}
          </div>
        )}
      </div>

      {deleteModal.open && ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-base-100/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-base-200 border border-error/30 rounded-2xl p-7 shadow-2xl text-center w-80 scale-100 transition-transform duration-200">
            <div className="flex flex-col items-center mb-3">
              <span className="bg-error/10 rounded-full p-2 mb-2">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-7 w-7 text-error' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z' /></svg>
              </span>
              <div className="text-lg font-bold text-error">Delete this note?</div>
            </div>
            <div className="text-base-content/70 mb-5">This action cannot be undone.</div>
            <div className="flex gap-3 justify-center">
              <button
                className="bg-error text-white px-5 py-2 rounded-xl shadow hover:bg-error-dark font-semibold transition-all duration-150"
                onClick={confirmDelete}
                disabled={deleteModal.deleting}
              >
                {deleteModal.deleting ? 'Deleting...' : 'Delete'}
              </button>
              <button
                className="bg-base-300 text-base-content px-5 py-2 rounded-xl shadow hover:bg-base-200 font-semibold transition-all duration-150"
                onClick={closeDeleteModal}
                disabled={deleteModal.deleting}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Homepage;
