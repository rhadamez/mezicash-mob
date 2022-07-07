import * as S from './styles'

interface CategoryProps {
	name: string
	icon: string
}

interface TransactionCardProps {
	data: {
		type: 'positive' | 'negative'
		title: string
		amount: string
		category: CategoryProps
		date: string
	}
}

export function TransactionCard({ data }: TransactionCardProps) {
	return(
		<S.Container>
			<S.Title>{data.title}</S.Title>
			<S.Amount type={data.type}>{data.type === 'negative' && '- '}{data.amount}</S.Amount>
			<S.Footer>
				<S.Category>
					<S.Icon name={data.category.icon}/>
					<S.CategoryName>{data.category.name}</S.CategoryName>
				</S.Category>
				<S.Date>{data.date}</S.Date>
			</S.Footer>
		</S.Container>
	)
}
