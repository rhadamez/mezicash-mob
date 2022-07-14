import { TextInputProps } from 'react-native'

import * as S from './styles'

type Props = TextInputProps & {
	hasError?: any
}

export function Input({ hasError, ...rest }: Props) {
	return (
		<S.Container hasError={!!hasError} {...rest} />
	)
}

