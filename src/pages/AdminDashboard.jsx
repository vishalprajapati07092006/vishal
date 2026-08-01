import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';
import { FaPlus, FaTrash, FaEdit, FaSignOutAlt, FaLink, FaLeaf, FaLightbulb } from 'react-icons/fa';

// Default gradient/abstract placeholder images used when imageURL is blank
const DEFAULT_ACTIVITY_IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618172193763-c511deb635ca?q=80&w=1000&auto=format&fit=crop"
];

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form State
  const [editingId, setEditingId] = useState(null);
  const [activityNumber, setActivityNumber] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [objective, setObjective] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [pdfURL, setPdfURL] = useState('');
  const [videoURL, setVideoURL] = useState('');
  const [whatILearned, setWhatILearned] = useState('');
  const [sustainabilityConnection, setSustainabilityConnection] = useState('');
  
  // 3 Reflection Questions
  const [reflectionSurprised, setReflectionSurprised] = useState('');
  const [reflectionChallenge, setReflectionChallenge] = useState('');
  const [reflectionDifferently, setReflectionDifferently] = useState('');
  
  const [references, setReferences] = useState('');

  const fetchActivities = async () => {
    try {
      const snap = await getDocs(collection(db, 'activities'));
      setActivities(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setActivityNumber('');
    setTitle('');
    setDate('');
    setObjective('');
    setImageURL('');
    setPdfURL('');
    setVideoURL('');
    setWhatILearned('');
    setSustainabilityConnection('');
    setReflectionSurprised('');
    setReflectionChallenge('');
    setReflectionDifferently('');
    setReferences('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Automatically fallback to a default artwork if imageURL is left blank or empty
      const finalImageURL =
        imageURL && imageURL.trim() !== ''
          ? imageURL.trim()
          : DEFAULT_ACTIVITY_IMAGES[Number(activityNumber) % DEFAULT_ACTIVITY_IMAGES.length];

      const payload = {
        activityNumber: Number(activityNumber),
        title,
        date,
        objective,
        imageURL: finalImageURL,
        pdfURL,
        videoURL,
        whatILearned,
        sustainabilityConnection,
        reflection: {
          surprised: reflectionSurprised,
          challenge: reflectionChallenge,
          differently: reflectionDifferently,
        },
        references,
        updatedAt: serverTimestamp(),
      };

      if (editingId) {
        await updateDoc(doc(db, 'activities', editingId), payload);
      } else {
        payload.createdAt = serverTimestamp();
        await addDoc(collection(db, 'activities'), payload);
      }

      resetForm();
      fetchActivities();
      alert('Activity saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving activity.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this submission permanently?')) {
      await deleteDoc(doc(db, 'activities', id));
      fetchActivities();
    }
  };

  const handleEdit = (act) => {
    setEditingId(act.id);
    setActivityNumber(act.activityNumber);
    setTitle(act.title || '');
    setDate(act.date || '');
    setObjective(act.objective || '');
    setImageURL(act.imageURL || '');
    setPdfURL(act.pdfURL || '');
    setVideoURL(act.videoURL || '');
    setWhatILearned(act.whatILearned || act.description || '');
    setSustainabilityConnection(act.sustainabilityConnection || '');
    
    const refObj = act.reflection || {};
    setReflectionSurprised(typeof refObj === 'object' ? refObj.surprised || '' : '');
    setReflectionChallenge(typeof refObj === 'object' ? refObj.challenge || '' : '');
    setReflectionDifferently(typeof refObj === 'object' ? refObj.differently || '' : '');
    
    setReferences(act.references || '');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-emerald-900/30 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Academic Activity Manager</h1>
          <p className="text-xs text-emerald-600 font-semibold">Rubric-Compliant Submission Dashboard</p>
        </div>
        <button
          onClick={logout}
          className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <form onSubmit={handleSave} className="lg:col-span-2 bg-white dark:bg-eco-cardDark p-6 rounded-3xl border border-emerald-100 dark:border-emerald-900/20 shadow-lg space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center border-b pb-3">
            {editingId ? <FaEdit className="mr-2 text-amber-500" /> : <FaPlus className="mr-2 text-emerald-500" />}
            {editingId ? 'Edit Activity Submission' : 'Create New Activity Submission'}
          </h2>

          {/* 1. Basic Details */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold mb-1 dark:text-gray-300">Activity #</label>
              <input type="number" required value={activityNumber} onChange={e => setActivityNumber(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border text-sm dark:text-white" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-semibold mb-1 dark:text-gray-300">1. Activity Title</label>
              <input type="text" placeholder="e.g. Device Anatomy – Mobile Phone Disassembly" required value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border text-sm dark:text-white" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold mb-1 dark:text-gray-300">Date Performed</label>
            <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border text-sm dark:text-white" />
          </div>

          {/* 2. Objective */}
          <div>
            <label className="text-xs font-semibold mb-1 dark:text-gray-300">2. Objective (Why was this performed?)</label>
            <textarea rows="2" required placeholder="State the main goal of the activity..." value={objective} onChange={e => setObjective(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border text-sm dark:text-white"></textarea>
          </div>

          {/* 3. Evidence / Media URLs */}
          <div className="space-y-3 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
            <h3 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">3. Evidence Attachments (URLs)</h3>
            
            <div>
              <label className="text-xs font-semibold mb-1 dark:text-gray-300 flex items-center">
                <FaLink className="mr-1 text-emerald-500" /> Photo / Graphic URL <span className="text-[10px] text-gray-400 ml-2 font-normal">(Optional: auto-assigns fallback if empty)</span>
              </label>
              <input type="url" placeholder="https://imgur.com/example.jpg" value={imageURL} onChange={e => setImageURL(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border text-sm dark:text-white" />
            </div>

            <div>
              <label className="text-xs font-semibold mb-1 dark:text-gray-300 flex items-center">
                <FaLink className="mr-1 text-red-500" /> Report PDF / Google Drive URL
              </label>
              <input type="url" placeholder="https://drive.google.com/file/d/..." value={pdfURL} onChange={e => setPdfURL(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border text-sm dark:text-white" />
            </div>

            <div>
              <label className="text-xs font-semibold mb-1 dark:text-gray-300 flex items-center">
                <FaLink className="mr-1 text-blue-500" /> Demonstration Video Link
              </label>
              <input type="url" placeholder="https://youtube.com/watch?v=..." value={videoURL} onChange={e => setVideoURL(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border text-sm dark:text-white" />
            </div>
          </div>

          {/* 4. What I Learned */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold dark:text-gray-300">4. What I Learned</label>
              <span className="text-[10px] text-gray-500">Target: ≈150 words</span>
            </div>
            <textarea
              rows="6"
              required
              placeholder="Explain technical concepts, mechanisms, and key insights gained during this experiment..."
              value={whatILearned}
              onChange={e => setWhatILearned(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border text-sm leading-relaxed dark:text-white"
            ></textarea>
          </div>

          {/* 5. Sustainability Connection */}
          <div>
            <label className="text-xs font-semibold mb-1 dark:text-gray-300 flex items-center">
              <FaLeaf className="mr-1 text-emerald-500" /> 5. Sustainability Connection
            </label>
            <textarea
              rows="3"
              required
              placeholder="How does this activity help reduce e-waste or promote circular electronic management?"
              value={sustainabilityConnection}
              onChange={e => setSustainabilityConnection(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border text-sm dark:text-white"
            ></textarea>
          </div>

          {/* 6. Reflection Questions */}
          <div className="space-y-3 bg-amber-50/50 dark:bg-amber-950/20 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/30">
            <h3 className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider flex items-center">
              <FaLightbulb className="mr-1 text-amber-500" /> 6. Reflection (3 Mandatory Questions)
            </h3>

            <div>
              <label className="text-xs font-semibold mb-1 dark:text-gray-300">• What surprised me?</label>
              <textarea rows="2" required value={reflectionSurprised} onChange={e => setReflectionSurprised(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border text-sm dark:text-white"></textarea>
            </div>

            <div>
              <label className="text-xs font-semibold mb-1 dark:text-gray-300">• What challenge did I face?</label>
              <textarea rows="2" required value={reflectionChallenge} onChange={e => setReflectionChallenge(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border text-sm dark:text-white"></textarea>
            </div>

            <div>
              <label className="text-xs font-semibold mb-1 dark:text-gray-300">• What will I do differently?</label>
              <textarea rows="2" required value={reflectionDifferently} onChange={e => setReflectionDifferently(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border text-sm dark:text-white"></textarea>
            </div>
          </div>

          {/* 7. References */}
          <div>
            <label className="text-xs font-semibold mb-1 dark:text-gray-300">7. References</label>
            <textarea
              rows="2"
              placeholder="Standard citations, documentation, websites, or books used..."
              value={references}
              onChange={e => setReferences(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border text-sm dark:text-white"
            ></textarea>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition shadow-md"
            >
              {loading ? 'Saving...' : editingId ? 'Update Submission' : 'Publish Activity'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl text-sm"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Existing Submissions List */}
        <div className="lg:col-span-1 bg-white dark:bg-eco-cardDark p-6 rounded-3xl border border-emerald-100 dark:border-emerald-900/20 shadow-lg h-fit">
          <h2 className="text-xl font-bold dark:text-white mb-4">Saved Activities ({activities.length})</h2>
          <div className="space-y-3">
            {activities.map(act => (
              <div key={act.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-emerald-600">Activity #{act.activityNumber}</span>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white truncate max-w-[180px]">{act.title}</h3>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => handleEdit(act)} className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg"><FaEdit /></button>
                  <button onClick={() => handleDelete(act.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><FaTrash /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}