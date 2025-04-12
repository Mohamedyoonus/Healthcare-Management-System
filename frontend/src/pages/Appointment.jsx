import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import axios from "axios";
import { toast } from "react-toastify";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctosData } =
    useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const navigate = useNavigate();

  // Fetch doctor info
  useEffect(() => {
    if (doctors.length > 0) {
      const doc = doctors.find((doc) => doc._id === docId);
      setDocInfo(doc);
    }
  }, [doctors, docId]);

  // Fetch available slots
  useEffect(() => {
    if (!docInfo) return;
    setDocSlots([]);

    let today = new Date();
    let slots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(Math.max(10, currentDate.getHours() + 1));
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
        const isAvailable =
          !docInfo.slots_booked[slotDate]?.includes(formattedTime);

        if (isAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      if (timeSlots.length) slots.push(timeSlots);
    }

    setDocSlots(slots);
  }, [docInfo]);

  // Book appointment
  const bookAppointment = async () => {
    if (!token) {
      toast.warning("Login to book an appointment");
      return navigate("/login");
    }

    if (!docSlots.length || !slotTime) {
      toast.warning("Please select a slot");
      return;
    }

    const date = docSlots[slotIndex][0].datetime;
    const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } },
      );

      if (data.success) {
        toast.success(data.message);
        getDoctosData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to book appointment");
    }
  };

  return docInfo ? (
    <div className="px-4 sm:px-8 py-8">
      {/* ---------- Doctor Details ----------- */}
      <div className="flex flex-col sm:flex-row gap-6 p-4">
        {/* Doctor Image with Background */}
        <div>
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src={docInfo.image}
            alt=""
          />
        </div>

        {/* Doctor Details */}
        <div className="flex-1 bg-white rounded-lg p-6 shadow-md border border-gray-200">
          {/* Doctor Name & Verified Badge */}
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-900">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="Verified" />
          </h2>

          {/* Specialization & Experience */}
          <p className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
            {docInfo.degree} - {docInfo.speciality}
            <span className="py-1 px-3 border border-primary text-primary text-xs font-medium rounded-full bg-blue-50 shadow-sm">
              {docInfo.experience}
            </span>
          </p>

          {/* About Section */}
          <div className="mt-4">
            <p className="flex items-center gap-1 text-sm font-semibold text-gray-700">
              About <img className="w-4" src={assets.info_icon} alt="Info" />
            </p>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
              {docInfo.about}
            </p>
          </div>

          {/* Appointment Fee */}
          <p className="mt-4 text-lg font-medium text-gray-700">
            Appointment Fee:
            <span className="text-gray-900 font-semibold">
              {" "}
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="mt-4 md:mt-5">
        {" "}
        {/* Reduced top spacing */}
        <p className="text-gray-900 font-semibold text-base mb-3">
          Select a Slot
        </p>
        {/* Date selection (Compact Premium Box Style) */}
        <div className="flex gap-2 overflow-x-auto mt-4 px-2">
          {docSlots.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center w-16 h-16 rounded-md shadow-md text-sm cursor-pointer transition-all duration-300
          ${
            slotIndex === index
              ? "bg-primary text-white scale-105 shadow-lg"
              : "bg-white border border-gray-300 text-gray-700 hover:shadow-md hover:bg-gray-100"
          }`}
              onClick={() => setSlotIndex(index)}
            >
              <p className="text-[11px] font-medium">
                {daysOfWeek[item[0].datetime.getDay()]}
              </p>
              <p className="text-lg font-semibold">
                {item[0].datetime.getDate()}
              </p>
            </div>
          ))}
        </div>
        {/* Time slot selection (Bubble Effect - Compact) */}
        {docSlots.length > 0 && (
          <div className="flex gap-2 overflow-x-auto mt-4 px-2">
            {docSlots[slotIndex]?.map((item, index) => (
              <p
                key={index}
                className={`text-xs px-4 py-2 rounded-full cursor-pointer transition-all duration-300
            ${
              slotTime === item.time
                ? "bg-primary text-white scale-105 shadow-md shadow-primary/30"
                : "border border-gray-400 text-gray-700 hover:bg-gray-200"
            }`}
                onClick={() => setSlotTime(item.time)}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
          </div>
        )}
        {/* Book Button (Smaller & Balanced) */}
        <button
          onClick={bookAppointment}
          className="mt-6 bg-primary text-white px-5 py-2.5 rounded-full text-xs font-medium shadow-md 
      hover:bg-opacity-90 hover:scale-105 transition-all duration-300"
        >
          Book Appointment
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
    </div>
  ) : null;
};

export default Appointment;
