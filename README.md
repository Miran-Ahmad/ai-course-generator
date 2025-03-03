# AI Course Generator

![Screenshot (20)](https://github.com/user-attachments/assets/921f3780-e635-499b-a94d-30596f0ef6f9)

![Screenshot (23)](https://github.com/user-attachments/assets/7a52247a-76ef-4b3e-b65e-08fcd8d2d363)

![Screenshot (24)](https://github.com/user-attachments/assets/e0221309-017e-4a1e-93ff-c85bd11a44ed)

AI Course Generator is an AI-powered platform that dynamically generates educational courses based on user preferences. It leverages modern web technologies and AI tools to provide an interactive learning experience.

## Features

- **AI-Powered Course Generation**: Uses Google Generative AI to create structured courses.
- **User Authentication**: Secure login and authentication using Clerk.
- **Interactive UI**: Built with Tailwind CSS.
- **Database Management**: PostgresSQL with Drizzle ORM for efficient data handling.
- **Video Integration**: Embedded learning materials using React-YouTube.
- **Markdown Support**: Courses rendered with React-Markdown for easy formatting.

## Technologies Used

- **Framework**: Next.js 14, React 18
- **Styling**: Tailwind CSS, Emotion
- **UI Components**: MUI, Radix UI
- **AI Integration**: Google Generative AI - Gemini 1.5 Flash
- **Database**: PostgresSQL
- **Authentication**: Clerk
- **Other Tools**: Axios, Lucide-React, UUID

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Miran-Ahmad/ai-course-generator.git
   cd ai-course-generator
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables (create a `.env.local` file):
```sh
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
  CLERK_SECRET_KEY=your_clerk_secret_key
  NEXT_PUBLIC_CLERK_SIGN_UP_URL=signup_route (/sign-up)
  NEXT_PUBLIC_CLERK_SIGN_IN_URL=signin_route (/sign-in)  
  NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key  
  NEXT_PUBLIC_DB_CONNECTION_STRING=your_database_connection_string  
  NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key  
  NEXT_PUBLIC_HOST_NAME=your_hostname (http://localhost:3000)
```

6. Push the database schema:
   ```sh
   npm run db:push
   ```

7. Start the development server:
   ```sh
   npm run dev
   ```

8. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Sign up or log in to access or create personalized courses.
- Select topics of interest to generate AI-powered courses.
- View course content with video integration.

## Contribution

Contributions are welcome! To contribute:
- Fork the repository.
- Create a feature branch.
- Commit your changes.
- Open a pull request.

## Contact

For any queries, reach out to:

- **Saurav Mishra**
- Email: [saurav24242424@gmail.com](mailto:saurav24242424@gmail.com)
- GitHub: [sauravney](https://github.com/sauravney)

OR
  
- **Md Miran Ahmad**
- Email: [222miran222@gmail.com](mailto:222miran222@gmail.com)
- GitHub: [Miran-Ahmad](https://github.com/Miran-Ahmad)
