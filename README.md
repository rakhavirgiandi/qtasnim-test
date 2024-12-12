# Laravel 11 + Inertia React Project

This project is built with **Laravel 11** and **Inertia.js** using React. Follow the instructions below to set up and run the project locally.

## Requirements

Make sure your environment meets the following requirements:

- **PHP**: >= 8.1
- **Node.js**: >= 18.x
- **Composer**: Installed globally
- **Database**: MySQL or compatible

## Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install Dependencies**:
   - Install PHP dependencies:
     ```bash
     composer install
     ```
   - Install Node.js dependencies:
     ```bash
     npm install
     ```

3. **Set Environment Variables**:
   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update `.env` with your database credentials and other configuration settings.

4. **Generate Application Key**:
   ```bash
   php artisan key:generate
   ```

## Database Setup

1. **Run Migrations**:
   ```bash
   php artisan migrate
   ```

2. **Run Seeders** (if applicable):
   ```bash
   php artisan db:seed
   ```

## Running the Project

1. **Start the Backend Server**:
   ```bash
   php artisan serve
   ```

2. **Run the Frontend Development Server**:
   ```bash
   npm run dev
   ```

Your application should now be accessible at `http://localhost:8000`.

## Notes

- Ensure that your `.env` file is properly configured before running migrations or seeders.
- If you encounter issues, check the Laravel and Inertia documentation for troubleshooting guidance.
- You can find the credentials in `database/seeders/UserSeeder.php`.

Feel free to open issues or submit pull requests for improvements!
