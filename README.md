# BoletoTracker App

This React Native application is a bill tracker app, where users register and check when their bills are payed to help to take control of their personal accounts. The base of this project is an [Open Source Figma](<https://www.figma.com/design/oJo3teJP4AkqiedVlMXh7J/PayFlow-(Community)?node-id=0-1&t=A6ItIvZClwS8UAk3-1>) file with some additions that were thought to be useful like email register and login and some other minor functions.

## Features

- **Google Authentication**: To ease the process of entering the app without much hassle.
- **Firebase Authentication**: To handle login and logout by email.
- **Barcode Scanner and Timer**: Showing a message if no code is found and giving the possibility to manually enter the code data.
- **Redux Functions**: Managing state made easy with simple slicers and reducers.
- **Typescript Support**: Making functions easier to understand.

## Installation

To run this project, make sure you have React Native set up on your machine. If not, follow the installation guide from the [React Native Documentation](https://reactnative.dev/docs/environment-setup).

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/eccianime/boleto-tracker.git
   cd boleto-tracker
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the app:

   ```bash
   npm run android              # For Android
   npm run ios                  # For iOS
   ```

### Styling

The app uses the color library nativewind using simpler layouts and themes.

### License

This project is licensed under the MIT License. Feel free to customize and extend the app as per your needs!

### Demo

![Demo](https://github.com/eccianime/boleto-tracker/blob/master/demo.gif)
