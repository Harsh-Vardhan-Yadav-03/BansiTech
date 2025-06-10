import React from 'react';
import Analytics from '../components/Analytics'
import styles from './About.module.css';
import { useAuth } from '../store/auth';

const About = () => {
  const { user } = useAuth();
  return (
    <>
      <div className={styles.Lollipop}>
        <header>
          <p>Hi, { user ? `${user.username}` : `Welcome to our website` 
            } </p>
          <h1>Welcome to Bansiwale Tech!</h1>
          <p>At Bansiwale Tech, we are passionate about providing innovative tech solutions. Our mission is to empower businesses with cutting-edge technology, and we are dedicated to delivering exceptional software development and tech services to our clients.</p>
        </header>

        <section className={styles.about_story}>
          <h2>Our Story</h2>
          <p>Founded in 2015, Bansiwale Tech started with the simple goal of bridging the gap between complex technology and businesses that needed solutions. Over the years, we’ve grown into a leading tech company, all while maintaining our core values of integrity, innovation, and quality.</p>
          <p>We believe that technology should simplify your life and boost your business potential. Our team works tirelessly to ensure that every software we deliver is robust, scalable, and user-friendly. We’re not just another tech company, but a partner that truly cares about your success and growth.</p>
        </section>

        <section className={styles.about_working}>
          <h2>What We Do</h2>
          <p>At Bansiwale Tech, we specialize in custom software development, mobile app development, and cloud-based solutions. Whether you're looking for an enterprise application, a mobile app for your business, or a scalable cloud solution, we’ve got you covered.</p>
          <p>We take pride in creating products that are not only technically sound but also intuitive and customer-centric. Our expert team is here to guide you every step of the way, ensuring that your experience with us is smooth, efficient, and impactful.</p>
        </section>

        <section className={styles.Why_Us}>
          <h2>Why Choose Us?</h2>
          <ul>
            <li><strong>Quality:</strong> We prioritize the highest standards in everything we do, ensuring exceptional performance and reliability.</li>
            <li><strong>Customer Support:</strong> Our team is here to assist you whenever you need help, with timely and responsive support.</li>
            <li><strong>Innovation:</strong> We're always pushing the boundaries of technology to offer you the best and most efficient solutions.</li>
            <li><strong>Trust:</strong> We've built lasting relationships with our clients by being reliable, transparent, and delivering what we promise.</li>
          </ul>
        </section>

        <section className={styles['about-vision']}>
          <h2>Our Vision</h2>
          <p>Looking ahead, we're committed to continuing to evolve and innovate in the tech industry. We aim to provide scalable and transformative tech solutions that help businesses thrive, always keeping our clients’ needs at the core of what we do.</p>
        </section>

        <footer className={styles.AboutContact}>
          <h3>Contact Us</h3>
          <p>If you'd like to get in touch, feel free to <a href="mailto:contact@bansiwaletech.com">email us</a> or follow us on <a href="https://www.linkedin.com/company/bansiwale-tech" target="_blank" rel="noopener noreferrer">LinkedIn</a>.</p>
        </footer>
      </div>
      {/* <Analytics /> */}
    </>
  )
}

export default About