import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CardHeader from '../CardHeader'

describe('CardHeader', () => {
  it('renders', () => {
    const headerText = 'Test Hear'
    const rightContent = 'Right Content'
    render(
      <CardHeader
        header={headerText}
        rightContent={<div>{rightContent}</div>}
      />
    )
    // const heading = screen.getByRole('heading', { level: 3 })

    const headerElement = screen.getByText(headerText)

    expect(headerElement).toBeInTheDocument()
    expect(headerElement).toHaveClass('text-lg font-semibold')

    const rightContentElement = screen.getByText(rightContent)
    expect(rightContentElement).toBeInTheDocument()
  })

  it('renders snapshot correctly', () => {
    const headerText = 'Test Hear'
    const rightContent = 'Right Content'
    const { container } = render(
          <CardHeader
            header={headerText}
            rightContent={<div>{rightContent}</div>}
          />
    )
    expect(container).toMatchSnapshot()
  })
})
