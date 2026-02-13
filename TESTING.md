# War Paws Europe – Testing Documentation

---

## Introduction

This document outlines the testing procedures carried out for the War Paws Europe full-stack Django application.

Testing was performed manually to ensure:

- Functionality (CRUD operations)
- Data integrity
- Responsive design
- Security configuration
- Deployment accuracy
- Database integration

Both local development and deployed production versions were tested.

Production URL:
https://war-paws-europe-django.onrender.com/

GitHub Repository:
https://github.com/HannaGreentree/war-paws-europe-django

---

# Functional Testing (CRUD)

## Blog – Create

| Test | Result | Actual

| Create new blog post via admin | Post saved successfully and visible in blog list | Post appeared correctly on blog page | ✅ PASS |
| Upload image with blog post | Image saved in media folder and displayed | Image displayed correctly in blog detail | ✅ PASS |
| Save post as Draft | Post does not appear publicly | Draft post hidden from public blog | ✅ PASS |

Screenshot: (images/testing/blog-create.png)

---

## Blog – Read

| Test | Expected Result | Actual Result | Status |

| Open blog list page | All published posts displayed | Posts displayed correctly |✅ PASS |

| Open individual blog post| Full post content shown | Full content rendered properly | ✅ PASS |

Screenshot: (images/testing/blog-read.png)

---

## Blog – Update

| Test              | Expected Result           | Actual Result             | Status  |
| ----------------- | ------------------------- | ------------------------- | ------- |
| Edit blog title   | Title updates immediately | Title updated correctly   | ✅ PASS |
| Edit blog content | Content updated           | Content reflected on page | ✅ PASS |

Screenshot: (images/testing/blog-update.png)

---

## Blog – Delete

| Test             | Expected Result                   | Actual Result          | Status  |
| ---------------- | --------------------------------- | ---------------------- | ------- |
| Delete blog post | Post removed from database and UI | Post no longer visible | ✅ PASS |

Screenshot: (images/testing/blog-delete.png)

---

## Shelters – CRUD

| Test                 | Expected Result           | Actual Result                 | Status  |
| -------------------- | ------------------------- | ----------------------------- | ------- |
| Create new shelter   | Shelter saved and visible | Shelter appeared correctly    | ✅ PASS |
| Edit shelter details | Information updated       | Changes reflected immediately | ✅ PASS |
| Delete shelter       | Shelter removed           | Entry removed successfully    | ✅ PASS |

Screenshot: (images/testing/shelter-crud.png)

---

# Authentication & Security Testing

| Test | Expected Result | Actual Result | Status |

| Access /admin without login | Redirect to login page | Redirect successful | ✅ PASS |
| Login with correct credentials | Admin dashboard accessible | Dashboard opened | ✅ PASS |
| Login with incorrect password | Access denied | Error message displayed | ✅ PASS |
| SECRET_KEY stored in environment | Not visible in repository | Confirmed via GitHub | ✅ PASS |
| DEBUG disabled in production | No debug error pages shown | Production secure | ✅ PASS |

Screenshot: (images/testing/admin-login.png)

---

# Database Testing

| Test | Expected Result | Actual Result | Status |

| PostgreSQL connected in production | Production database active | Database functioning | ✅ PASS |
| Migrations applied successfully | No migration errors | Confirmed | ✅ PASS |
| Relationships enforced | ForeignKey linking works | Posts linked to users | ✅ PASS |

---

# Deployment Testing (Render)

| Test | Expected Result | Actual Result | Status |

| Application builds successfully | Build completes without error | Build successful | ✅ PASS |
| Gunicorn start command works | App starts on deploy | Server running | ✅ PASS |
| Static files served | CSS loads properly | Styles applied | ✅ PASS |
| Media files served | Uploaded images visible | Images display correctly | ✅ PASS |

Production URL tested:
https://war-paws-europe-django.onrender.com/

---

# Responsive Testing

Tested using Chrome Developer Tools and Safari.

| Device           | Result                      | Status  |
| ---------------- | --------------------------- | ------- |
| Desktop (1920px) | Layout stable and readable  | ✅ PASS |
| Tablet (768px)   | Navigation adjusts properly | ✅ PASS |
| Mobile (375px)   | Content readable and usable | ✅ PASS |

Screenshot:
(images/testing/mobile-view.png)

---

# Browser Compatibility

| Browser | Result           | Status  |
| ------- | ---------------- | ------- |
| Chrome  | Fully functional | ✅ PASS |
| Safari  | Fully functional | ✅ PASS |
| Edge    | Fully functional | ✅ PASS |

---

# Accessibility Testing

| Test                           | Result    | Status  |
| ------------------------------ | --------- | ------- |
| Alt text present on images     | Confirmed | ✅ PASS |
| Navigation usable via keyboard | Confirmed | ✅ PASS |
| Semantic HTML structure used   | Confirmed | ✅ PASS |

---

# Performance Testing

| Test                            | Result    | Status  |
| ------------------------------- | --------- | ------- |
| Page loads under 3 seconds      | Confirmed | ✅ PASS |
| No console errors in production | Confirmed | ✅ PASS |

---

# Validation Testing

HTML:

- Checked for structural errors
- No critical issues found

CSS:

- Checked for major syntax errors
- No critical issues found

Python:

- Code follows PEP8 standards
- Proper indentation and naming conventions used

---

# Bug Fix Log

| Bug | Cause |Fix |

| Blog images not displaying | MEDIA_URL not configured | Added media URL configuration |
| Static files missing in production | WhiteNoise not configured | Installed and configured WhiteNoise |
| Admin login issue | Password reset required | Reset password via manage.py |

All major issues resolved before final deployment.

---

# Conclusion

All functional, security, deployment and usability tests were completed successfully.

The War Paws Europe application meets the assessment requirements:

- Relational database working
- CRUD fully operational
- Secure production deployment
- Responsive design
- Environment variables used
- Testing documented clearly

No critical unresolved bugs remain.
