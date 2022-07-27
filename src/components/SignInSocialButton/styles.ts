import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled<any>(RectButton)`
	height: ${RFValue(56)}px;

	background-color: ${({ theme }) => theme.colors.shape};
	border-radius: 5px;

	align-items: center;
	flex-direction: row;

	margin-bottom: 16px;
`

export const ImageContainer = styled.View`
	height: 100%;
	justify-content: center;
	align-items: center;

	padding: ${RFValue(16)}px;
	border-color: ${({ theme }) => theme.colors.background};
	border-right-width: 1px;
`

export const TextContent = styled.View`
	width: 100%;
	position: absolute;
	justify-content: center;
	align-items: center;
`

export const Text = styled.Text`
	font-family: ${({ theme }) => theme.fonts.medium};
	font-size: ${RFValue(14)}px;
`
