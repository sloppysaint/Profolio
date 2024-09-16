import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function PromotionPredictor() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState('');  // State for user ID
  const [predictionResult, setPredictionResult] = useState(null);  // State for prediction result

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!userId) {
      toast.error("User ID is required");
      setIsSubmitting(false);
      return;
    }

    try {
      // Make a GET request to your backend with user ID and retrieve the prediction result
      const response = await axios.get(`https://backendss-wx75.onrender.com/api/predict/${userId}`);

      if (response.status === 200) {
        toast.success("Prediction retrieved successfully");
        setPredictionResult(response.data);  // Set the result in state
      } else {
        toast.error("Error retrieving prediction");
      }
    } catch (error) {
      console.error("Error fetching prediction", error);
      toast.error("Error fetching prediction");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b bg-[#11001c] items-center justify-center py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-lg w-full bg-[#f8edeb] p-8 rounded-2xl shadow-xl ring-1 ring-gray-200 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Promotion Predictor</h2>
          <p className="mt-2 text-gray-600 text-sm">
            Enter the user ID to fetch the promotion prediction.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* User ID input */}
            <div>
              <label htmlFor="userId" className="block text-sm font-semibold text-[#001219] mb-1">
                User ID
              </label>
              <input
                id="userId"
                name="userId"
                type="text"
                required
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter User ID"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                isSubmitting ? 'bg-indigo-400' : 'bg-[#10002b] hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out`}
            >
              {isSubmitting ? "Fetching..." : "Get Prediction"}
            </button>
          </div>
        </form>

        {/* Display prediction result */}
        {predictionResult && (
          <div className="mt-6">
            <h3 className="text-2xl font-bold text-indigo-600">Prediction Result</h3>
            <p><strong>Prediction:</strong> {predictionResult.prediction}</p>
            <p><strong>Promotion Probability:</strong> {(predictionResult.promotion_probability * 100).toFixed(2)}%</p>
          </div>
        )}
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar />
    </div>
  );
}
