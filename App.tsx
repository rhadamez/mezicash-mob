import React, { useEffect, useState } from 'react'
import { View, Text, StatusBar } from 'react-native'
import * as Sentry from '@sentry/react-native'
import { NavigationContainer } from '@react-navigation/native'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ThemeProvider } from 'styled-components'
import * as Font from 'expo-font'

import {
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_700Bold
} from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme'
import { Routers } from './src/routes'
import { SignIn } from './src/screens/SignIn'
import { AuthProvider } from './src/store/AuthContext'

Sentry.init({
	dsn: 'https://cccdb5f8f681401bbd7e4303b6f1d236@o333848.ingest.sentry.io/6620652',
	tracesSampleRate: 1.0,
})

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false)

	useEffect(() => {
		async function prepare() {
			try {
				await Font.loadAsync({
					Poppins_400Regular,
					Poppins_500Medium,
					Poppins_700Bold
				})
			} catch (e) {
				console.warn(e)
			} finally {
				setAppIsReady(true)
			}
		}

		prepare()
	}, [])

	if (!appIsReady) return <View><Text>Loading...</Text></View>

	return (
		<ThemeProvider theme={theme}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<NavigationContainer>
					<StatusBar barStyle={'light-content'} backgroundColor='transparent' translucent/>
					<AuthProvider>
						<SignIn />
					</AuthProvider>
				</NavigationContainer>
			</GestureHandlerRootView>
		</ThemeProvider>
	)
}
