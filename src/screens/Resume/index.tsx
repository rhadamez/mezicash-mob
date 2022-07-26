import { useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import { VictoryPie } from 'victory-native'

import { History } from '../../components/History'
import { categories } from '../../utils/categories'
import * as S from './styles'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'

interface TransactionData {
	type: 'up' | 'down'
	name: string
	amount: string
	category: string
	date: string
}

interface CategorieFilledProps {
	name: string
	amount: number
	amountFormatted: string
	color: string
	percent: string
}

export function Resume() {
	const theme = useTheme()
	const [totalCategories, setTotalCategories] = useState<CategorieFilledProps[]>([])

	useEffect(() => {
		loadData()
	}, [])

	async function loadData() {
		const dataKey = '@mezicash:transactions'
		const response = await AsyncStorage.getItem(dataKey)
		const responseFormatted = response ? JSON.parse(response) : []

		const expensives = responseFormatted.filter((expensive: TransactionData) => expensive.type === 'down') as TransactionData[]

		const expensiveTotal = expensives.reduce((acumullator: number, expensive: TransactionData) => {
			return acumullator + Number(expensive.amount)
		}, 0)

		const categoriesFilled = [] as CategorieFilledProps[]

		categories.forEach(category => {
			let categorySum = 0

			expensives.forEach(expensive => {
				if(expensive.category === category.key) {
					categorySum += Number(expensive.amount)
				}
			})

			if(categorySum > 0) {

				const percent = `${(categorySum / expensiveTotal * 100).toFixed()}%`

				categoriesFilled.push({
					name: category.name,
					amount: categorySum,
					amountFormatted: categorySum.toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL'
					}),
					color: category.color,
					percent
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

			<S.Content 
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingBottom: useBottomTabBarHeight()
				}} >
				<S.ChartContainer>

					<S.MonthSelect>
						<S.MonthSelectButton>
							<S.SelectIcon name='chevron-left' size={25} />
						</S.MonthSelectButton>

						<S.Month>Maio</S.Month>

						<S.MonthSelectButton>
							<S.SelectIcon name='chevron-right' size={25} />
						</S.MonthSelectButton>
					</S.MonthSelect>
					<VictoryPie
						data={totalCategories}
						colorScale={totalCategories.map(category => category.color)}
						style={{
							labels: {
								fontSize: RFValue(18),
								fontWeight: 'bold',
								fill: theme.colors.shape
							}
						}}
						labelRadius={50}
						x='percent'
						y='amount'
					/>

				</S.ChartContainer>
				<S.Histories>
					{totalCategories.map(c => (
						<History key={c.name} color={c.color} title={c.name} amount={c.amountFormatted} />
					))}
				</S.Histories>
			</S.Content>
		</S.Container>
	)
}
