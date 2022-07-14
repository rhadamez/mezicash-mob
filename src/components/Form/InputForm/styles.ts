import styled from 'styled-components/native'

export const Container = styled.View`
	width: 100%;
`

export const ErrorLabel = styled.Text`
	margin-bottom: 5px;

	font-size: 12px;
	color: ${({ theme }) => theme.colors.attention};
`
