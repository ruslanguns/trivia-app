import React, { useState, useEffect } from 'react'
import { CountDown as CounterDown } from 'mugan86-chronometer'

export const CountDown = ({startValue, callback, finished}) => {

  const [counterValue, setCounterValue] = useState(null)
  useEffect(() => {
    const countDown = new CounterDown(startValue, true)
    let counter = countDown
      .start()
      .subscribe(data => {
        setCounterValue(data)
        if (data === 'FINISH') {
          counter.unsubscribe()
          callback()
        }
      })

    return () => {
      counter.unsubscribe()
    }
  }, [startValue, callback ])

  return (
    <>
      {
        counterValue && counterValue
      }
    </>
  )
}
