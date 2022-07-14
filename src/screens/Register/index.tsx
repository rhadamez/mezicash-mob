import { useState } from 'react'
import { Button } from '../../components/Form/Button'
import { CategorySelect } from '../../components/Form/CategorySelect'
import { Input } from '../../components/Form/Input'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import * as S from './styles'

type TransactionType = 'up' | 'down'

export function Register() {
	const [transactionType, setTransactionType] = useState<TransactionType>()

	function handleTransactionTypeSelect(type: TransactionType) {
		setTransactionType(type)
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
					<CategorySelect title='Categoria' />
				</S.Fields>
				<Button title='Enviar' />
			</S.Form>
		</S.Container>
	)
}
