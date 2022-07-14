import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { ThemeProvider } from 'styled-components'
import * as Font from 'expo-font'

import {
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_700Bold
} from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme'
import { Dashboard } from './src/screens/Dashboard'
import { Register } from './src/screens/Register'
import { CategorySelect } from './src/screens/CategorySelect'

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
			<CategorySelect />
		</ThemeProvider>
	)
}
