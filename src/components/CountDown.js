import React, { useState, useEffect } from 'react'
import { CountDown as CounterDown } from 'mugan86-chronometer'

export const CountDown = ({startValue, callback}) => {

  const [counterValue, setCounterValue] = useState(null)
  useEffect(() => {
    const countDown = new CounterDown(startValue, true)
    let counter = countDown
      .start()
      .subscribe(data => {
        if (data === 'FINISH') {
          counter.unsubscribe()
          return callback()
        }
        setCounterValue(data)
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
