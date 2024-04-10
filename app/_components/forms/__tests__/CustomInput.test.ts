import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CustomInput from '../CustomInput'

describe('CustomInput', () => {
  test('renders input field with label and description', () => {
    const onChangeMock = jest.fn()
    const { getByLabelText, getByText } = render(
      <CustomInput
        label="Username"
        description="Enter your username"
        onChange={onChangeMock}
      />
    )

    const inputElement = getByLabelText('Username')
    const descriptionElement = getByText('Enter your username')

    expect(inputElement).toBeInTheDocument()
    expect(descriptionElement).toBeInTheDocument()
  })

  test('calls onChange handler with input value', () => {
    const onChangeMock = jest.fn()
    const { getByLabelText } = render(
      <CustomInput
        label="Username"
        description="Enter your username"
        onChange={onChangeMock}
      />
    )

    const inputElement = getByLabelText('Username')

    fireEvent.change(inputElement, { target: { value: 'testUser' } })

    expect(onChangeMock).toHaveBeenCalledWith('testUser')
  })
})
