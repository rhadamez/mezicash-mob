import styled from 'styled-components/native'

import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View`
	padding: 17px 24px;
	margin-bottom: 16px;

	border-radius: 5px;
	background: ${({theme}) => theme.colors.shape};
`

export const Title = styled.Text`
	font-size: ${RFValue(14)}px;
	font-family: ${({theme}) => theme.fonts.regular};
`

export const Amount = styled.Text`
	margin-top: 2px;
	font-size: ${RFValue(20)}px;
	font-family: ${({theme}) => theme.fonts.regular};
`

export const Footer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	margin-top: 19px;
`

export const Category = styled.View`
	flex-direction: row;
	align-items: center;
`

export const Icon = styled<any>(Feather)`
	font-size: ${RFValue(20)}px;
	color: ${({theme}) => theme.colors.secondary};
` as any

export const CategoryName = styled.Text`
	margin-left: 17px;

	font-size: ${RFValue(14)}px;
	color: ${({theme}) => theme.colors.secondary};
`

export const Date = styled.Text`
	font-size: ${RFValue(14)}px;
	color: ${({theme}) => theme.colors.text};
`
