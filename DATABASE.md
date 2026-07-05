# NovaCore LMS Pro Database

## Database

MongoDB

---

## Database Name

novacore_lms_pro

---

# Collections

1. users

2. courses

3. contacts

4. enrollments

5. assignments

6. studyMaterials

7. announcements

---

# users Collection

Stores all users.

Role Types

- student
- teacher
- admin

Fields

_id

fullName

email

password

role

profileImage

phone

address

city

country

isActive

createdAt

updatedAt

---

# courses Collection

Stores all courses.

Fields

_id

title

description

thumbnail

instructor

zoomMeetingLink

courseDuration

coursePrice

isPublished

createdAt

updatedAt

---

# contacts Collection

Stores messages submitted from Contact Form.

Fields

_id

name

email

subject

message

createdAt

updatedAt

---

# Relationships

users (Teacher)

↓

courses

One Teacher

↓

Many Courses

courses

↓

Many Students

(Through enrollments Collection)

---

# Indexes

users.email

Unique

courses.title

Normal Index

contacts.email

Normal Index
# Sample Documents

## users

{
  "fullName": "Babar Akram",
  "email": "babarakram339@gmail.com",
  "password": "Encrypted Password",
  "role": "admin",
  "phone": "03290024425",
  "city": "Luddan",
  "country": "Pakistan",
  "isActive": true
}

---

## courses

{
  "title": "Complete Web Development",
  "description": "Learn HTML, CSS, JavaScript and Backend Development.",
  "thumbnail": "/uploads/web-development.png",
  "instructor": "User ObjectId",
  "zoomMeetingLink": "https://zoom.us/j/xxxxxxxx",
  "courseDuration": "3 Months",
  "coursePrice": 15000,
  "isPublished": true
}

---

## contacts

{
  "name": "Ali Khan",
  "email": "ali@example.com",
  "subject": "Course Information",
  "message": "I want details about your Web Development course."
}

---

## enrollments

{
  "student": "User ObjectId",
  "course": "Course ObjectId",
  "status": "active",
  "enrolledAt": "Auto Date"
}

---

## assignments

{
  "course": "Course ObjectId",
  "title": "HTML Project",
  "description": "Create a responsive landing page.",
  "dueDate": "2026-08-15"
}

---

## studyMaterials

{
  "course": "Course ObjectId",
  "title": "Lecture 01 PDF",
  "file": "/uploads/lecture1.pdf"
}

---

## announcements

{
  "title": "Holiday Notice",
  "message": "Classes will remain closed on Friday.",
  "createdBy": "Admin ObjectId"
}

---

# Backup Strategy

- Daily MongoDB Backup
- Weekly Full Backup
- Monthly Archive Backup

---

# Security

- Store passwords using bcrypt.
- Protect routes using JWT Authentication.
- Never expose MongoDB credentials.
- Keep .env file outside public access.
- Validate all incoming API requests.
- Use HTTPS in production.

---

# Production Notes

- Enable MongoDB indexes.
- Monitor database performance.
- Remove unused records regularly.
- Keep backups before major updates.
- Restrict database access to authorized users only.

---

# Database Status

Database Design

Completed

Ready for Backend Integration
