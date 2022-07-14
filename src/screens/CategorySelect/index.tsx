import { FlatList } from 'react-native'
import { Button } from '../../components/Form/Button'
import { categories } from '../../utils/categories'
import * as S from './styles'

interface Category {
	key: string
	name: string
}

interface Props {
	category: string
	setCategory: (item: Category) => void
	closeSelectCategory: () => void
}

export function CategorySelect({
	category = 'Categoria',
	setCategory,
	closeSelectCategory }: Props) {
	return (
		<S.Container>
			<S.Header>
				<S.Title>{category}</S.Title>
			</S.Header>

			<FlatList
				data={categories}
				style={{ flex: 1, width: '100%' }}
				keyExtractor={item => item.key}
				renderItem={({ item }) => (
					<S.Category>
						<S.Icon name={item.icon} />
						<S.Name>{item.name}</S.Name>
					</S.Category>
				)}
				ItemSeparatorComponent={() => <S.Separator />}
			/>

			<S.Footer>
				<Button title='Selecionar' />
			</S.Footer>

		</S.Container>
	)
}