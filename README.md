# React Interns Interview — Practical

This is a small React (V16+) application for creating and managing user accounts. It includes: login, registration, and an account page where the user can view and edit their profile.

Key points
- Uses client-side storage (localStorage) for simple persistence — no backend required.
- Bootstrap 5 for basic styling and responsive layout.
- Simple form validation and error handling.

How to run locally
1. Install dependencies:

```powershell
npm install
```

2. Start the dev server:

```powershell
npm start
```

The app will open at http://localhost:3000 by default.

What I implemented
- Login page (/login)
- Registration page (/register)
- Account page (/account) with edit and logout

Notes for reviewers
- All user data is stored in localStorage (key: `users`, `currentUser`). This keeps the demo self-contained.
- Passwords are stored in plain text for the purposes of this assignment (no backend). In production, never store plain passwords.

Next steps (optional)
- Add unit tests
- Add a tiny JSON-server backend or Firebase for persistence
- Improve accessibility and form error messaging
