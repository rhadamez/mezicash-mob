import { FlatList } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Button } from '../../components/Form/Button'
import { categories } from '../../utils/categories'
import * as S from './styles'

interface Category {
	key: string
	name: string
}

interface Props {
	category: Category
	setCategory: (item: Category) => void
	closeSelectCategory: () => void
}

export function CategorySelect({
	category,
	setCategory,
	closeSelectCategory }: Props) {
	return (
		<S.Container>
			<S.Header>
				<S.Title>{category.name}</S.Title>
			</S.Header>

			<FlatList
				data={categories}
				style={{ flex: 1, width: '100%' }}
				keyExtractor={item => item.key}
				renderItem={({ item }) => (
					<S.Category onPress={() => setCategory(item)}>
						<S.Icon name={item.icon} />
						<S.Name>{item.name}</S.Name>
					</S.Category>
				)}
				ItemSeparatorComponent={() => <S.Separator />}
			/>

			<GestureHandlerRootView>
				<S.Footer>
					<Button title='Selecionar' onPress={() => closeSelectCategory()} />
				</S.Footer>
			</GestureHandlerRootView>

		</S.Container>
	)
}
