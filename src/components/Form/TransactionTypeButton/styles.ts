import styled, { css } from 'styled-components/native'
import { TouchableOpacity } from 'react-native'

import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'

interface TypeProps {
	type: 'up' | 'down'
}

interface ContainerProps {
	isSelected: boolean
	type: 'up' | 'down'
}

export const Container = styled(TouchableOpacity) <ContainerProps>`
	width: 49%;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 16px 19px;

	border: 1.5px solid ${({ theme }) => theme.colors.text};
	border-radius: 5px;

	${({ theme, type, isSelected }) => isSelected && css`
		border: none;
		background-color: ${type === 'up' ? theme.colors.success_light : theme.colors.attention_light};
	`};
`

export const Icon = styled(Feather) <TypeProps>`
	font-size: ${RFValue(24)}px;
	margin-right: 12px;

	color: ${({ theme, type }) => {
		return type === 'up' ? theme.colors.success : theme.colors.attention
	}};
`

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(14)}px;
`
