import { RectButtonProps } from 'react-native-gesture-handler'
import * as S from './styles'

interface Props extends RectButtonProps {
	title: string
	svg: any
}

export function SignInSocialButton({ title, svg:Svg, ...rest }: Props) {
	return (
		<S.Container {...rest}>
			<S.ImageContainer>
				<Svg />
			</S.ImageContainer>

			<S.TextContent>
				<S.Text>
					{title}
				</S.Text>
			</S.TextContent>
		</S.Container>
	)
}
