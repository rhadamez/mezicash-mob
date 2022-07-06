import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard } from '../../components/TransactionCard'
import * as S from './styles'

export function Dashboard() {
	return(
		<S.Container>
			<S.Header>
				<S.UserWrapper>
					<S.UserInfo>
						<S.Photo source={{ uri: 'https://github.com/rhadamez.png'}}/>
						<S.User>
							<S.UserGreeting>Olá, </S.UserGreeting>
							<S.UserName>Rhadamez</S.UserName>
						</S.User>
					</S.UserInfo>
					<S.Icon name='power' size={24} />
				</S.UserWrapper>
			</S.Header>
			<S.HightlightCards>
				<HighlightCard
					type='up'
					title='Entradas'
					amount='R$ 17.400,00'
					lastTransaction='Última entrada dia 13 de abril' />
				<HighlightCard
					type='down'
					title='Saídas'
					amount='R$ 17.400,00'
					lastTransaction='Última entrada dia 06 de junho' />
				<HighlightCard
					type='total'
					title='Total'
					amount='R$ 12.400,00'
					lastTransaction='de 01 de abril à 06 de junho' />
			</S.HightlightCards>
			<S.Transactions>
				<S.Title>Listagem</S.Title>
				<TransactionCard />
			</S.Transactions>
		</S.Container>
	)
}
