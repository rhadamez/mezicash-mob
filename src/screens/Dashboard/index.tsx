import * as S from './styles'

export function Dashboard() {
	return(
		<S.Container>
			<S.Header>
				<S.UserWrapper>
					<S.UserInfo>
						<S.Photo source={{ uri: 'https://github.com/rhadamez.png'}}/>
						<S.User>
							<S.UserGreeting>Olá, </S.UserGreeting>
							<S.UserName>Rhadamez</S.UserName>
						</S.User>
					</S.UserInfo>
					<S.Photo source={{ uri: 'https://github.com/rhadamez.png'}}/>
				</S.UserWrapper>
			</S.Header>
		</S.Container>
	)
}
