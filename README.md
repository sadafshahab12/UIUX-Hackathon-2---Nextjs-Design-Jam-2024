# Furniro - E-Commerce Marketplace

## Project Overview
Furniro is a dynamic e-commerce marketplace designed to provide a seamless shopping experience. The website supports both e-commerce and rental commerce, allowing users to purchase or rent furniture for long-term and short-term needs.

## Features

- **User Authentication**: Implemented using Clerk authentication for sign-in and sign-up.
- **Product Management**: Fetches and displays product data from Sanity Headless CMS.
- **Cart System**: Allows users to add, update, and remove items from the cart with a smooth UI experience.
- **Search & Filtering**: Users can search for products and filter them by categories.
- **Dynamic Routing**: Individual product detail pages load dynamically using Next.js.
- **Testing & Optimization**: Performance and compatibility tested across multiple browsers and devices.

## Technologies Used

- **Frontend**: Next.js, React.js, TypeScript, Tailwind CSS
- **Backend**: Sanity Headless CMS
- **Authentication**: Clerk
- **State Management**: useContext for managing product data
- **Testing**: Cypress (in progress)
- **Deployment**: Vercel

## Deployment Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/sadafshahab12/UIUX-Hackathon-2---Nextjs-Design-Jam-2024.git
   ```

2. Navigate to the project directory:
   ```sh
   cd Furniro
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

4. Set up environment variables:
   - Configure API keys for Sanity and Clerk authentication.

5. Start the development server:
   ```sh
   npm run dev
   ```

6. Deploy to Vercel:
   ```sh
   vercel
   ```

## Test Case Summary

| Test Case ID | Description              | Expected Result             | Actual Result               | Status          |
|-------------|--------------------------|-----------------------------|-----------------------------|-----------------|
| TC001       | Product display validation | Products display correctly  | Products displayed successfully | ✅ Passed |
| TC002       | Product search validation | Search results match query | Search works accurately | ✅ Passed |
| TC003       | Cart functionality        | Add/update/remove items     | Works as expected          | ✅ Passed |
| TC004       | Dynamic product pages     | Loads product details correctly | Product details displayed | ✅ Passed |
| TC005       | API fetching              | Fetch data from Sanity      | Data fetched successfully  | ✅ Passed |
| TC006       | API error handling        | Shows error message         | Handled gracefully         | ✅ Passed |
| TC007       | Lighthouse performance test | Performance > 80           | Performance: 47 (Needs optimization) | ⚠️ Needs Improvement |
| TC008       | Browser compatibility     | Renders correctly across browsers | Minor inconsistencies | ✅ Acceptable |
| TC009       | Responsive testing        | Adapts to all devices       | Fully responsive           | ✅ Passed |

## Challenges & Learnings

- Faced issues with Next.js and TypeScript integration but resolved them through self-learning.
- Encountered difficulties with payment integration and data management in Sanity.
- Improved skills in debugging, state management, and dynamic routing.

## Future Enhancements
- Improve website performance and Lighthouse scores.
- Implement Cypress for automated testing.
- Enhance UI/UX for a more seamless shopping experience.

## Contributing
If you'd like to contribute, please fork the repository and submit a pull request with your changes.

## Contact
For any queries, reach out via [LinkedIn](https://www.linkedin.com/in/sadaf-shahab-ssr123/)
