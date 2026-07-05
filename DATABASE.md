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
