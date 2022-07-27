import { RFValue } from 'react-native-responsive-fontsize'
import { SignInSocialButton } from '../../components/SignInSocialButton'
import { Apple } from '../../components/Svgs/Apple'
import { Google } from '../../components/Svgs/Google'
import { Logo } from '../../components/Svgs/Logo'
import * as S from './styles'

export function SignIn() {
	return (
		<S.Container>
			<S.Header>
				<Logo size={RFValue(120)} />
				<S.Title>
					Controle suas{'\n'}finanças de forma{'\n'} muito simples
				</S.Title>
				<S.SignInTitle>
					Faça seu login com{'\n'} uma das contas abaixo
				</S.SignInTitle>
			</S.Header>
			<S.Footer>
				<S.FooterWrapper>
					<SignInSocialButton title='Entrar com Google' svg={Google}/>
					<SignInSocialButton title='Entrar com Apple' svg={Apple}/>
				</S.FooterWrapper>
			</S.Footer>
		</S.Container>
	)
}
