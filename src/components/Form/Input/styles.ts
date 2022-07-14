import styled, { css } from 'styled-components/native'
import { TextInput } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

interface ContainerProps {
	hasError?: boolean
}

export const Container = styled(TextInput) <ContainerProps>`
	max-height: 65px;
	width: 100%;
	padding: 18px;
	margin-bottom: 8px;

	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(14)}px;
	border: 1px solid transparent;
	border-radius: 5px;
	background-color: ${({ theme }) => theme.colors.shape};
	color: ${({ theme }) => theme.colors.text};

	${({ theme, hasError }) => hasError && css`
		border: 1px solid ${theme.colors.attention};
	`}
`
