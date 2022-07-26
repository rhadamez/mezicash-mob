import { History } from '../../components/History'
import * as S from './styles'

export function Resume() {
	return (
		<S.Container>
			<S.Header>
				<S.Title>Resumo</S.Title>
			</S.Header>

			<S.Histories>
				<History color='purple' title='Casa' amount='R$ 1.200' />
			</S.Histories>
		</S.Container>
	)
}
