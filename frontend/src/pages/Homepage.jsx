import Navbar from '../components/Navbar.jsx'
import axios from 'axios';
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard.jsx';

const Homepage = () => {
  const [isRateLimited,setisRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/notes");
        console.log(res.data);
        setNotes(res.data)
        setisRateLimited(false)
      }
      catch (err) {
        console.log("Error fetching notes:", err );
        if (err.response.status === 429) {
          setisRateLimited(true);
        }
        else{
          toast.error("An error occurred while fetching notes.");
        }
      }
      finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className= "min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {/* {notes.length === 0 && !isRateLimited && <NotesNotFound />} */}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Homepage
