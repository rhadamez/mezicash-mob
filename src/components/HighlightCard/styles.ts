import styled, { css } from 'styled-components/native'

import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'

interface TypeProps {
	type: 'up' | 'down' | 'total'
}

export const Container = styled.View<TypeProps>`
	width: ${RFValue(300)}px;
	padding: 18px 23px;
	padding-bottom: ${RFValue(42)}px;
	margin-right: 16px;

	border-radius: 5px;
	background: ${({theme}) => theme.colors.shape};

	${(props) => props.type === 'total' && css`
		background: ${props.theme.colors.secondary};
	`}
`

export const Header = styled.View`
	flex-direction: row;
	justify-content: space-between;
`

export const Title = styled.Text<TypeProps>`
	font-family: ${({theme}) => theme.fonts.regular};
	font-size: ${RFValue(14)}px;
	color: ${({theme}) => theme.colors.text_dark};

	${(props) => props.type === 'total' && css`
		color: ${props.theme.colors.shape};
	`}
`

export const Icon = styled<any>(Feather)<TypeProps>`
	font-size: ${RFValue(40)}px;

	${({ type, theme }) => type === 'up' && css`
		color: ${theme.colors.success};
	`}

	${({ type, theme }) => type === 'down' && css`
		color: ${theme.colors.attention};
	`}

	${({ type, theme }) => type === 'total' && css`
		color: ${theme.colors.shape};
	`}

` as any

export const Footer = styled.View`
`

export const Amount = styled.Text<TypeProps>`
	margin-top: 38px;

	font-family: ${({theme}) => theme.fonts.medium};
	font-size: ${RFValue(32)}px;

	color: ${({theme}) => theme.colors.text_dark};

	${(props) => props.type === 'total' && css`
		color: ${props.theme.colors.shape};
	`}
`

export const LastTransaction = styled.Text<TypeProps>`
	font-family: ${({theme}) => theme.fonts.regular};
	font-size: ${RFValue(12)}px;
	color: ${({theme}) => theme.colors.text};

	${(props) => props.type === 'total' && css`
		color: ${props.theme.colors.shape};
	`}
`
