import React, { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import "../css/landing.css";
import Axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

import TitleSection from "./TitleSection";
import FeaturesSection from "./FeatureSection";
import Footer from "./Footer";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const ref = useRef();

  useEffect(() => {
    AOS.init({
      disable: false,
      startEvent: "DOMContentLoaded",
      duration: 1000,
      easing: "ease-in-out",
      mirror: true,
    });
  }, []);

  const sendMessage = () => {
    Axios.post("http://localhost:5000/sendmessage", { name, email, message })
      .then(() => {
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch(console.error);
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="section title-section" data-aos="fade-up">
        <TitleSection />
      </div>
      <div className="section features-section" data-aos="fade-up" data-aos-delay="200">
        <FeaturesSection />
      </div>
      <div className="section contact-section" data-aos="fade-up" data-aos-delay="400">
        <div className="contact-form">
          <h2>Contact Us</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button onClick={sendMessage}>Send Message</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
