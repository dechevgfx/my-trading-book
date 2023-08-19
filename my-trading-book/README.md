# Trading Idea Sharing App Documentation
# DEPLOYMENT LINK: https://my-trading-book.vercel.app

## Project Overview

The Trading Idea Sharing App is an Angular-based web application that provides a platform for traders to share their trading ideas, insights, and strategies with each other. The app is organized into various modules, components, and services to facilitate easy development and maintenance.

## Project Structure

- **Root Directory:**

  - Contains configuration files (`angular.json`, `firebase.json`, etc.).
  - Entry point: `src/index.html`.
  - Configuration files for TypeScript: `tsconfig.app.json`, `tsconfig.json`, `tsconfig.spec.json`.

- **`src/` Directory:**

  - Contains the application's source code.
  - Main module: `app.module.ts`.
  - Main application component: `app.component.ts`.

- **`src/app/` Directory:**
  - Core application functionality is structured here.

## Modules

- **AppModule (`app.module.ts`):**

  - Bootstraps the application.
  - Imports and configures necessary modules and components.
  - Sets up routing.

- **AuthModule (`auth.module.ts`):**

  - Manages user authentication and registration.
  - Includes components related to user authentication.
  - Defines routes for authentication-related pages.

- **DashboardModule (`dashboard.module.ts`):**

  - Handles trading idea sharing and dashboard functionality.
  - Includes components for managing trading ideas, user profiles, and trading details.
  - Defines routes for dashboard pages.

- **SharedModule (`shared.module.ts`):**
  - Contains shared UI components.
  - Includes header, footer, layout, and chart components.
  - Provides components that are reused across modules.

## Components

- **Authentication Components:**

  - `LoginFormComponent`: Renders a login form for users to authenticate.
  - `SignFormComponent`: Renders a sign-up form for new users to register.
  - `ForgotPasswordComponent`: Allows users to reset their passwords.
  - `TopThreeTradesComponent`: Displays top three popular trading ideas.

- **Dashboard Components:**

  - `TradeFormComponent`: Enables users to submit new trading ideas.
  - `UserTradesComponent`: Displays trading ideas posted by a specific user.
  - `SettingsMenuComponent`: Provides settings options for user profiles.
  - `AllTradesComponent`: Lists all trading ideas in a tabular format.
  - `DetailsComponent`: Displays detailed information about a specific trading idea.
  - `TradeComponent`: Displays a single trading idea.
  - `LikedComponent`: Lists trading ideas that the user has liked.
  - `LikedTradesComponent`: Displays trading ideas that have been liked.
  - `ExternalLinkDirective`: A custom directive to open external links in a new tab.

- **Shared Components:**
  - `SidebarComponent`: Displays a navigation sidebar.
  - `FooterComponent`: Displays the footer of the application.
  - `LayoutComponent`: Arranges the overall layout structure.
  - `LiveChartComponent`: Displays live trading charts.

## Services

- **AuthService:**

  - Manages user authentication using Firebase.
  - Provides methods for login, registration, password reset, etc.

- **StorageService:**

  - Handles file storage operations for trading ideas' images and other files.

- **TradeService:**

  - Manages trading idea-related operations such as creating, updating, and retrieving trading ideas.

- **UserService:**
  - Handles user-related operations, including fetching user profiles.

## External Libraries and Dependencies

- [Angular Material](https://material.angular.io/): Provides a set of UI components following the Material Design guidelines.
- [AngularFire](https://firebaseopensource.com/projects/angular/angularfire2): Integrates Firebase authentication and real-time database functionality.
- [Angular Router](https://angular.io/guide/router): Manages navigation and routing within the application.
- [Firebase](https://firebase.google.com/): Backend-as-a-Service platform for authentication, database, and storage services.

## Development Setup

1. **Clone the Repository:**
   git clone <repository_url>

2. **Navigate to the Project Directory:**
   cd trading-idea-sharing-app

3. **Install Dependencies:**
   npm install

4. **Configure Firebase:**

- Update `src/environments/environment.ts` and `src/environments/environment.prod.ts` with your Firebase configuration.

5. **Serve the App:**
   ng serve

6. **Access the App:**
   Open a web browser and navigate to `http://localhost:4200`.

## Build and Deployment

1. **Build the App:**
   ng build --prod

2. **Deploy:**

- Deploy the contents of the `dist/` directory to your hosting provider.

## Features and Usage

1. **User Authentication:**

- Register a new account using the `SignFormComponent`.
- Log in with existing credentials using the `LoginFormComponent`.
- Reset forgotten passwords using the `ForgotPasswordComponent`.

2. **Dashboard:**

- Post your trading ideas using the `TradeFormComponent`.
- View detailed information about specific trading ideas using the `DetailsComponent`.
- Like and view your liked trading ideas using the `LikedComponent`.
- Explore and engage with other traders' ideas using the `AllTradesComponent`.

3. **Navigation:**

- Navigate through the app using the sidebar provided by the `SidebarComponent`.

## Troubleshooting

If you encounter any issues during setup or development, refer to the official documentation of the libraries and tools used. Additionally, you can explore online resources, forums, and communities for assistance.

## Conclusion

The Trading Idea Sharing App is designed to provide traders with a platform to share their experiences in trading and their ideas.
