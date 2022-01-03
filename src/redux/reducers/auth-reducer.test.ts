import {authReducer, removeUserData, setAppInitStatus, setUserData} from "./auth-reducer";

const testState = {
        appInit: false,
        isAuth: false,
        id: null,
        email: null,
        login: null,
}

describe('Auth reducer', () => {
    it('Set user data', () => {
        const result = authReducer(testState, setUserData(1,'test@mail.ru', 'login'))

        expect(result.appInit).toBeFalsy()
        expect(result.isAuth).toBeTruthy()
        expect(result.id).toBe(1)
        expect(result.email).toBe('test@mail.ru')
        expect(result.login).toBe('login')
        expect(result).not.toEqual(testState)
    })

    it('Remove user data', () => {
        const result = authReducer(testState, removeUserData())

        expect(result.appInit).toBeFalsy()
        expect(result.isAuth).toBeFalsy()
        expect(result.id).toBeNull()
        expect(result.email).toBeNull()
        expect(result.login).toBeNull()
        expect(result).not.toBe(testState)
    })

    it('Set app init status', () => {
        const result = authReducer(testState, setAppInitStatus(true))

        expect(result.appInit).toBeTruthy()
        expect(result.isAuth).toBeFalsy()
        expect(result.id).toBeNull()
        expect(result.email).toBeNull()
        expect(result.login).toBeNull()
        expect(result).not.toEqual(testState)
    })
})