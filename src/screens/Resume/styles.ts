import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

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

export const Content = styled.ScrollView``

export const ChartContainer = styled.View`
	align-items: center;
`

export const Title = styled.Text`
	font-size: ${RFValue(18)}px;

	font-family: ${({ theme }) => theme.fonts.regular};
	color: ${({ theme }) => theme.colors.shape};
`

export const Histories = styled.View`
	margin: 40px 20px;
`

export const MonthSelect = styled.View`
	width: 50%;
	margin-top: 24px;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
`

export const MonthSelectButton = styled<any>(BorderlessButton)`
	height: 30px;
	width: 30px;
	justify-content: center;
	align-items: center;
`

export const SelectIcon = styled(Feather)``

export const Month = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(24)}px;
`

