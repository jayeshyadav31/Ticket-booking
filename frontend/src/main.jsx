import React from 'react'
 import ReactDOM from 'react-dom/client'
// import ReactDOM from 'react-dom';

import App from './App.jsx'
import './index.css'
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import {mode} from '@chakra-ui/theme-tools'
import { BrowserRouter } from 'react-router-dom'
import {RecoilRoot} from "recoil";
const styles = {
	global: (props) => ({
		body: {
			// color: mode("gray.800", "whiteAlpha.900")(props),
			bg: mode("white", "white")(props),
		},
	}),
};

const config = {
	initialColorMode: "light",
	useSystemColorMode: true,
};

const colors = {
	gray: {
		light: "#616161",
		dark: "#1e1e1e",
	},
};
const theme=extendTheme({styles,config,colors})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
      <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
    </ChakraProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
)
// ReactDOM.render(
// 	<React.StrictMode>
// 	  <RecoilRoot>
// 		<BrowserRouter>
// 		  <ChakraProvider theme={theme}>
// 			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
// 			<App />
// 		  </ChakraProvider>
// 		</BrowserRouter>
// 	  </RecoilRoot>
// 	</React.StrictMode>,
// 	document.getElementById('root')
//   );
  
