import { TextInputProps } from 'react-native'
import { Control, Controller } from 'react-hook-form'
import { Input } from '../Input'

import * as S from './styles'

interface Props extends TextInputProps {
	control: Control
	name: string
	error?: any
}

export function InputForm({ control, name, error, ...rest }: Props) {
	return (
		<S.Container>
			{error && <S.ErrorLabel>{error}</S.ErrorLabel>}
			<Controller
				name={name}
				control={control}
				render={({ field: { onChange, value } }) => (
					<Input onChangeText={onChange} value={value} hasError={!!error} {...rest} />
				)} />
		</S.Container>
	)
}
