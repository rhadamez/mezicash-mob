import { RectButtonProps } from 'react-native-gesture-handler'
import * as S from './styles'

interface Props {
	title: string
	onPress: () => void
}

export function Button({ title, onPress }: Props) {
	return (
		<S.Container onPress={onPress} >
			<S.Title>
				{title}
			</S.Title>
		</S.Container>
	)
}
