import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
import "../css/landing.css";
import FeaturesSection from "./FeatureSection";
import Footer from "./Footer";
export default function Feature() {
  return (
    <div>
    <Navbar />
    <FeaturesSection />
    <Footer />
  </div>
  );
}
