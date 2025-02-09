# UGAHacks Project Log - Chess Wiz

## Project Information

**Project Title:** Chess Wiz  
**Team Members:** Michael Robinson, Santos Ochoa  
**Tier Level:** Intermediate
**Project Description:**  
Chess Wiz is a web application designed to help chess players analyze their playing style, providing insights into their strengths and weaknesses to improve their game.

---

## Friday

### Goals:

- Create repository
- Push initial project files

### Progress:

- Created the repository but faced issues pushing initial project files.

### Challenges:

- **Issue:** Trouble building the Android project, preventing us from pushing files.  
  **Solution:** Discovered that OneDrive on Windows was interfering. Moving the project outside of OneDrive allowed successful builds.

### Learning:

- Started an Android application using **React Native** and the **Expo Framework** by reading documentation.

### AI Usage:

- Used AI to help debug Android build issues.

### Tools & Contributions:

- **React Native:** Built a cross-platform mobile app with a single codebase.
- **Expo Framework:** Simplified React Native development, allowing focus on the core application.

---

## Saturday

### Goals:

- Push initial project files
- Integrate Supabase Auth & Database
- Create Login & Signup Pages (and style them)
- Create Overview & Main Page
- Integrate various APIs: OpenAI, StockFish, Lichess, chess.js, react-chessboard

### Progress:

- Created a **Next.js** project with **Supabase**.
- Implemented **authentication** (Sign up & Login) with Supabase.
- Styled the Login and Sign Up pages.
- Integrated **database** for storing user data and game overviews.
- Tested API calls using **Postman**.
- Integrated:
  - **OpenAI API** (for player insights)
  - **StockFish API** (for chess engine analysis)
  - **Lichess API** (successful after switching to Next.js)
  - **chess.js & react-chessboard** (for rendering the chessboard)

### Challenges:

1. **Lichess API not working with Expo.**
   - Solution: Switched to a **web application** using **Next.js** instead of React Native.
2. **Issues testing endpoints with Postman.**
   - Solution: Read **Supabase documentation** and used AI to construct HTTP requests properly.
3. **Trouble handling authentication and session persistence in Next.js.**
   - Solution: Implemented **Supabase Auth** to persist sessions correctly.

### Learning:

- Gained hands-on experience with **Backend-as-a-Service (BaaS)** solutions.
- Integrated multiple third-party **APIs**.
- Managed dependencies with **npm**.
- Learned how to format **HTTP requests** and work with **Postman**.
- Developed a better understanding of building **dynamic web pages** with React.

### AI Usage:

- Helped with:
  - Constructing HTTP requests for Supabase API.
  - Debugging compilation errors.

### Tools & Contributions:

- **GitHub:** Managed version control and team collaboration.
- **Supabase:** Provided authentication and database capabilities.
- **Next.js:** Enabled structured API routes, authentication, and state persistence.
- **React:** Built UI components and managed state.
- **VS Code:** Assisted in writing and committing code via GitHub GUI.
- **Postman:** Used for API testing and debugging.

---

## Sunday

### Goals:

- Verify that authentication is working.

### Progress:

- Successfully verified authentication using **Supabase Auth**.

### Challenges:

- **Issue:** Trouble persisting user sessions.  
  **Solution:** Read **Supabase documentation** and implemented correct session handling.

### Learning:

- Learned how to persist user sessions using **cookies**.

### AI Usage:

- None.
