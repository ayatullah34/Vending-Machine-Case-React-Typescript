# Getting Started with Vending-Machine-App

Coins with values of $1, $5, $10, and $20 are accepted in the vending machine application, and the value and weight of the coins placed in the machine are checked for security reasons. Multiple products can be selected from the machine, but the place order button will only be activated if enough coins are inserted to cover the total price of the products. Each user is given a time limit of 5 minutes to complete their transactions. If the transaction is not completed within this time frame, all transactions will be canceled.

There is a password field to withdraw all the accumulated coins from the machine, and the default password for testing purposes is "1234". The withdraw button will be activated if the total value of the accumulated coins in the machine is greater than $0 and the correct password is entered. The owner of the machine can then withdraw the total amount in one go.

The machine has an energy efficiency system, which includes lighting, cooling, and a robot that consumes 2 units of energy each. The total energy consumption is limited to 5 units, so the cooling system will be disabled when a product is selected, and the lighting and robot will be activated. If the robot is disabled, the cooling system will be activated to keep the products at 6°C.

There is a cancel button that allows users to cancel their transactions and receive a refund. A selected product can be canceled by clicking on it again, but once a product is canceled, it cannot be selected again. The application supports both Turkish and English languages, and the language can be changed by clicking on the flag icon in the header. There are custom tooltip messages displayed when hovering over elements such as lighting and buttons, and toast messages are displayed using the react-toastify library to provide users with information. The application was developed using React, TypeScript, and Sass,to instantly convert SCSS files to CSS, Gulp was used,
Jest was used for unit testing and was deployed using Netlify. You can view the live application using this URL: 'https://elaborate-cat-95dd4d.netlify.app/'.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npx jest <component>test.tsx`

You can use this command to run unit tests separately.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
