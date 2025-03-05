<p align="center"><a href="https://michaelsuch.co.uk/wp-content/uploads/2025/02/cq-logo.png" target="_blank"><img src="https://michaelsuch.co.uk/wp-content/uploads/2025/02/cq-logo-black.png" width="400" alt="Capitals quiz Logo"></a></p>

# Capitals Quiz

Test your knowledge on the capital cities of the world with the this interactive multiple choice quiz

The following packages have been installed and implemented on the React frontend:

```bash
Vite
Axios
React Router
Tailwind.css
Heroicons
```
The following packages have been installed and implemented on the Laravel backend:

```bash
Sanctum
```

## Installation

Pre-requisites:

- Install docker desktop and ensure this is running - <a href="https://www.docker.com/products/docker-desktop/">Docker Desktop</a>
- Install Node.js - <a href="https://nodejs.org/en">Node.js</a>
- Install composer - <a href="https://getcomposer.org/download/">Composer</a>

Clone the git files from suchm/capitals-quiz to a local repository.

cd into the repository then run the following commands:

Install dependencies in capitals-quiz/frontend:

```bash
npm install
```

Install dependencies in capitals-quiz/backend:

```bash
composer install
```
Copy `.env.example` and create a `.env` file.

Generate an encryption key

```bash
php artisan key:generate
```
Add the MySQL database configuration to the `.env` file:

```bash
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=capitals-quiz
DB_USERNAME=root
DB_PASSWORD=password
```
Add the following API key to the `.env` file:

```bash
COUNTRIES_CAPITAL_API_ENDPOINT=https://countriesnow.space/api/v0.1
``` 

Build docker container:

```bash
docker-compose up --build -d
``` 
Migrate database:

```bash
docker exec -t capitals-quiz-backend php artisan migrate
```
Migrate test database:

```bash
docker exec -it capitals-quiz-backend php artisan migrate --env=testing
```

Once your local environment is up and running the site should now load on:

```bash
http://localhost:5173/
```
To run the laravel tests: 

```bash
docker exec -it capitals-quiz-backend php artisan test
```
Or if the test option is not found then the following:

```bash
docker exec -it capitals-quiz-backend vendor/bin/phpunit
```

## Usage

- Navigate to the homepage on http://localhost:5173/
- You will need to register to access the quiz as the endpoint is protected.
- Once registered this will redirect you to the quiz.
- Once an answer is selected a next button will appear to move to the next one.
- You can end the quiz at any time by clicking the "End quiz" button.
- Once ended you can restart the quiz by clicking the "Restart quiz" button.

## Security strategies

- Validating and sanitising inputs.
- Implementing Laravel Sanctum for API authentication.
- Handling errors in the frontend to providing user friendly messages.
- Implemented try and catch methods in backend allowing requests to fail gracefully.
- Cached API request to limit the number of calls to the endpoint.
- Added retry attempts to API request in case it fails.
- Applied throttling to login and register to handle brute force attacks


