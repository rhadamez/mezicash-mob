import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard, TransactionProps } from '../../components/TransactionCard'
import * as S from './styles'

export interface DataListProps extends TransactionProps {
	id: number
}

export function Dashboard() {
	const [data, setData] = useState<DataListProps[]>([])

	useFocusEffect(useCallback(() => {
		async function loadTransactions() {
			const dataKey = '@mezicash:transactions'
			const response = await AsyncStorage.getItem(dataKey)

			const transactions = response ? JSON.parse(response) : []
			const transactionsFormatted = transactions.map((t: DataListProps) => {
				const amount = Number(t.amount)
					.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
				const date = format(new Date(t.date), 'dd/MM/yyyy', { locale: ptBR })
				return { ...t, date, amount }
			})
			setData(transactionsFormatted)
		}

		loadTransactions()
	}, []))

	return (
		<S.Container>
			<S.Header>
				<S.UserWrapper>
					<S.UserInfo>
						<S.Photo source={{ uri: 'https://github.com/rhadamez.png' }} />
						<S.User>
							<S.UserGreeting>Olá, </S.UserGreeting>
							<S.UserName>Rhadamez</S.UserName>
						</S.User>
					</S.UserInfo>
					<S.LogoutButton>
						<S.Icon name='power' size={24} />
					</S.LogoutButton>
				</S.UserWrapper>
			</S.Header>
			<S.HightlightCards>
				<HighlightCard
					type='up'
					title='Entradas'
					amount='R$ 62.425,00'
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
				{data.length === 0 && <S.ListEmpty>Não há dados</S.ListEmpty>}
				<S.TransactionList
					data={data}
					keyExtractor={item => item.id.toString()}
					renderItem={({ item }: { item: DataListProps }) => (
						<TransactionCard data={item} />
					)}
				/>
			</S.Transactions>
		</S.Container>
	)
}
