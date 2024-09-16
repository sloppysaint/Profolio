import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default function FacultyActivityForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: "Seminar",
    title: "",
    date: new Date(),
    description: "",
    attendees: 0,
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Make the actual API call to your backend
      const response = await axios.post("https://backendss-wx75.onrender.com/api/submit-form", formData);

      if (response.status === 200) {
        toast.success("Activity logged successfully");
        // Reset form after successful submission
        setFormData({
          type: "Seminar",
          title: "",
          date: new Date(),
          description: "",
          attendees: 0,
        });
      } else {
        toast.error("There was an error logging the activity");
      }
    } catch (error) {
      console.error("Error logging activity", error);
      toast.error("There was an error logging the activity");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b bg-[#11001c] flex items-center justify-center py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-lg w-full bg-[#f8edeb] p-8 rounded-2xl  shadow-xl ring-1 ring-gray-200 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Log Faculty Activity</h2>
          <p className="mt-2 text-gray-600 text-sm">
            Fill out the form to log seminar, event, or project activity.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="type" className="block text-sm font-semibold text-[#001219] mb-1">
                Activity Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
                className="block w-full py-2 px-3 border border-gray-300 bg-[#f8f9fa] rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="Seminar">Seminar</option>
                <option value="Event">Event</option>
                <option value="Lecture">Lecture</option>
                <option value="Project">Project</option>
              </select>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-[#001219] mb-1">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 bg-[#f8f9fa] rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Activity Title"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-semibold  text-[#001219] mb-1">
                Date
              </label>
              <DatePicker
                selected={formData.date}
                onChange={(date) => handleChange('date', date)}
                className="block w-full px-3 py-2 border bg-[#f8f9fa] border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-[#001219] mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="block w-full px-3 py-2 border bg-[#f8f9fa] border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Activity Description"
                rows="4"
              />
            </div>

            <div>
              <label htmlFor="attendees" className="block text-sm font-semibold text-[#001219] mb-1">
                Number of Attendees: {formData.attendees}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.attendees}
                onChange={(e) => handleChange('attendees', parseInt(e.target.value))}
                className="w-full h-2 bg-[#f8f9fa] bg-gray-300 rounded-lg appearance-none cursor-pointer"
              />
              <style jsx>{`
                input[type='range']::-webkit-slider-thumb {
                  appearance: none;
                  height: 16px;
                  width: 16px;
                  border-radius: 50%;
                  background-color: #10002b; /* Purple thumb */
                  cursor: pointer;
                }

                input[type='range']::-moz-range-thumb {
                  height: 16px;
                  width: 16px;
                  border-radius: 50%;
                  background-color: #800080; /* Purple thumb */
                  cursor: pointer;
                }
              `}</style>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                isSubmitting ? 'bg-indigo-400' : 'bg-[#10002b] hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar />
    </div>
  );
}
