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

interface HighlightProps {
	total: string
}

interface HighlightData {
	entries: HighlightProps
	expensives: HighlightProps
	total: string
}

export function Dashboard() {
	const [transactions, setTransactions] = useState<DataListProps[]>([])
	const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)

	useFocusEffect(useCallback(() => {
		async function loadTransactions() {
			const dataKey = '@mezicash:transactions'
			const response = await AsyncStorage.getItem(dataKey)

			let entriesTotal = 0
			let expensiveTotal = 0

			const transactions = response ? JSON.parse(response) : []
			const transactionsFormatted = transactions.map((t: DataListProps) => {

				if(t.type === 'up') {
					entriesTotal += Number(t.amount)
				} else {
					expensiveTotal += Number(t.amount)
				}

				const amount = Number(t.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
				const date = format(new Date(t.date), 'dd/MM/yyyy', { locale: ptBR })
				return { ...t, date, amount }
			})
			setTransactions(transactionsFormatted)
			setHighlightData({
				entries: { total: entriesTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) },
				expensives: { total: expensiveTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) },
				total: (entriesTotal - expensiveTotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
			})
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
					amount={highlightData.entries.total}
					lastTransaction='Última entrada dia 13 de abril' />
				<HighlightCard
					type='down'
					title='Saídas'
					amount={highlightData.expensives.total}
					lastTransaction='Última entrada dia 06 de junho' />
				<HighlightCard
					type='total'
					title='Total'
					amount={highlightData.total}
					lastTransaction='de 01 de abril à 06 de junho' />
			</S.HightlightCards>
			<S.Transactions>
				<S.Title>Listagem</S.Title>
				{transactions.length === 0 && <S.ListEmpty>Não há dados</S.ListEmpty>}
				<S.TransactionList
					data={transactions}
					keyExtractor={item => item.id.toString()}
					renderItem={({ item }: { item: DataListProps }) => (
						<TransactionCard data={item} />
					)}
				/>
			</S.Transactions>
		</S.Container>
	)
}
