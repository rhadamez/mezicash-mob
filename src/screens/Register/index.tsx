import { useState } from 'react'
import { Modal } from 'react-native'

import { Button } from '../../components/Form/Button'
import { CategorySelectButton } from '../../components/Form/CategorySelectButton'
import { Input } from '../../components/Form/Input'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import { CategorySelect } from '../CategorySelect'
import * as S from './styles'

type TransactionType = 'up' | 'down'

export function Register() {
	const [categoryModalOpen, setCategoryModalOpen] = useState(false)
	const [transactionType, setTransactionType] = useState<TransactionType>()

	const [category, setCategory] = useState({
		key: 'category',
		name: 'Categoria'
	})

	function handleTransactionTypeSelect(type: TransactionType) {
		setTransactionType(type)
	}

	function handleOpenSelectCategoryModal() {
		setCategoryModalOpen(true)
	}

	function handleCloseSelectCategoryModal() {
		setCategoryModalOpen(false)
	}

	return (
		<S.Container>
			<S.Header>
				<S.Title>Cadastro</S.Title>
			</S.Header>

			<S.Form>
				<S.Fields>
					<Input placeholder='Nome' />
					<Input placeholder='Preço' />
					<S.TransactionTypes>
						<TransactionTypeButton
							title='Income'
							type='up'
							isSelected={transactionType === 'up'}
							onPress={() => handleTransactionTypeSelect('up')} />
						<TransactionTypeButton
							title='Outcome'
							type='down'
							isSelected={transactionType === 'down'}
							onPress={() => handleTransactionTypeSelect('down')} />
					</S.TransactionTypes>
					<CategorySelectButton onPress={handleOpenSelectCategoryModal} title={category.name} />
				</S.Fields>
				<Button title='Enviar' />
			</S.Form>

			<Modal visible={categoryModalOpen}>
				<CategorySelect
					category={category}
					setCategory={setCategory}
					closeSelectCategory={handleCloseSelectCategoryModal}
				/>
			</Modal>
		</S.Container>
	)
}
