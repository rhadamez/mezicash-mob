import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.background};
`

export const Header = styled.View`
	height: ${RFValue(113)}px;
	width: 100%;
	align-items: center;
	justify-content: center;
	padding-top: ${getStatusBarHeight()}px;
	padding-bottom: 19px;

	background-color: ${({ theme }) => theme.colors.primary};
`

export const Title = styled.Text`
	font-size: ${RFValue(18)}px;

	font-family: ${({ theme }) => theme.fonts.regular};
	color: ${({ theme }) => theme.colors.shape};
`

export const Histories = styled.View`
	margin: 40px 20px;
`
