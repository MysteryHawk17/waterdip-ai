# WaterDip AI

Welcome to the **WaterDip AI** project! This project is a hotel bookings dashboard that visualizes visitor statistics and trends. It allows users to filter booking data by date range and view various metrics through interactive charts.

## Live Demo

View the live demo [here](https://waterdip-ai-green.vercel.app)

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Interactive date picker to filter booking data
- Visualizations of daily visitors
- Breakdown of visitors by country
- Statistics on adult and child visitors

## Technologies

This project is built using the following technologies:

- React
- TypeScript
- Tailwind CSS
- Apexcharts (for data visualization)
- Date-fns (for date manipulation)

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/MysteryHawk17/waterdip-ai.git
   ```

2. Navigate to the project directory:

   ```bash
   cd waterdip-ai
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to view the application. Also view it on local network by navigating to `http://<your-ip>:5173`

## Testing

It uses vitest for testing. All the test files can be found under the tests folder into the root directory of the project.

To run the tests, use the following command:

```bash
npm run test
```

Additionally, you can run the tests with vitest ui by using the following command:

```bash
npm run test:ui
```

## Usage

- Use the date picker to select a range of dates for hotel bookings.
- The dashboard will display the number of visitors per day, a breakdown of visitors by country, and statistics on adult and child visitors.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please create an issue or submit a pull request.

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a pull request.
