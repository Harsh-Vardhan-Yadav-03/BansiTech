import React from "react";
import"./Service.css"; 

const Service = () => {
  return (
    <div className="services">
      <h1>Our Services</h1>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <i className={`fa ${service.icon}`}></i>
          </div>
        ))}
      </div>
    </div>
  );
};

const services = [
  { title: "Software Development", description: "Custom software solutions.", icon: "fa-code" },
  { title: "Cloud Services", description: "Cloud infrastructure and migration services.", icon: "fa-cloud" },
  { title: "Cyber Security", description: "Advanced security measures to protect your data and systems.", icon: "fa-lock" },
  { title: "IT Support", description: "Strategic technology consulting to optimize your IT infrastructure.", icon: "fa-desktop" },
  { title: "Managed Services", description: "Reliable customer support anytime you need assistance.", icon: "fa-user" }
];

export default Service;
