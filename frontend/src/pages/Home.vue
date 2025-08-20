<template>
  <div class="bg-container"></div>
  <div class="about-content">
    <!-- Header -->
    <h2 class="section-title">About Barangay Malabanban Norte</h2>
    <p class="section-desc">
      Barangay Malabanban Norte is committed to delivering efficient, inclusive, and
      citizen-centered services. This system was built to make it easier for residents to access
      important services and communicate with the barangay staff.
    </p>

    <!-- Mission & Vision -->
    <div class="mission-vision">
      <div class="mv-card">
        <!-- <img src="@/assets/mission.gif" alt="Mission" /> -->
        <h3>Our Mission</h3>
        <p>
          To enhance service delivery and transparency through digital transformation in local
          governance.
        </p>
      </div>
      <div class="mv-card">
        <!-- <img src="@/assets/vision.gif" alt="Vision" /> -->
        <h3>Our Vision</h3>
        <p>
          A connected and responsive barangay where every resident can easily access services and
          information.
        </p>
      </div>
    </div>

    <!-- Services Offered -->
    <h3 class="services-title">What This System Offers</h3>
    <div class="services-grid">
      <div class="service-card">
        <!-- <img src="@/assets/certificate.gif" alt="Certificates" /> -->
        <p>Online certificate and document requests</p>
      </div>
      <div class="service-card">
        <!-- <img src="@/assets/health.gif" alt="Health Services" /> -->
        <p>Appointment</p>
      </div>
      <div class="service-card">
        <!-- <img src="@/assets/complaint.gif" alt="Complaints" /> -->
        <p>Complaint filing and monitoring</p>
      </div>
      <div class="service-card">
        <!-- <img src="@/assets/announcement.gif" alt="Announcements" /> -->
        <p>Latest announcements and news</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
}
</script>

<style scoped>
/* Background stays fixed */
.bg-container {
  min-height: 100vh;
  background-image: url('@/assets/bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
}

/* Content box */
.about-container {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically (optional) */
  padding: 40px 20px;
}

.about-content {
  max-width: 1100px;
  background: rgba(255, 255, 255, 0.8); /* More transparent */
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
}

/* Titles */
.section-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
}

.section-desc {
  font-size: 1.1rem;
  line-height: 1.6;
  text-align: center;
  margin-bottom: 40px;
}

/* Mission & Vision layout */
.mission-vision {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.mv-card {
  flex: 1;
  min-width: 250px;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
}

.mv-card img {
  width: 60px;
  margin-bottom: 15px;
}

/* Services grid */
.services-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.service-card {
  background: #ffffff;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-card img {
  width: 50px;
  margin-bottom: 10px;
}

/* Contact link */
.contact-link {
  text-align: center;
  margin-top: 20px;
}

.contact-link a {
  color: #007bff;
  font-weight: bold;
  text-decoration: none;
}

.contact-link a:hover {
  text-decoration: underline;
}

/* Responsive tweaks */
@media (max-width: 768px) {
  .mission-vision {
    flex-direction: column;
  }
}
</style>
