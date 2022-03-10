import React, { useEffect, useRef } from 'react'

export default function useInterval(callBack:()=>void, delay:number) {
    const lastCallBack = useRef(() => {})
    useEffect(() => {
        lastCallBack.current = callBack
    })

    useEffect(() => {
        if (delay !== null) {
            const interval = setInterval(lastCallBack.current, delay || 0)
            return () => clearInterval(interval)
        }
        return undefined
    }, [delay])
}