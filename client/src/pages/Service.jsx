import React from "react";
import"./Service.css"; 
import { useAuth } from "../store/auth";

const Service = () => {

  const { services } =useAuth() ;

  return (
    <div className="services">
      <h1>Our Services</h1>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <i className={`fa ${service.icon}`}></i>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <p>{service.price}</p>
            <p>{service.provider}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
