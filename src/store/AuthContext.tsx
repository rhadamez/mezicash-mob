import React, { createContext, useContext } from 'react'

interface User {
	id: string
	name: string
	email: string
	photo?: string
}

interface AuthContextData {
	user: User
}

interface AuthProviderProps {
	children: React.ReactNode
}

const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const user = {
		id: '1',
		name: 'Rhadamez',
		email: 'rhadamez@gmail.com'
	}
	return(
		<AuthContext.Provider value={{ user }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)

	return context
}
