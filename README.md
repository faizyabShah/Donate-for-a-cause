# Donate-for-a-cause
Welcome to the Donate-for-a-cause project! This system is designed to facilitate donations for various projects listed by organizations. Users can explore projects, contribute donations, track the progress of projects, and stay informed about their completion status. Organizations can also utilize this platform to sign up and showcase their projects to receive support from users.

## Table of Contents
- Getting Started
- - Prerequisites
- - Installation
- Features

## Getting Started
### Prerequisites
Before you begin, ensure you have the following prerequisites:

- Node.js and npm (Node Package Manager)
- MongoDB instance or connection URL
- GitHub account (for cloning the repository and interacting with issues)

### Installation
- Clone the repository:

git clone https://github.com/faizyabShah/Donate-for-a-cause.git

- Navigate to the project directory:

cd Donate-for-a-cause

### Install the required dependencies:

- navigate to the frontend folder with:

cd frontend

- and run:

npm install

- similarly, navigate to the backend folder with:

npm backend

- and run:

npm install

- Configure environment variables:

Create a .env file in the project root and provide the following variables:

PORT=5000
MONGODB_URI=your_mongodb_connection_url
SECRET_KEY=anysecretkey

### Start the application:
- In frontend directory, run:
  
npm start

-In backend directory, run:

node server.js

## Usage
### User Roles
#### User: 
Users can explore listed projects, view donation progress, contribute donations, and monitor project completion status.
#### Organization: Organizations can sign up, log in, and list their projects, along with their funding goals and descriptions.
#### Features:
- Browse Projects: Users can view a list of projects listed by various organizations.
- Project Details: Users can access detailed information about a specific project, including its description, donation progress, and completion status.
- Donate: Users can contribute donations to ongoing projects.
- User Authentication: Secure user authentication and authorization for organizations and users.
- Organization Dashboard: Organizations can log in and access a dashboard to manage their listed projects.
- Project Creation: Organizations can create, edit, and delete their projects, specifying funding goals and descriptions.
- Admin Panel: Admin users can monitor and manage organizations, projects, and user activities.


### Contributing
Contributions to Donate-for-a-cause are welcome! If you find any issues or have suggestions for improvements, please feel free to submit an issue or create a pull request.

When contributing code, please ensure the following:

Follow the existing code style and structure.
Include relevant comments and documentation.
Test your changes thoroughly.

We hope this system helps make a positive impact by facilitating donations for various worthy causes. Thank you for using Donate-for-a-cause to contribute to meaningful projects!
