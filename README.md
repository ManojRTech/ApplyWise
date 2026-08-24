# ApplyWise – Full Stack Recruitment Platform
## ApplyWise is a full-stack recruitment platform that connects job seekers with employers. Employers can post jobs, manage applicants, and evaluate candidates, while job seekers can discover opportunities, analyze their resumes, and apply intelligently. The platform provides secure JWT-based authentication, role-based access control, resume uploads, AI-powered resume and job description analysis, semantic skill matching using embeddings, application insights, and cloud deployment.
---

## 🚀 Live Demo

**Frontend:**  
https://apply-wise-indol.vercel.app

**Backend API:**  
https://hireflow-2sol.onrender.com

---

## 📸 Screenshots

### Home Page
<img src="ScreenShots/HomePage.png" width="800"/>

### Job Seeker Interface

#### Job Listings
<img src="ScreenShots/JobListing.png" width="800"/>

#### Job Details
<img src="ScreenShots/JobDetails.png" width="800"/>

#### Apply Job
<img src="ScreenShots/ApplyForJob.png" width="800"/>

#### Analyze Resume and Get Insights
<img src="ScreenShots/AnalyzeResumeAndGetInsights.png" width="800"/>

#### Job Insights
<img src="ScreenShots/JobInsights.png" width="800"/>

#### Job Seeker Applications
<img src="ScreenShots/MyApplications.png" width="800"/>

### Employer Interface

#### Create Job
<img src="ScreenShots/CreateJob.png" width="800"/>

#### Employer Posted Jobs
<img src="ScreenShots/MyPostedJob.png" width="800"/>

#### Employer Job Applications
<img src="ScreenShots/EmployerApplicationsView.png" width="800"/>

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* React Router

### Backend

* Java
* Spring Boot
* Spring Security
* JWT Authentication
* RESTful APIs

### Database

* PostgreSQL

### Deployment

* Docker
* Vercel – Frontend
* Render – Backend
* Neon – PostgreSQL Database

---

## ✨ Features

### Authentication & Authorization

* Secure user registration and login
* JWT based authentication
* Role based access (Employer / Job Seeker)

### Job Management

Employers can:

* Create job postings
* Edit or delete job listings
* View all jobs they posted

### Job Discovery

Job seekers can:

* Browse available jobs
* View detailed job information
* Search and filter jobs

### Resume Analysis & Insights

* Analyze resume against job description before applying
* AI-powered extraction of job requirements and candidate skills
* Semantic skill matching using embeddings
* Skill match score based on required job skills
* Competition level based on number of applicants
* Employer responsiveness tracking
* Success probability estimation for informed decision-making
  
### Job Applications

Job seekers can:

* Apply to jobs
* Upload resume files
* Analyze resume before applying
* Track application status

Employers can:

* View job applicants
* Access uploaded resumes
* Shortlist or reject candidates
* Provide optional assessment links
* Send application status notifications via email

### Email Notifications

* Email notifications for application status updates
* Rejection emails with custom messages
* Shortlisting emails with optional assessment links
* Email delivery failures do not prevent application status updates

### File Upload

* Resume upload using `MultipartFile`
* Files served through `/uploads` endpoint

---

## 🔐 Security

* JWT based authentication
* Spring Security configuration
* Protected REST endpoints
* Role-based authorization
* Secure email communication via backend service

---

## ⚙️ Environment Variables

Example environment configuration:

### Frontend

```
VITE_API_URL=<backend-api-url>
VITE_BACKEND_URL=<backend-base-url>
```

### Backend

```text
DATABASE_URL=<database-url>
DATABASE_USERNAME=<db-username>
DATABASE_PASSWORD=<db-password>
JWT_SECRET=<jwt-secret>
PORT=<server-port>
MAIL_USERNAME=<email-username>
MAIL_PASSWORD=<email-app-password>
```

---

## 🧪 Running Locally

### Backend

```bash
cd ApplyWise-backend
./mvnw spring-boot:run
```

### Frontend

```bash
cd ApplyWise-frontend
npm install
npm run dev
```

---

## 📌 Future Improvements

* Job recommendation system
* Admin dashboard
* Advanced job search filters

---

## 👨‍💻 Author

**Manoj R**

GitHub:
https://github.com/ManojRTech

---

## ⭐ Support

If you found this project useful, consider giving it a star ⭐ on GitHub.

## About
ApplyWise – A full-stack job recruitment platform built with Spring Boot, React (Vite), JWT Authentication, and PostgreSQL. Includes resume analysis, skill matching, competition scoring, employer responsiveness, success prediction, and email notification system for application updates
