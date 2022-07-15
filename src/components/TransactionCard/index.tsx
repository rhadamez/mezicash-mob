import { categories } from '../../utils/categories'
import * as S from './styles'

export interface TransactionProps {
	type: 'up' | 'down'
	name: string
	amount: string
	category: string
	date: string
}

interface TransactionCardProps {
	data: TransactionProps
}

export function TransactionCard({ data }: TransactionCardProps) {
	const category = categories.find(c => c.key === data.category)

	return (
		<S.Container>
			<S.Title>{data.name}bah: {data.type}</S.Title>
			<S.Amount type={data.type}>{data.type === 'down' && '- '}{data.amount}</S.Amount>
			<S.Footer>
				<S.Category>
					<S.Icon name={category?.icon} color={category?.color} />
					<S.CategoryName>{category?.name}</S.CategoryName>
				</S.Category>
				<S.Date>{data.date}</S.Date>
			</S.Footer>
		</S.Container>
	)
}
