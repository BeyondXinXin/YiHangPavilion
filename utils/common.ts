export function debounce<T extends (...args: any[]) => any>(fn: T, delay = 100) {
    let timer: NodeJS.Timeout
    return function (this: any, ...args: any[]) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    } as T
}