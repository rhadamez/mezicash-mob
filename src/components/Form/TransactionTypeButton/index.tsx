import { RectButtonProps } from 'react-native-gesture-handler'

import * as S from './styles'

const icons = {
	up: 'arrow-up-circle',
	down: 'arrow-down-circle'
}

interface Props extends RectButtonProps {
	title: string
	type: 'up' | 'down'
	isSelected: boolean
}

export function TransactionTypeButton({ title, type, isSelected, ...rest }: Props) {
	return (
		<S.Container type={type} isSelected={isSelected} {...rest}>
			<S.Icon name={icons[type]} type={type} />
			<S.Title>{title}</S.Title>
		</S.Container>
	)
}
