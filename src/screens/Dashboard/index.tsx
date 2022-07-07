import { getBottomSpace } from 'react-native-iphone-x-helper'
import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard } from '../../components/TransactionCard'
import * as S from './styles'

export function Dashboard() {
	const data = [
		{
			type: 'positive',
			title: 'Desenvolvimento de site',
			amount: 'R$ 4.000,00',
			date: '14/04/2020',
			category: { 
				name: 'Vendas',
				icon: 'dollar-sign'
			}
		},

		{
			type: 'negative',
			title: 'Pizza grande',
			amount: 'R$ 85,00',
			date: '607/05/2020',
			category: { 
				name: 'Compras',
				icon: 'coffee'
			}
		},

		{
			positive: 'negative',
			title: 'Aluguel do apartamento',
			amount: 'R$ 1.000,00',
			date: '14/04/2020',
			category: { 
				name: 'Casa',
				icon: 'shopping-bag'
			}
		}
	]

	return (
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
					amount='R$ 49.400,00'
					lastTransaction='Última entrada dia 13 de abril' />
				<HighlightCard
					type='down'
					title='Saídas'
					amount='R$ 12.000,00'
					lastTransaction='Última entrada dia 06 de junho' />
				<HighlightCard
					type='total'
					title='Total'
					amount='R$ 37.400,00'
					lastTransaction='de 01 de abril à 06 de junho' />
			</S.HightlightCards>
			<S.Transactions>
				<S.Title>Listagem</S.Title>
				<S.TransactionList
					data={data}
					renderItem={({ item }) => (
						<TransactionCard data={item} />
					)}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						paddingBottom: getBottomSpace()
					}}
				/>
			</S.Transactions>
		</S.Container>
	)
}
