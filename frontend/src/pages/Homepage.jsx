import Navbar from '../components/Navbar.jsx'
import axios from 'axios';
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

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
    </div>
  )
}

export default Homepage
