type AppFieldApi<TValue> = {
  state: {
    value: TValue | undefined
  }
  handleChange: (value: TValue) => void
}
