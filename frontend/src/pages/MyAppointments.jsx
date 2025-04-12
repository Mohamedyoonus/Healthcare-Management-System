import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [payment, setPayment] = useState("");
  const [feedback, setFeedback] = useState({});

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split("_");
    return `${day} ${months[+month]} ${year}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });
      setAppointments(data.appointments.reverse());
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      toast[data.success ? "success" : "error"](data.message);
      if (data.success) getUserAppointments();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verifyRazorpay`,
            response,
            { headers: { token } }
          );
          if (data.success) {
            toast.success("Payment successful");
            getUserAppointments();
          }
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { appointmentId },
        { headers: { token } }
      );
      data.success ? initPay(data.order) : toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const appointmentStripe = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-stripe`,
        { appointmentId },
        { headers: { token } }
      );
      data.success ? window.location.replace(data.session_url) : toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleFeedbackSubmit = async (appointmentId) => {
    const userFeedback = feedback[appointmentId];
    if (!userFeedback?.rating || !userFeedback?.comment) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/submit-feedback`,
        {
          appointmentId,
          ...userFeedback,
        },
        { headers: { token } }
      );
      if (data.success) {
        toast.success("Feedback submitted");
        setFeedback((prev) => ({ ...prev, [appointmentId]: {} }));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleFeedbackChange = (id, field, value) => {
    setFeedback((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  return (
    <div className="container mx-auto p-4">
      <p className="pb-3 mt-12 text-lg font-semibold text-gray-700 border-b">My Appointments</p>
      <div className="grid gap-6 mt-6">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row gap-4"
          >
            <img
              className="w-36 h-36 object-cover rounded-xl bg-[#EAEFFF]"
              src={item.docData.image}
              alt="doctor"
            />
            <div className="flex-1 text-sm text-gray-600">
              <p className="text-xl font-semibold text-gray-800">{item.docData.name}</p>
              <p className="text-gray-500">{item.docData.speciality}</p>
              <p className="text-gray-700 font-medium mt-2">Address:</p>
              <p>{item.docData.address.line1}</p>
              <p>{item.docData.address.line2}</p>
              <p className="mt-2">
                <span className="text-sm text-gray-700 font-medium">Date & Time:</span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div className="flex flex-col gap-3 justify-end text-sm text-center">
              {/* Payment logic */}
              {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                <button
                  onClick={() => setPayment(item._id)}
                  className="py-2 px-4 border rounded-md bg-gray-100 hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Pay Online
                </button>
              )}
              {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                <>
                  <button
                    onClick={() => appointmentStripe(item._id)}
                    className="py-2 px-4 border rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    <img src={assets.stripe_logo} className="max-w-20 max-h-5" alt="stripe" />
                  </button>
                  <button
                    onClick={() => appointmentRazorpay(item._id)}
                    className="py-2 px-4 border rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    <img src={assets.razorpay_logo} className="max-w-20 max-h-5" alt="razorpay" />
                  </button>
                </>
              )}
              {item.payment && !item.isCompleted && !item.cancelled && (
                <span className="py-2 px-4 rounded-md bg-green-100 text-green-700">Paid</span>
              )}
              {item.isCompleted && (
                <>
                  <span className="py-2 px-4 rounded-md bg-green-100 text-green-700">Completed</span>
                  <div className="flex flex-col gap-2 text-left mt-2">
                    <label>Rate the Doctor:</label>
                    <select
                      value={feedback[item._id]?.rating || ""}
                      onChange={(e) => handleFeedbackChange(item._id, "rating", e.target.value)}
                      className="border rounded-md p-1"
                    >
                      <option value="">Select Rating</option>
                      {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>
                          {r} Star{r > 1 && "s"}
                        </option>
                      ))}
                    </select>
                    <textarea
                      placeholder="Write feedback..."
                      className="border rounded-md p-2"
                      value={feedback[item._id]?.comment || ""}
                      onChange={(e) => handleFeedbackChange(item._id, "comment", e.target.value)}
                    />
                    <button
                      onClick={() => handleFeedbackSubmit(item._id)}
                      className="bg-blue-500 text-white py-1 px-3 rounded-md"
                    >
                      Submit Feedback
                    </button>
                  </div>
                </>
              )}
              {!item.cancelled && !item.isCompleted && (
                <>
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="py-2 px-4 border rounded-md bg-red-100 hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    Cancel Appointment
                  </button>
                  <button
                    onClick={() => navigate(`/reschedule/${item._id}`)}
                    className="py-2 px-4 border rounded-md bg-yellow-100 hover:bg-yellow-200 transition-all"
                  >
                    Reschedule
                  </button>
                </>
              )}
              {item.cancelled && !item.isCompleted && (
                <span className="py-2 px-4 border rounded-md bg-red-100 text-red-600">
                  Appointment Cancelled
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
