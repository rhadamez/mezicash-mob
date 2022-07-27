import { useState } from 'react'
import { Alert, Modal } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { useNavigation } from '@react-navigation/native'

import uuid from 'react-native-uuid'

import { useForm, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button } from '../../components/Form/Button'
import { CategorySelectButton } from '../../components/Form/CategorySelectButton'
import { InputForm } from '../../components/Form/InputForm'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import { CategorySelect } from '../CategorySelect'
import * as S from './styles'

type TransactionType = 'up' | 'down'

interface FormData {
	name: string
	amount: string
}

export function Register() {
	const navigation = useNavigation()
	const dataKey = '@mezicash:transactions'
	const [categoryModalOpen, setCategoryModalOpen] = useState(false)
	const [transactionType, setTransactionType] = useState<TransactionType>()

	const [category, setCategory] = useState({
		key: 'category',
		name: 'Categoria'
	})

	const schemaValidation = yup.object({
		name: yup.string().required('Nome é obrigatório'),
		amount: yup.number().typeError('Preço deve ser numérico').required('Preço é obrigatório'),
	}).required()

	const { control, handleSubmit, reset, formState: { errors } } = useForm({
		resolver: yupResolver(schemaValidation)
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

	async function handleRegister(form: FormData | FieldValues) {
		const { name, amount } = form

		const newTransaction = {
			id: String(uuid.v4()),
			name,
			amount,
			type: transactionType,
			category: category.key,
			date: new Date()
		}

		try {
			const data = await AsyncStorage.getItem(dataKey)
			const currentData = data ? JSON.parse(data) : []

			const dataFormatted = [
				...currentData,
				newTransaction
			]

			await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted))
			reset()
			setTransactionType(undefined)
			setCategory({ key: 'categoria', name: 'Categoria' })
			navigation.navigate('Listagem')
		} catch (err) {
			Alert.alert('Não foi possível cadastrar')
		}
	}

	return (
		<S.Container>
			<S.Header>
				<S.Title>Cadastro</S.Title>
			</S.Header>

			<S.Form>
				<S.Fields>
					<InputForm
						name='name'
						control={control}
						error={errors.name?.message}
						autoCapitalize='sentences'
						autoCorrect={false}
						placeholder='Nome' />
					<InputForm
						name='amount'
						control={control}
						error={errors.amount?.message}
						placeholder='Preço'
						keyboardType='numeric' />
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
				<Button title='Enviar' onPress={handleSubmit(handleRegister)} />
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
