import { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'

import { addMonths, format, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import { RFValue } from 'react-native-responsive-fontsize'

import { useTheme } from 'styled-components'

import { VictoryPie } from 'victory-native'

import { History } from '../../components/History'
import { categories } from '../../utils/categories'
import * as S from './styles'
import { useFocusEffect } from '@react-navigation/native'

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
	const [isLoading, setIsLoading] = useState(false)
	const [totalCategories, setTotalCategories] = useState<CategorieFilledProps[]>([])
	const [selectedDate, setSelectedDate] = useState(new Date())

	useFocusEffect(useCallback(() => {
		loadData()
	}, [selectedDate]))

	function handleDateChange(action: 'next' | 'prev') {
		if(action === 'next') {
			setSelectedDate(addMonths(selectedDate, 1))
		} else {
			setSelectedDate(subMonths(selectedDate, 1))
		}
	}

	async function loadData() {
		setIsLoading(true)
		const dataKey = '@mezicash:transactions'
		const response = await AsyncStorage.getItem(dataKey)
		const responseFormatted = response ? JSON.parse(response) : []

		const expensives = responseFormatted.filter((expensive: TransactionData) => {
			const isType = expensive.type === 'down'
			const currentSelectedDate = format(selectedDate, 'MM-yy')
			const currentExpensiveDate = format(new Date(expensive.date), 'MM-yy')
			return isType && currentSelectedDate === currentExpensiveDate
		}) as TransactionData[]

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
		setIsLoading(false)
	}

	return (
		<S.Container>
			<S.Header>
				<S.Title>Resumo</S.Title>
			</S.Header>

			{isLoading ? (
				<ActivityIndicator style={{ flex: 1 }} size={'large'} color={theme.colors.primary}/>
			) : (
				<S.Content 
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						paddingBottom: useBottomTabBarHeight()
					}} >
					<S.ChartContainer>

						<S.MonthSelect>
							<S.MonthSelectButton onPress={() => handleDateChange('prev')}>
								<S.SelectIcon name='chevron-left' size={25} />
							</S.MonthSelectButton>

							<S.Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</S.Month>

							<S.MonthSelectButton onPress={() => handleDateChange('next')}>
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
			)}
		</S.Container>
	)
}
