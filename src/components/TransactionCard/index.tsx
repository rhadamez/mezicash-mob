import * as S from './styles'

interface CategoryProps {
	name: string
	icon: string
}

interface TransactionCardProps {
	data: {
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
			<S.Amount>{data.amount}</S.Amount>
			<S.Footer>
				<S.Category>
					<S.Icon name='dollar-sign'/>
					<S.CategoryName>{data.category.name}</S.CategoryName>
				</S.Category>
				<S.Date>{data.date}</S.Date>
			</S.Footer>
		</S.Container>
	)
}
