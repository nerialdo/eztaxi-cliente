export function singIn() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                token: 'dasdas4das4das4d56a4456as4d56as4d56a4sd56',
                user: {
                    name: 'Nerialdo',
                    email: 'nerialdosousa@hotmail.com'
                }
            })
        }, 2000)
    })
}