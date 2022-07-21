import { useState, useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard, TransactionProps } from '../../components/TransactionCard'
import * as S from './styles'
import { useTheme } from 'styled-components'

export interface DataListProps extends TransactionProps {
	id: number
}

interface HighlightProps {
	amount: string
	lastTransaction: string
}

interface HighlightData {
	entries: HighlightProps
	expensives: HighlightProps
	total: HighlightProps
}

export function Dashboard() {
	const theme = useTheme()
	const [isLoading, setIsLoading] = useState(true)
	const [transactions, setTransactions] = useState<DataListProps[]>([])
	const [highlightData, setHighlightData] = useState<HighlightData>({
		entries: { amount: '0', lastTransaction: '' },
		expensives: { amount: '0', lastTransaction: '' },
		total: { amount: '0', lastTransaction: '' },
	})

	useFocusEffect(useCallback(() => {
		async function loadTransactions() {
			const dataKey = '@mezicash:transactions'
			const response = await AsyncStorage.getItem(dataKey)

			let entriesTotal = 0
			let expensiveTotal = 0

			const transactions = response ? (JSON.parse(response) as DataListProps[]) : []
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

			const lastTransactionEntries = getLastTransactionDate(transactions, 'up')
			const lastTransactionExpensives = getLastTransactionDate(transactions, 'down')
			const lastTotalTransaction = `01 à ${lastTransactionExpensives}`

			const total = entriesTotal - expensiveTotal

			setHighlightData({
				entries: {
					amount: entriesTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
					lastTransaction: lastTransactionEntries
				},
				expensives: {
					amount: expensiveTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
					lastTransaction: lastTransactionExpensives
				},
				total: {
					amount: total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
					lastTransaction: lastTotalTransaction
				}
			})

			setIsLoading(false)
		}

		loadTransactions()
	}, []))

	function getLastTransactionDate(collection: DataListProps[], type: 'up' | 'down'): string {
		const lastTransactions = collection.filter(t => t.type === type)
		const lastTransaction = lastTransactions[lastTransactions.length-1]
		const lastDate = format(new Date(lastTransaction.date), 'dd \'de\' MMMM', { locale: ptBR})
		
		return lastDate
	}

	return (
		<S.Container>
			{isLoading ? (
				<ActivityIndicator style={{ flex: 1 }} size={'large'} color={theme.colors.primary}/>
			) : (
				<>
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
							amount={highlightData.entries.amount}
							lastTransaction={'Última entrada ' + highlightData.expensives.lastTransaction} />
						<HighlightCard
							type='down'
							title='Saídas'
							amount={highlightData.expensives.amount}
							lastTransaction={'Última saída ' + highlightData.expensives.lastTransaction} />
						<HighlightCard
							type='total'
							title='Total'
							amount={highlightData.total.amount}
							lastTransaction={highlightData.total.lastTransaction} />
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
				</>
			)}
		</S.Container>
	)
}
