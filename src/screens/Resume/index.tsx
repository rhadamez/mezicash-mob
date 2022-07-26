import { useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { History } from '../../components/History'
import { categories } from '../../utils/categories'
import * as S from './styles'

interface TransactionData {
	type: 'up' | 'down'
	name: string
	amount: string
	category: string
	date: string
}

interface CategorieFilledProps {
	name: string
	amount: string
	color: string
}

export function Resume() {
	const [totalCategories, setTotalCategories] = useState<CategorieFilledProps[]>([])

	useEffect(() => {
		loadData()
	}, [])

	async function loadData() {
		const dataKey = '@mezicash:transactions'
		const response = await AsyncStorage.getItem(dataKey)
		const responseFormatted = response ? JSON.parse(response) : []

		const expensives = responseFormatted.filter((expensive: TransactionData) => expensive.type === 'down') as TransactionData[]
	
		const categoriesFilled = [] as CategorieFilledProps[]

		categories.forEach(category => {
			let categorySum = 0

			expensives.forEach(expensive => {
				if(expensive.category === category.key) {
					categorySum += Number(expensive.amount)
				}
			})

			if(categorySum > 0) {
				categoriesFilled.push({
					name: category.name,
					amount: categorySum.toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL'
					}),
					color: category.color
				})
			}

		})

		setTotalCategories(categoriesFilled)
	}

	return (
		<S.Container>
			<S.Header>
				<S.Title>Resumo</S.Title>
			</S.Header>

			<S.Content>
				<S.Histories>
					{totalCategories.map(c => (
						<History key={c.name} color={c.color} title={c.name} amount={c.amount} />
					))}
				</S.Histories>
			</S.Content>
		</S.Container>
	)
}
