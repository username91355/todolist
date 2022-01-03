import {appReducer, InitialStateType, setAppError, setAppStatus} from "./app-reducer";

const testState: InitialStateType = {
    appStatus: 'idle',
    appError: null
}
describe('App reducer', () => {
    it('Set app status', () => {
        const result = appReducer(testState, setAppStatus('loading'))

        expect(result.appStatus).toBe('loading')
        expect(result.appError).toBeNull()
        expect(result).not.toEqual(testState)
        expect(result).not.toBe(testState)
    })

    it('Set app error', () => {
        const result = appReducer(testState, setAppError('error'))

        expect(result.appStatus).toBe('idle')
        expect(result.appError).toBe('error')
        expect(result).not.toEqual(testState)
        expect(result).not.toBe(testState)
    })
})