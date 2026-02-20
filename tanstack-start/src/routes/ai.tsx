import { createFileRoute } from '@tanstack/react-router'
import { chat } from '@tanstack/ai'
import { openaiText } from '@tanstack/ai-openai'
import { createServerFn_uiCallable } from '@/utils/serverFn.util'
import { Button } from '@/components/ui/button'

// for big payload, serverFn should be POST
export const testAiServerFn = createServerFn_uiCallable.handler(async () => {
  const adapter = openaiText('gpt-4o-mini')

  const stream = chat({
    adapter,
    messages: [{ role: 'user', content: 'Hello' }],
  })

  let fullText = ''
  let usage: any

  for await (const chunk of stream) {
    if (chunk.type === 'TEXT_MESSAGE_CONTENT') {
      fullText += chunk.delta
    }
    if (chunk.type === 'RUN_FINISHED') {
      usage = chunk.usage
    }
  }

  return {
    fullText,
    usage,
  }
})

export const Route = createFileRoute('/ai')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Button
        onClick={() => {
          testAiServerFn().then((res) => {
            console.log('AI Response:', res.fullText)
            console.log('Usage:', res.usage)
          })
        }}
      >
        Test AI Server Fn
      </Button>
    </div>
  )
}
