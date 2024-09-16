import React from 'react';
import { Header } from '../../../shared/components/Header';
import { Navbar } from '../../../shared/components/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FacultyActivityForm from '../components/FacultyActivityForm';
import PromotionPredictor from '../components/PromotionPredictor';

export const DashBoard = () => {
  return (
    <div className='bg-[#10002b]'>
      {/* Header and Navbar */}
      <Header />
      {/* <Navbar /> */}
      
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            {/* Faculty Activity Form */}
            <div className="card shadow-sm mb-4 bg-gradient-to-r from-[#200C25] to-[#5C2368]">
              <div className="card-header bg-[#11001c] text-white font-semibold">
                <h5 className="mb-0">Faculty Activity Form</h5>
              </div>
              <div className="card-body">
                <FacultyActivityForm   /> {/* Render the FacultyActivityForm component */}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            {/* Promotion Predictor */}
            <div className="card shadow-sm  bg-gradient-to-r from-[#200C25] to-[#5C2368]">
              <div className="card-header bg-[#11001c] text-white font-semibold">
                <h5 className="mb-0">Promotion Predictor</h5>
              </div>
              <div className="card-body">
                <PromotionPredictor /> {/* Render the PromotionPredictor component */}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast Notification */}
      <ToastContainer position="top-right" autoClose={1500} />
    </div>
  );
};
