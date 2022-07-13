import { Button } from '../../components/Form/Button'
import { Input } from '../../components/Form/Input'
import * as S from './styles'

export function Register() {
	return (
		<S.Container>
			<S.Header>
				<S.Title>Cadastro</S.Title>
			</S.Header>

			<S.Form>
				<S.Fields>
					<Input placeholder='Nome'/>
					<Input placeholder='Nome'/>
				</S.Fields>
				<Button title='affe' />
			</S.Form>
		</S.Container>
	)
}
