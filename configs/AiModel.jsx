const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const GenerateCourseLayout_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a course tutorial on the following detail with field as Course Name, about, Duration, Category: Programming, Topic: Python, Level: Basic, Duration: 1 hours, No of Chapters: 5, in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n"course": {\n  "name": "Introduction to Python Programming",\n  "description": "This one-hour introductory course provides a foundational understanding of Python programming.  We will cover basic syntax, data types, and control flow, enabling you to write simple Python programs.",\n  "Chapters": [\n    {\n      "name": "Introduction to Python",\n      "about": "This chapter introduces the Python programming language, its history, features, and why it is a popular choice for beginners and experienced programmers alike.",\n"duration": "15 minutes"\n    },\n    {\n        "name": "Setting Up Your Python Environment",\n        "about": "This chapter guides learners through installing Python, setting up a development environment, and writing their first Python script.",\n"duration": "10 minutes"\n    },\n    {\n        "name": "Python Basics: Variables and Data Types",\n        "about": "This chapter covers fundamental concepts such as variables, data types, and basic operations in Python.",\n"duration": "15 minutes"\n    },\n    {\n        "name": "Control Flow: Conditional Statements and Loops",\n        "about": "This chapter explores decision-making in Python using if-else statements and loops, including for and while loops.",\n"duration": "10 minutes"\n    },\n    {\n        "name": "Functions and Modules",\n        "about": "This chapter introduces the concept of functions, their importance in code reusability, and how to organize code using modules.",\n"duration": "10 minutes"\n    }\n  ]\n}\n}\n```\n',
        },
      ],
    },
  ],
});

export const GenerateChapterContent_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Explain the concept in Detail on Topic: Python, Chapter: Introduction to Python and Setting up your environment, in JSON Format with list of array with field as title, explaination on given chapter in detail, Code Example(Code field in <predoce> format) if applicable",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n    {\n      "title": "What is Python?",\n      "": "Python is a high-level, general-purpose programming language known for its readability and ease of use.  It\'s interpreted (not compiled), meaning code is executed line by line by an interpreter, making it easier for beginners to learn and debug. Python\'s versatility allows its use in various domains, including web development, data science, machine learning, scripting, automation, and more. Its large and active community provides extensive support and readily available libraries.",\n      "codeExample": "<precode>\\n# Assigning a value to a variable\\nname = \\"Alice\\"\\n\\n# Accessing the value\\nprint(name) # Output: Alice\\n</precode> \n    },\n    {\n      "title": "Key Features of Python",\n      "": "Python boasts several features that contribute to its popularity:\\n* **Readability:**  Its syntax emphasizes code clarity, using indentation to define code blocks instead of braces (like {} in many other languages).\\n* **Interpreted Language:**  Code is executed directly by the interpreter without prior compilation, simplifying the development cycle.\\n* **Dynamically Typed:** You don\'t need to explicitly declare variable types; Python infers them at runtime.\\n* **Large Standard Library:**  Provides modules and packages for a wide range of tasks, reducing development time.\\n* **Extensive Community & Support:**  A vast and supportive community ensures readily available resources, libraries, and assistance.\\n* **Cross-Platform:** Python code can run on various operating systems (Windows, macOS, Linux) with minimal modifications.",\n      "codeExample": ""\n    },\n    {\n      "title": "Setting up your Python Environment",\n      "": "Before you can write and run Python code, you need to set up a Python environment on your computer. This typically involves these steps:\\n\\n1. **Download Python:** Visit the official Python website (python.org) and download the latest version appropriate for your operating system.\\n2. **Installation:** Run the downloaded installer, following the on-screen instructions. Make sure to add Python to your system\'s PATH during installation so you can run Python from your terminal or command prompt.\\n3. **Verify Installation:** Open your terminal or command prompt and type `python --version` or `python3 --version` (depending on your installation). A version number should be displayed, confirming successful installation.\\n4. **Choosing an IDE or Text Editor:** An Integrated Development Environment (IDE) like VS Code, PyCharm, or Thonny provides features like code completion, debugging, and integrated terminal.  Alternatively, you can use a simple text editor like Notepad++ (Windows), Sublime Text, or Atom.",\n      "codeExample": ""\n    },\n    {\n      "title": "Running your first Python program",\n      "": "After setting up your environment, you can write and run your first Python program. A classic example is the \\"Hello, world!\\" program:",\n      "codeExample": "<precode>\\nprint(\\"Hello, world!\\")\\n</precode>"\n    },\n    {\n      "title": "Using a Virtual Environment (Recommended)",\n      "": "For larger projects, its best practice to use virtual environments. A virtual environment isolates project dependencies, preventing conflicts between different projects.  You can create and manage virtual environments using tools like `venv` (built into Python 3) or `virtualenv` (a third-party package).",\n      "codeExample": "<precode>\\n# Creating a virtual environment using venv (Linux/macOS/Windows):\\npython3 -m venv myenv\\n\\n# Activate the virtual environment (Linux/macOS):\\nsource myenv/bin/activate\\n\\n# Activate the virtual environment (Windows):\\nmyenv\\\\Scripts\\\\activate\\n\\n# Install packages within the virtual environment (using pip):\\npip install requests\\n</precode>"\n    },\n    {\n      "title": "Understanding the Python Interpreter",\n      "": "The Python interpreter executes your code line by line. You can interact with it directly through the interactive Python shell (by typing `python` or `python3` in your terminal). This is useful for testing code snippets and experimenting.",\n      "codeExample": "<precode>\\n>>> 2 + 2\\n4\\n>>> print(\\"Hello from the interpreter!\\")\\nHello from the interpreter!\\n</precode>"\n    }\n  ]\n```\n',
        },
      ],
    },
  ],
});

//   const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());
